import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const INTERNAL_TO = 'pro.blight00@gmail.com'

function getString(formData: FormData, key: string) {
  const v = formData.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

function getYesNo(formData: FormData, key: string): 'Oui' | 'Non' | '' {
  const v = getString(formData, key)
  if (v === 'Oui' || v === 'Non') return v
  return ''
}

function safeJoin(parts: Array<string | undefined | null>, sep = ' ') {
  return parts
    .map((p) => (p ?? '').trim())
    .filter(Boolean)
    .join(sep)
}

function getExtension(filename: string) {
  const idx = filename.lastIndexOf('.')
  if (idx < 0) return ''
  return filename.slice(idx + 1).toLowerCase()
}

function isAllowedLogoFile(file: File) {
  const ext = getExtension(file.name)
  const allowedExt = new Set(['pdf', 'ai', 'svg', 'png', 'jpg', 'jpeg'])
  if (allowedExt.has(ext)) return true

  // fallback mime checks (AI can vary)
  const type = (file.type || '').toLowerCase()
  const allowedMimePrefixes = ['image/']
  const allowedMimeExact = new Set([
    'application/pdf',
    'image/svg+xml',
    'application/postscript',
    'application/illustrator',
  ])
  if (allowedMimeExact.has(type)) return true
  if (allowedMimePrefixes.some((p) => type.startsWith(p))) return true
  return false
}

function required(value: string, label: string) {
  if (!value) return `${label} est obligatoire.`
  return null
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // 1) Informations client
    const nom = getString(formData, 'nom')
    const prenom = getString(formData, 'prenom')
    const commerce = getString(formData, 'commerce')
    const telephone = getString(formData, 'telephone')
    const email = getString(formData, 'email')
    const adresse = getString(formData, 'adresse')

    // 2) Type d’enseigne
    const typeEnseigne = getString(formData, 'typeEnseigne')

    // 3) Projet
    const emplacement = getString(formData, 'emplacement')
    const lumineuse = getYesNo(formData, 'lumineuse')
    const largeurCm = getString(formData, 'largeurCm')
    const hauteurCm = getString(formData, 'hauteurCm')
    const profondeurCm = getString(formData, 'profondeurCm')

    // 4) Délais
    const delai = getString(formData, 'delai')

    // 5) Logo
    const logoClient = getYesNo(formData, 'logoClient')
    const creationLogoBlight = getString(formData, 'creationLogoBlight') // Oui / Non (si pas de logo)
    const descriptionLogo = getString(formData, 'descriptionLogo')

    // 6) Précisions
    const precisions = getString(formData, 'precisions')

    const errors: string[] = []
    ;[
      required(nom, 'Nom'),
      required(prenom, 'Prénom'),
      required(commerce, 'Nom du commerce'),
      required(telephone, 'Téléphone'),
      required(email, 'Email'),
      required(adresse, 'Adresse complète du commerce'),
      required(typeEnseigne, 'Type d’enseigne'),
      required(emplacement, 'Emplacement'),
      required(lumineuse, 'Enseigne lumineuse'),
      required(largeurCm, 'Largeur (cm)'),
      required(hauteurCm, 'Hauteur (cm)'),
      required(delai, 'Délai de livraison'),
      required(logoClient, 'Avez-vous un logo ?'),
    ].forEach((e) => {
      if (e) errors.push(e)
    })

    if (logoClient === 'Non') {
      if (!creationLogoBlight) errors.push('Souhaitez-vous que BLIGHT réalise votre logo ? est obligatoire.')
      if (creationLogoBlight === 'Oui' && !descriptionLogo) {
        errors.push('Description précise du logo souhaité est obligatoire.')
      }
    }

    const fileValue = formData.get('logoFichier')
    const logoFichier = fileValue instanceof File && fileValue.size > 0 ? fileValue : null
    if (logoClient === 'Oui' && !logoFichier) {
      errors.push('Merci de joindre le logo (PDF, AI, SVG, PNG, JPG).')
    }
    if (logoFichier && !isAllowedLogoFile(logoFichier)) {
      errors.push('Format de logo non supporté. Formats acceptés : PDF, AI, SVG, PNG, JPG.')
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 })
    }

    const subject = `Demande de devis – ${commerce} – ${safeJoin([nom, prenom])}`

    const bodyLines = [
      'Demande de devis BLIGHT',
      '',
      'INFORMATIONS CLIENT',
      `Nom et prénom : ${safeJoin([nom, prenom])}`,
      `Nom du commerce : ${commerce}`,
      `Téléphone : ${telephone}`,
      `Email : ${email}`,
      `Adresse complète du commerce : ${adresse}`,
      '',
      'TYPE D’ENSEIGNE',
      `Type d’enseigne : ${typeEnseigne}`,
      '',
      'PROJET',
      `Emplacement : ${emplacement}`,
      `Enseigne lumineuse : ${lumineuse}`,
      `Dimensions (cm) : Largeur ${largeurCm} × Hauteur ${hauteurCm}${
        profondeurCm ? ` × Profondeur ${profondeurCm}` : ''
      }`,
      '',
      'DÉLAIS DE LIVRAISON',
      `Souhait : ${delai}`,
      '',
      'LOGO',
      `Logo fourni : ${logoClient}`,
      ...(logoClient === 'Non'
        ? [
            `Création logo BLIGHT : ${
              creationLogoBlight === 'Oui'
                ? 'Oui (90 € – 3 propositions maximum)'
                : 'Non'
            }`,
          ]
        : []),
      ...(logoClient === 'Non' && creationLogoBlight === 'Oui'
        ? [`Description du logo : ${descriptionLogo}`]
        : []),
      '',
      'PRÉCISIONS COMPLÉMENTAIRES',
      precisions ? precisions : '(Aucune)',
    ]

    const body = bodyLines.join('\n')

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || user
    const secure = (process.env.SMTP_SECURE || '').toLowerCase() === 'true'

    if (!host || !port || !user || !pass || !from) {
      return NextResponse.json(
        {
          ok: false,
          errors: [
            "Configuration email manquante côté serveur (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM).",
          ],
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    const attachments =
      logoFichier && logoClient === 'Oui'
        ? [
            {
              filename: logoFichier.name || 'logo',
              content: Buffer.from(await logoFichier.arrayBuffer()),
              contentType: logoFichier.type || undefined,
            },
          ]
        : []

    await transporter.sendMail({
      from,
      to: INTERNAL_TO,
      subject,
      text: body,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { ok: false, errors: ['Erreur serveur lors de l’envoi du devis.'] },
      { status: 500 }
    )
  }
}



'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type YesNo = 'Oui' | 'Non' | ''

export default function BlightDevisPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  const [formData, setFormData] = useState({
    // 1) Informations client
    nom: '',
    prenom: '',
    commerce: '',
    telephone: '',
    email: '',
    adresse: '',

    // 2) Type d’enseigne
    typeEnseigne: '',

    // 3) Projet
    emplacement: '',
    lumineuse: '' as YesNo,
    largeurCm: '',
    hauteurCm: '',
    profondeurCm: '',

    // 4) Délais
    delai: '',

    // 5) Logo
    logoClient: '' as YesNo,
    creationLogoBlight: '', // Oui / Non (si pas de logo)
    descriptionLogo: '',

    // 6) Description libre
    precisions: '',
  })

  const logoInputRef = useRef<HTMLInputElement | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const enseigneOptions = useMemo(
    () => [
      {
        value: 'Lettres en relief',
        label: 'Lettres en relief',
        img: '/public2/images/enseigne/lettres-relief.jpg',
      },
      {
        value: 'Néon flexible',
        label: 'Néon flexible',
        img: '/public2/images/enseigne/neon-flex.jpg',
      },
      {
        value: 'Caisson lumineux',
        label: 'Caisson lumineux',
        img: '/public2/images/enseigne/caisson-lumineux.jpg',
      },
      {
        value: 'Drapeau lumineux',
        label: 'Drapeau lumineux',
      },
      {
        value: 'Je ne sais pas',
        label: 'Je ne sais pas (BLIGHT propose)',
      },
    ],
    []
  )

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateClientSide = () => {
    const e: string[] = []
    const req = (v: string, label: string) => {
      if (!String(v || '').trim()) e.push(`${label} est obligatoire.`)
    }

    req(formData.nom, 'Nom')
    req(formData.prenom, 'Prénom')
    req(formData.commerce, 'Nom du commerce')
    req(formData.telephone, 'Téléphone')
    req(formData.email, 'Email')
    req(formData.adresse, 'Adresse complète du commerce')

    req(formData.typeEnseigne, 'Type d’enseigne')
    req(formData.emplacement, 'Emplacement')
    req(formData.lumineuse, 'Enseigne lumineuse')
    req(formData.largeurCm, 'Largeur (cm)')
    req(formData.hauteurCm, 'Hauteur (cm)')
    req(formData.delai, 'Délai de livraison')

    req(formData.logoClient, 'Avez-vous un logo ?')
    if (formData.logoClient === 'Oui') {
      if (!logoFile) e.push('Merci de joindre le logo (PDF, AI, SVG, PNG, JPG).')
    }
    if (formData.logoClient === 'Non') {
      req(formData.creationLogoBlight, 'Souhaitez-vous que BLIGHT réalise votre logo ?')
      if (formData.creationLogoBlight === 'Oui') {
        req(formData.descriptionLogo, 'Description précise du logo souhaité')
      }
    }

    setErrors(e)
    return e.length === 0
  }

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()
    setIsDragging(false)
    const f = ev.dataTransfer.files?.[0]
    if (!f) return
    setLogoFile(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    setErrors([])

    if (!validateClientSide()) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const fd = new FormData()
      Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v ?? '')))
      if (logoFile) fd.append('logoFichier', logoFile, logoFile.name)

      const res = await fetch('/api/devis', {
        method: 'POST',
        body: fd,
      })

      const data = (await res.json()) as { ok?: boolean; errors?: string[] }
      if (!res.ok || !data?.ok) {
        setErrors(data?.errors?.length ? data.errors : ["Une erreur est survenue lors de l’envoi."])
        setStatus('error')
        return
      }

      setStatus('sent')
      setLogoFile(null)
      if (logoInputRef.current) logoInputRef.current.value = ''
      setFormData({
        nom: '',
        prenom: '',
        commerce: '',
        telephone: '',
        email: '',
        adresse: '',
        typeEnseigne: '',
        emplacement: '',
        lumineuse: '',
        largeurCm: '',
        hauteurCm: '',
        profondeurCm: '',
        delai: '',
        logoClient: '',
        creationLogoBlight: '',
        descriptionLogo: '',
        precisions: '',
      })
    } catch {
      setErrors(['Erreur réseau. Merci de réessayer.'])
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F]">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/blight"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/blight'
            }}
          >
            <motion.div
              className="relative h-12 w-[185px] cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/blight/Blight-logo-rev2-png1%202.png"
                alt="BLIGHT Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blight"
              className="btn-blight px-4 py-2 text-sm font-medium"
            >
              Retour à l&apos;accueil
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 pt-32">
        <div className="mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              style={{
                backgroundPosition: '0% 50%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              Demande de devis
            </motion.span>
          </motion.h1>
          <p className="text-lg text-[#6E6E73] leading-relaxed">
            Formulaire interne ultra simple (1–2 minutes) pour envoyer une demande de devis BLIGHT.
          </p>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* 1. Informations client */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">1) Informations client</p>
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                value={formData.nom}
                onChange={onChangeValue}
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                value={formData.prenom}
                onChange={onChangeValue}
                placeholder="Votre prénom"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="commerce">Nom du commerce *</label>
              <input
                type="text"
                id="commerce"
                name="commerce"
                required
                value={formData.commerce}
                onChange={onChangeValue}
                placeholder="Nom du commerce"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone *</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={formData.telephone}
                onChange={onChangeValue}
                placeholder="06 00 00 00 00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={onChangeValue}
                placeholder="contact@email.com"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="adresse">Adresse complète du commerce *</label>
              <textarea
                id="adresse"
                name="adresse"
                required
                value={formData.adresse}
                onChange={onChangeValue}
                placeholder="N°, rue, code postal, ville…"
              />
            </div>

            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">2) Type d’enseigne *</p>
              <p className="text-xs text-white/70 mb-3">
                Les images servent uniquement à reconnaître la forme, pas le style.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enseigneOptions.map((opt) => {
                  const isSelected = formData.typeEnseigne === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          typeEnseigne: opt.value,
                        }))
                      }
                      className={[
                        'text-left rounded-xl border px-3 py-3 transition',
                        'bg-white/5 hover:bg-white/10',
                        isSelected ? 'border-white/70' : 'border-white/20',
                      ].join(' ')}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-3">
                        {opt.img ? (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/15">
                            <Image
                              src={opt.img}
                              alt={opt.label}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                        ) : (
                          <div className="h-14 w-14 shrink-0 rounded-lg border border-dashed border-white/20 bg-white/5" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{opt.label}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="typeEnseigne" value={formData.typeEnseigne} />
            </div>

            {/* 3. Questions simples projet */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">3) Projet</p>
            </div>

            <div className="form-group full">
              <label>Emplacement *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['Intérieur', 'Extérieur', 'Intérieur + extérieur'].map((v) => {
                  const isSelected = formData.emplacement === v
                  return (
                    <button
                      key={v}
                      type="button"
                      className={[
                        'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                        isSelected ? 'border-white/70 bg-white/10 text-white' : 'border-white/20 bg-white/5 text-white/80',
                      ].join(' ')}
                      onClick={() => setFormData((p) => ({ ...p, emplacement: v }))}
                      aria-pressed={isSelected}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="emplacement" value={formData.emplacement} />
            </div>

            <div className="form-group full">
              <label>Enseigne lumineuse *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Oui', 'Non'] as const).map((v) => {
                  const isSelected = formData.lumineuse === v
                  return (
                    <button
                      key={v}
                      type="button"
                      className={[
                        'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                        isSelected ? 'border-white/70 bg-white/10 text-white' : 'border-white/20 bg-white/5 text-white/80',
                      ].join(' ')}
                      onClick={() => setFormData((p) => ({ ...p, lumineuse: v }))}
                      aria-pressed={isSelected}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="lumineuse" value={formData.lumineuse} />
            </div>

            <div className="form-group">
              <label htmlFor="largeurCm">Largeur (cm) *</label>
              <input
                type="number"
                id="largeurCm"
                name="largeurCm"
                required
                min="0"
                value={formData.largeurCm}
                onChange={onChangeValue}
                placeholder="Ex : 200"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hauteurCm">Hauteur (cm) *</label>
              <input
                type="number"
                id="hauteurCm"
                name="hauteurCm"
                required
                min="0"
                value={formData.hauteurCm}
                onChange={onChangeValue}
                placeholder="Ex : 50"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="profondeurCm">Profondeur (cm) (optionnel)</label>
              <input
                type="number"
                id="profondeurCm"
                name="profondeurCm"
                min="0"
                value={formData.profondeurCm}
                onChange={onChangeValue}
                placeholder="Ex : 10"
              />
            </div>

            {/* 4. Délais */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">4) Délais de livraison *</p>
              <p className="text-xs text-white/70 mb-3">Le choix du délai peut impacter le prix final.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { v: 'Standard', label: 'Standard (plus économique)' },
                  { v: 'Accéléré', label: 'Accéléré (plus rapide)' },
                ].map((o) => {
                  const isSelected = formData.delai === o.v
                  return (
                    <button
                      key={o.v}
                      type="button"
                      className={[
                        'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                        isSelected ? 'border-white/70 bg-white/10 text-white' : 'border-white/20 bg-white/5 text-white/80',
                      ].join(' ')}
                      onClick={() => setFormData((p) => ({ ...p, delai: o.v }))}
                      aria-pressed={isSelected}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="delai" value={formData.delai} />
            </div>

            {/* 5. Logo */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">5) Logo</p>
              <label>Avez-vous un logo ? *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Oui', 'Non'] as const).map((v) => {
                  const isSelected = formData.logoClient === v
                  return (
                    <button
                      key={v}
                      type="button"
                      className={[
                        'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                        isSelected ? 'border-white/70 bg-white/10 text-white' : 'border-white/20 bg-white/5 text-white/80',
                      ].join(' ')}
                      onClick={() => {
                        setFormData((p) => ({
                          ...p,
                          logoClient: v,
                          ...(v === 'Oui'
                            ? { creationLogoBlight: '', descriptionLogo: '' }
                            : {}),
                        }))
                        if (v === 'Non') {
                          setLogoFile(null)
                          if (logoInputRef.current) logoInputRef.current.value = ''
                        }
                      }}
                      aria-pressed={isSelected}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="logoClient" value={formData.logoClient} />
            </div>

            {formData.logoClient === 'Oui' ? (
              <div className="form-group full">
                <label>Joindre le logo (PDF, AI, SVG, PNG, JPG) *</label>
                <div
                  className={[
                    'rounded-xl border border-dashed px-4 py-4 transition',
                    isDragging ? 'border-white/70 bg-white/10' : 'border-white/25 bg-white/5',
                  ].join(' ')}
                  onDragEnter={(ev) => {
                    ev.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragOver={(ev) => {
                    ev.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={(ev) => {
                    ev.preventDefault()
                    setIsDragging(false)
                  }}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  onClick={() => logoInputRef.current?.click()}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') logoInputRef.current?.click()
                  }}
                >
                  <p className="text-sm font-semibold text-white">
                    {logoFile ? `Fichier sélectionné : ${logoFile.name}` : 'Glisser-déposer ou toucher pour choisir un fichier'}
                  </p>
                  <p className="text-xs text-white/60 mt-1">Le fichier sera joint automatiquement à l’email interne BLIGHT.</p>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.ai,.svg,.png,.jpg,.jpeg,application/pdf,image/svg+xml,image/png,image/jpeg"
                  onChange={(ev) => setLogoFile(ev.target.files?.[0] ?? null)}
                />
              </div>
            ) : null}

            {formData.logoClient === 'Non' ? (
              <>
                <div className="form-group full">
                  <label>Souhaitez-vous que BLIGHT réalise votre logo ? *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { v: 'Oui', label: 'Oui (90 € – 3 propositions maximum)' },
                      { v: 'Non', label: 'Non' },
                    ].map((o) => {
                      const isSelected = formData.creationLogoBlight === o.v
                      return (
                        <button
                          key={o.v}
                          type="button"
                          className={[
                            'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                            isSelected
                              ? 'border-white/70 bg-white/10 text-white'
                              : 'border-white/20 bg-white/5 text-white/80',
                          ].join(' ')}
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              creationLogoBlight: o.v,
                            }))
                          }
                          aria-pressed={isSelected}
                        >
                          {o.label}
                        </button>
                      )
                    })}
                  </div>
                  <input
                    type="hidden"
                    name="creationLogoBlight"
                    value={formData.creationLogoBlight}
                  />
                </div>

                {formData.creationLogoBlight === 'Oui' ? (
                  <div className="form-group full">
                    <label htmlFor="descriptionLogo">
                      Description précise du logo souhaité *{' '}
                      <span className="text-white/60 font-normal">
                        (nom, activité, couleurs, style, inspirations)
                      </span>
                    </label>
                    <textarea
                      id="descriptionLogo"
                      name="descriptionLogo"
                      required
                      value={formData.descriptionLogo}
                      onChange={onChangeValue}
                      placeholder="Ex : “Boulangerie DUPONT, couleurs bleu & blanc, style minimal, inspiration enseignes parisiennes…”"
                    />
                  </div>
                ) : null}
              </>
            ) : null}

            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">6) Description libre</p>
              <label htmlFor="precisions">Souhaitez-vous ajouter des précisions complémentaires ?</label>
              <textarea
                id="precisions"
                name="precisions"
                value={formData.precisions}
                onChange={onChangeValue}
                placeholder="Optionnel : contraintes, accès, préférence de date…"
              />
            </div>

            {/* Erreurs / Confirmation */}
            {status === 'error' && errors.length > 0 ? (
              <div className="form-group full">
                <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-semibold text-white mb-2">À corriger</p>
                  <ul className="text-xs text-white/80 list-disc pl-5 space-y-1">
                    {errors.map((er, idx) => (
                      <li key={idx}>{er}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {status === 'sent' ? (
              <div className="form-group full">
                <div className="rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3">
                  <p className="text-sm font-semibold text-white">
                    Demande envoyée. Merci !
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    L’email interne a été envoyé à BLIGHT.
                  </p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="form-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Envoi…' : 'ENVOYER DEVIS'}
            </button>

            {/* 8. Texte de sécurité */}
            <div className="form-group full">
              <p className="text-xs text-white/70">
                Les choix techniques, matériaux, finitions et modes de transport sont définis par BLIGHT afin de garantir le meilleur rendu, le respect des délais et la durabilité.
              </p>
            </div>
          </form>
        </div>
      </section>

    </main>
  )
}



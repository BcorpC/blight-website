'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

type YesNo = 'Oui' | 'Non' | 'Yes' | 'No' | ''

export default function BlightDevisPage() {
  const { t, language } = useLanguage()
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
        value: language === 'fr' ? 'Lettres en relief' : 'Relief letters',
        label: t.devis.options.signTypes.reliefLetters,
        img: '/public2/images/enseigne/lettres-relief.jpg',
      },
      {
        value: language === 'fr' ? 'Néon flexible' : 'Flexible neon',
        label: t.devis.options.signTypes.neonFlex,
        img: '/public2/images/enseigne/neon-flex.jpg',
      },
      {
        value: language === 'fr' ? 'Caisson lumineux' : 'Light box',
        label: t.devis.options.signTypes.lightBox,
        img: '/public2/images/enseigne/caisson-lumineux.jpg',
      },
      {
        value: language === 'fr' ? 'Je ne sais pas' : "I don't know",
        label: t.devis.options.signTypes.dontKnow,
      },
    ],
    [t, language]
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
      if (!String(v || '').trim()) e.push(t.devis.validation.required(label))
    }

    req(formData.nom, t.devis.form.lastName.replace(' *', ''))
    req(formData.prenom, t.devis.form.firstName.replace(' *', ''))
    req(formData.commerce, t.devis.form.businessName.replace(' *', ''))
    req(formData.telephone, t.devis.form.phone.replace(' *', ''))
    req(formData.email, t.devis.form.email.replace(' *', ''))
    req(formData.adresse, t.devis.form.address.replace(' *', ''))

    req(formData.typeEnseigne, t.devis.sections.signType.replace(' *', ''))
    req(formData.emplacement, t.devis.form.location.replace(' *', ''))
    req(formData.lumineuse, t.devis.form.lightSign.replace(' *', ''))
    req(formData.largeurCm, t.devis.form.width.replace(' *', ''))
    req(formData.hauteurCm, t.devis.form.height.replace(' *', ''))
    req(formData.delai, t.devis.sections.delivery.replace(' *', ''))

    req(formData.logoClient, t.devis.form.haveLogo.replace(' *', ''))
    const yesValue = t.devis.options.yesNo.yes
    const noValue = t.devis.options.yesNo.no
    if (formData.logoClient === yesValue) {
      if (!logoFile) e.push(t.devis.validation.logoFileRequired)
    }
    if (formData.logoClient === noValue) {
      req(formData.creationLogoBlight, t.devis.form.blightCreateLogo.replace(' *', ''))
      if (formData.creationLogoBlight === yesValue) {
        req(formData.descriptionLogo, t.devis.form.logoDescription.replace(' *', ''))
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

    // Construire le corps de l'email avec toutes les informations
    const yesValue = t.devis.options.yesNo.yes
    const noValue = t.devis.options.yesNo.no
    const emailBody = [
      t.devis.email.sections.title,
      '',
      t.devis.email.sections.clientInfo,
      `${t.devis.email.fields.name} ${formData.nom} ${formData.prenom}`,
      `${t.devis.email.fields.business} ${formData.commerce}`,
      `${t.devis.email.fields.phone} ${formData.telephone}`,
      `${t.devis.email.fields.email} ${formData.email}`,
      `${t.devis.email.fields.address} ${formData.adresse}`,
      '',
      t.devis.email.sections.signType,
      `${t.devis.email.fields.type} ${formData.typeEnseigne}`,
      '',
      t.devis.email.sections.project,
      `${t.devis.email.fields.location} ${formData.emplacement}`,
      `${t.devis.email.fields.lightSign} ${formData.lumineuse}`,
      `${t.devis.email.fields.dimensions} ${formData.largeurCm} cm × ${formData.hauteurCm} cm${formData.profondeurCm ? ` × ${formData.profondeurCm} cm` : ''}`,
      '',
      t.devis.email.sections.delivery,
      `${t.devis.email.fields.deliveryTime} ${formData.delai}`,
      '',
      t.devis.email.sections.logo,
      `${t.devis.email.fields.logoProvided} ${formData.logoClient}`,
      ...(formData.logoClient === yesValue && logoFile
        ? [`${t.devis.email.fields.logoFile} ${logoFile.name} ${t.devis.email.logoFileNote}`]
        : []),
      ...(formData.logoClient === noValue
        ? [
            `${t.devis.email.fields.logoCreation} ${formData.creationLogoBlight}`,
            ...(formData.creationLogoBlight === yesValue
              ? [`${t.devis.email.fields.logoDescription} ${formData.descriptionLogo}`]
              : []),
          ]
        : []),
      ...(formData.precisions
        ? ['', t.devis.email.sections.additional, formData.precisions]
        : []),
    ]
      .filter(Boolean)
      .join('\n')

    const subject = encodeURIComponent(
      t.devis.email.subject(formData.commerce, `${formData.nom} ${formData.prenom}`)
    )
    const body = encodeURIComponent(emailBody)

    // Ouvrir l'application email native
    window.location.href = `mailto:pro.blight00@gmail.com?subject=${subject}&body=${body}`

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
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LanguageSwitcher />
            <Link
              href="/blight"
              className="btn-blight px-4 py-2 text-sm font-medium"
            >
              {t.devis.header.backToHome}
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
              {t.devis.title}
            </motion.span>
          </motion.h1>
          <p className="text-lg text-[#6E6E73] leading-relaxed">
            {t.devis.description}
          </p>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* 1. Informations client */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.clientInfo}</p>
            </div>

            <div className="form-group">
              <label htmlFor="nom">{t.devis.form.lastName}</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                value={formData.nom}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.lastName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">{t.devis.form.firstName}</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                value={formData.prenom}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.firstName}
              />
            </div>

            <div className="form-group full">
              <label htmlFor="commerce">{t.devis.form.businessName}</label>
              <input
                type="text"
                id="commerce"
                name="commerce"
                required
                value={formData.commerce}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.businessName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">{t.devis.form.phone}</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={formData.telephone}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.phone}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.devis.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.email}
              />
            </div>

            <div className="form-group full">
              <label htmlFor="adresse">{t.devis.form.address}</label>
              <textarea
                id="adresse"
                name="adresse"
                required
                value={formData.adresse}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.address}
              />
            </div>

            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.signType}</p>
              <p className="text-xs text-white/70 mb-3">
                {t.devis.sections.signTypeNote}
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
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.project}</p>
            </div>

            <div className="form-group full">
              <label>{t.devis.form.location}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  t.devis.options.locations.interior,
                  t.devis.options.locations.exterior,
                  t.devis.options.locations.both,
                ].map((v) => {
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
              <label>{t.devis.form.lightSign}</label>
              <div className="grid grid-cols-2 gap-2">
                {([t.devis.options.yesNo.yes, t.devis.options.yesNo.no] as const).map((v) => {
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
              <label htmlFor="largeurCm">{t.devis.form.width}</label>
              <input
                type="number"
                id="largeurCm"
                name="largeurCm"
                required
                min="0"
                value={formData.largeurCm}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.width}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hauteurCm">{t.devis.form.height}</label>
              <input
                type="number"
                id="hauteurCm"
                name="hauteurCm"
                required
                min="0"
                value={formData.hauteurCm}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.height}
              />
            </div>

            <div className="form-group full">
              <label htmlFor="profondeurCm">{t.devis.form.depth}</label>
              <input
                type="number"
                id="profondeurCm"
                name="profondeurCm"
                min="0"
                value={formData.profondeurCm}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.depth}
              />
            </div>

            {/* 4. Délais */}
            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.delivery}</p>
              <p className="text-xs text-white/70 mb-3">{t.devis.sections.deliveryNote}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { v: language === 'fr' ? 'Standard' : 'Standard', label: t.devis.options.delivery.standard },
                  { v: language === 'fr' ? 'Accéléré' : 'Accelerated', label: t.devis.options.delivery.accelerated },
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
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.logo}</p>
              <label>{t.devis.form.haveLogo}</label>
              <div className="grid grid-cols-2 gap-2">
                {([t.devis.options.yesNo.yes, t.devis.options.yesNo.no] as const).map((v) => {
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
                        const yesValue = t.devis.options.yesNo.yes
                        const noValue = t.devis.options.yesNo.no
                        setFormData((p) => ({
                          ...p,
                          logoClient: v,
                          ...(v === yesValue
                            ? { creationLogoBlight: '', descriptionLogo: '' }
                            : {}),
                        }))
                        if (v === noValue) {
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

            {formData.logoClient === t.devis.options.yesNo.yes ? (
              <div className="form-group full">
                <label>{t.devis.form.attachLogo}</label>
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
                    {logoFile ? `${t.devis.form.logoFileSelected} ${logoFile.name}` : t.devis.form.logoFileDrop}
                  </p>
                  <p className="text-xs text-white/60 mt-1">{t.devis.form.logoFileNote}</p>
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

            {formData.logoClient === t.devis.options.yesNo.no ? (
              <>
                <div className="form-group full">
                  <label>{t.devis.form.blightCreateLogo}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { v: t.devis.options.yesNo.yes, label: t.devis.options.logoCreation.yes },
                      { v: t.devis.options.yesNo.no, label: t.devis.options.logoCreation.no },
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

                {formData.creationLogoBlight === t.devis.options.yesNo.yes ? (
                  <div className="form-group full">
                    <label htmlFor="descriptionLogo">
                      {t.devis.form.logoDescription}{' '}
                      <span className="text-white/60 font-normal">
                        {t.devis.form.logoDescriptionNote}
                      </span>
                    </label>
                    <textarea
                      id="descriptionLogo"
                      name="descriptionLogo"
                      required
                      value={formData.descriptionLogo}
                      onChange={onChangeValue}
                      placeholder={t.devis.placeholders.logoDescription}
                    />
                  </div>
                ) : null}
              </>
            ) : null}

            <div className="form-group full">
              <p className="text-white font-semibold text-base mb-1">{t.devis.sections.freeDescription}</p>
              <label htmlFor="precisions">{t.devis.form.additionalInfo}</label>
              <textarea
                id="precisions"
                name="precisions"
                value={formData.precisions}
                onChange={onChangeValue}
                placeholder={t.devis.placeholders.additionalInfo}
              />
            </div>

            {/* Erreurs / Confirmation */}
            {status === 'error' && errors.length > 0 ? (
              <div className="form-group full">
                <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-semibold text-white mb-2">{t.devis.form.errorsTitle}</p>
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
                    {t.devis.form.successTitle}
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    {t.devis.form.successMessage}
                  </p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="form-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t.devis.form.sending : t.devis.form.submit}
            </button>

            {/* 8. Texte de sécurité */}
            <div className="form-group full">
              <p className="text-xs text-white/70">
                {t.devis.form.securityNote}
              </p>
            </div>
          </form>
        </div>
      </section>

    </main>
  )
}



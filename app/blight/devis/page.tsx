'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BlightDevisPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    commerce: '',
    telephone: '',
    email: '',
    adresse: '',
    typeEnseigne: '',
    largeur: '',
    hauteur: '',
    texte: '',
    complementaires: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `Demande de devis - ${formData.commerce || formData.nom}`
    )

    const body = encodeURIComponent(
      `
Demande de devis BLIGHT

INFORMATIONS CLIENT
Nom et prénom: ${formData.nom} ${formData.prenom}
Nom du commerce: ${formData.commerce}
Téléphone: ${formData.telephone}
Email: ${formData.email}
Adresse complète: ${formData.adresse}

DÉTAILS DU PROJET
Type d'enseigne: ${formData.typeEnseigne}
Dimensions: ${formData.largeur} cm × ${formData.hauteur} cm
Texte à afficher: ${formData.texte}

INFORMATIONS COMPLÉMENTAIRES
${formData.complementaires}
    `.trim()
    )

    window.location.href = `mailto:pro.blight00@gmail.com?subject=${subject}&body=${body}`
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
                src="/blight/Blight-logo-rev2-png1 2.png"
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
          <p className="text-lg text-[#6E6E73] leading-relaxed mb-6">
            Décrivez votre projet d&apos;enseigne lumineuse.
            <br />
            Nous revenons vers vous rapidement.
          </p>
          <motion.div
            className="bg-[#F5F5F5] border border-[#D2D2D7] rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-sm">
              <motion.strong
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{
                  backgroundPosition: '0% 50%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              >
                Le devis est facturé 30 €, 100 % déduit de la facture finale si le projet est
                validé.
              </motion.strong>
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="contact@email.com"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="adresse">Adresse complète du commerce *</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                required
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse complète"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="typeEnseigne">Type d&apos;enseigne *</label>
              <select
                id="typeEnseigne"
                name="typeEnseigne"
                required
                value={formData.typeEnseigne}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="Néon LED (texte)">Néon LED (texte)</option>
                <option value="Logo lumineux">Logo lumineux</option>
                <option value="Panneau / boîtier lumineux">Panneau / boîtier lumineux</option>
                <option value="Lettres lumineuses">Lettres lumineuses</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="largeur">Largeur (cm) *</label>
              <input
                type="number"
                id="largeur"
                name="largeur"
                required
                min="0"
                value={formData.largeur}
                onChange={handleChange}
                placeholder="Ex : 200"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hauteur">Hauteur (cm) *</label>
              <input
                type="number"
                id="hauteur"
                name="hauteur"
                required
                min="0"
                value={formData.hauteur}
                onChange={handleChange}
                placeholder="Ex : 50"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="texte">Texte à afficher *</label>
              <input
                type="text"
                id="texte"
                name="texte"
                required
                value={formData.texte}
                onChange={handleChange}
                placeholder="Nom du commerce, slogan…"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="complementaires">Informations complémentaires</label>
              <textarea
                id="complementaires"
                name="complementaires"
                value={formData.complementaires}
                onChange={handleChange}
                placeholder="Décrivez votre projet, contraintes, délais…"
              />
            </div>

            <button type="submit" className="form-submit-btn">
              Envoyer la demande
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D2D2D7] bg-white mt-24">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center gap-6">
            <ul className="social-wrapper">
              <li>
                <Link 
                  href="https://wa.me/yournumber" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon whatsapp"
                >
                  <span className="social-tooltip">WhatsApp</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon x"
                >
                  <span className="social-tooltip">X</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                >
                  <span className="social-tooltip">Instagram</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </li>
            </ul>
            <p className="text-sm text-[#6E6E73]">
              © 2026 BLIGHT. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}



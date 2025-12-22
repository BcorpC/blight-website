'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BlightPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between max-w-7xl">
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
            <Link href="/blight/devis">
            <motion.button
              className="btn-blight px-6 py-2.5 text-sm font-medium"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis
            </motion.button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block px-4 py-2 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-50 rounded-full mb-8 border border-blue-100 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Enseignes lumineuses
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/30 to-blue-200/0"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                L&apos;enseigne,{' '}
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{
                  backgroundPosition: '0% 50%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              >
                &nbsp;repensée.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                BLIGHT conçoit et vend des enseignes lumineuses pour les professionnels.
              </motion.span>
              <br />
              <motion.span
                className="inline-block mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Un projet plus ambitieux est en préparation.
              </motion.span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href="/blight/devis">
                <motion.button
                  className="btn-blight px-8 py-4 font-medium text-lg"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander un devis
                </motion.button>
              </Link>

              <motion.div
                className="px-8 py-4 text-white rounded-lg font-medium text-lg border-2 border-gray-200 bg-gray-900 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ borderColor: 'rgb(99, 102, 241)', scale: 1.01 }}
              >
                Projet en évolution. Ce que vous voyez aujourd&apos;hui n&apos;est que le début.
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos enseignes */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                title: 'Enseignes lumineuses sur mesure',
                description:
                  'Conçues pour votre façade, votre contexte et votre activité. Lisibles, sobres et efficaces.',
                icon: '✴️',
              },
              {
                title: 'Logos lumineux',
                description:
                  'Reprise fidèle de votre identité visuelle, avec une lumière propre et maîtrisée.',
                icon: '💡',
              },
              {
                title: 'Panneaux, boîtiers et lettres LED',
                description:
                  'Solutions simples ou plus ambitieuses, pour être vu clairement, sans excès.',
                icon: '🔠',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                    style={{
                      backgroundPosition: '0% 50%',
                      animation: 'gradient-shift 4s ease infinite',
                    }}
                  >
                    {feature.title}
                  </motion.span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ce que fait BLIGHT aujourd'hui */}
      <section className="py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{
                  backgroundPosition: '0% 50%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              >
                Ce que fait BLIGHT aujourd&apos;hui
              </motion.span>
            </motion.h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
              Nous concevons des enseignes lumineuses efficaces, propres et durables.
              Chaque projet est pensé pour être visible, lisible et cohérent avec votre activité.
            </p>
            <div className="space-y-4">
                {[
                  'Analyse du lieu, de la façade et du contexte urbain',
                  'Conseil sur les dimensions, le type d\'enseigne et la lumière',
                  'Accompagnement de la conception à la pose (en option)',
                  'Suivi simple et échanges clairs, sans jargon',
                ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process BLIGHT */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{
                  backgroundPosition: '0% 50%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              >
                Process BLIGHT
              </motion.span>
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              De la conception à l'installation, un accompagnement clair et professionnel.
            </p>
          </motion.div>

          {/* Grille compacte avec les 3 étapes */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Étape 1 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden shadow-md mb-4 h-48 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/blight/process/step-01-conception/conception-enseigne-mesures.png"
                  alt="Conception et visualisation"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                ÉTAPE 1
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Conception & Visualisation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Analyse de votre façade, visualisation 3D et validation des dimensions.
              </p>
              <ul className="space-y-2">
                {[
                  'Analyse du contexte',
                  'Conseil dimensions',
                  'Validation projet',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Étape 2 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden shadow-md mb-4 h-48 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/blight/process/step-02-fabrication/fabrication-enseigne-led..JPG"
                  alt="Fabrication et validation"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain rotate-90"
                />
              </motion.div>
              <motion.div
                className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                ÉTAPE 2
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fabrication & Validation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Fabrication sur mesure avec matériaux de qualité, contrôle à chaque étape.
              </p>
              <ul className="space-y-2">
                {[
                  'Fabrication sur mesure',
                  'Contrôle qualité',
                  'Validation finale',
                  'Préparation livraison',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Étape 3 */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden shadow-md mb-4 h-48 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/blight/process/step-03-installation/installation-enseigne-finale..jpeg"
                  alt="Installation et résultat final"
                  width={400}
                  height={250}
                  className="w-full h-full object-contain"
                  style={{ transform: 'scale(1.15)' }}
                />
              </motion.div>
              <motion.div
                className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                ÉTAPE 3
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Installation & Résultat
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Installation professionnelle, mise en service et suivi post-installation.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Installation qualifiée',
                  'Mise en service',
                  'Conseils maintenance',
                  'Suivi post-installation',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-24 hidden">
            {/* Étape 1 - Conception */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/blight/process/step-01-conception/conception-enseigne-mesures.png"
                  alt="Conception et visualisation"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <div>
                <motion.div
                  className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  ÉTAPE 1
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Conception & Visualisation
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Analyse de votre façade, de votre contexte et de vos besoins.
                  Visualisation 3D et validation des dimensions avant fabrication.
                </p>
                <ul className="space-y-3">
                  {[
                    'Analyse du lieu et du contexte urbain',
                    'Conseil sur les dimensions optimales',
                    'Visualisation 3D du projet',
                    'Validation avant fabrication',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Étape 2 - Fabrication */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:order-2">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-md mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/blight/process/step-02-fabrication/fabrication-enseigne-led..JPG"
                    alt="Fabrication et validation"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain rotate-90"
                  />
                </motion.div>
              </div>
              <div className="lg:order-1">
                <motion.div
                  className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  ÉTAPE 2
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Fabrication & Validation
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Fabrication de votre enseigne avec des matériaux de qualité.
                  Contrôle qualité et validation avant livraison.
                </p>
                <ul className="space-y-3">
                  {[
                    'Fabrication sur mesure avec matériaux durables',
                    'Contrôle qualité à chaque étape',
                    'Validation finale avant livraison',
                    'Préparation pour l\'installation',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Étape 3 - Installation */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/blight/process/step-03-installation/installation-enseigne-finale..jpeg"
                  alt="Installation et résultat final"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
              <div>
                <motion.div
                  className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  ÉTAPE 3
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Installation & Résultat Final
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Installation professionnelle par nos équipes (en option).
                  Votre enseigne est opérationnelle et visible.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Installation par nos équipes qualifiées',
                    'Mise en service et vérification',
                    'Conseils d\'entretien et de maintenance',
                    'Suivi post-installation',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Témoignages */}
                <motion.div
                  className="space-y-4 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Témoignages clients
                  </p>
                  <div className="space-y-4">
                    <motion.div
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                      whileHover={{ scale: 1.01, shadow: 'lg' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-700 italic mb-2">
                        &quot;Installation rapide et professionnelle. L&apos;enseigne est parfaitement visible et correspond exactement à nos attentes.&quot;
                      </p>
                      <p className="text-sm text-gray-500">— Restaurant Le Jardin, Perpignan</p>
                    </motion.div>
                    <motion.div
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                      whileHover={{ scale: 1.01, shadow: 'lg' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-700 italic mb-2">
                        &quot;Un accompagnement de A à Z, de la conception à la pose. Très satisfait du résultat final.&quot;
                      </p>
                      <p className="text-sm text-gray-500">— Boutique Mode & Style, Toulouse</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La suite arrive */}
      <section className="py-24 px-6 lg:px-8 bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              style={{
                backgroundPosition: '0% 50%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              La suite arrive
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            BLIGHT travaille sur l&apos;évolution du projet.
            L&apos;enseigne ne sera plus seulement un support visuel.
            Ce que vous voyez aujourd&apos;hui n&apos;est que le début.
          </motion.p>
          <motion.p
            className="text-sm text-gray-400 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            En attendant, nous continuons à concevoir des enseignes lumineuses simples, fiables et claires.
          </motion.p>
          <Link href="/blight/devis">
            <motion.button
              className="btn-blight px-10 py-4 font-medium text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
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
            <p className="text-sm text-gray-500">
              © 2026 BLIGHT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  )
}


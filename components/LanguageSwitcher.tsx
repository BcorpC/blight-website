'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <span 
        className={`transition-all duration-200 ${language === 'fr' ? 'font-bold text-gray-900' : 'opacity-50 text-gray-500'}`}
      >
        FR
      </span>
      <span className="text-gray-300">|</span>
      <span 
        className={`transition-all duration-200 ${language === 'en' ? 'font-bold text-gray-900' : 'opacity-50 text-gray-500'}`}
      >
        EN
      </span>
    </motion.button>
  )
}


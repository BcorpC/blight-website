# BCORP – Cinematic Landing Page

Landing page cinématique premium dark/orange avec animations fluides et micro-interactions.

## 🚀 Installation

```bash
npm install
```

## 📦 Dépendances

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger

## 🎨 Fonctionnalités

- ✅ Background animé avec gradient et effets de lumière
- ✅ Header sticky avec navbar responsive
- ✅ Section Hero avec parallaxe 3D
- ✅ Cartes de témoignages animées
- ✅ Section Manifesto avec révélations au scroll
- ✅ Compteurs animés pour les statistiques
- ✅ Mockup mobile avec effet 3D
- ✅ Système de boutons avec glow et shimmer
- ✅ Film grain overlay
- ✅ Animations 60fps fluides

## 🏃 Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📱 Responsive

Le site est entièrement responsive et s'adapte à tous les formats d'écran.

## 🎯 Déploiement

Le projet est prêt pour un déploiement sur Vercel :

```bash
npm run build
```

## 📝 Notes

- Les animations utilisent GSAP ScrollTrigger pour les révélations au scroll
- Framer Motion gère les micro-interactions et animations de hover
- Le background utilise Canvas pour les gradients animés

## 🧾 Formulaire devis BLIGHT (envoi email interne)

Le formulaire “Demande de devis” (mobile-first) se trouve sur `app/blight/devis/page.tsx` et envoie les données vers une route API Next.js `app/api/devis/route.ts`.

### Variables d’environnement (SMTP)

Pour que l’envoi d’email fonctionne, configurez ces variables (en local dans votre `.env.local` et en production dans Vercel → **Settings → Environment Variables**) :

- **SMTP_HOST** : ex `smtp.gmail.com`
- **SMTP_PORT** : ex `465` (TLS) ou `587` (STARTTLS)
- **SMTP_SECURE** : `true` si port 465, sinon `false`
- **SMTP_USER** : email du compte expéditeur
- **SMTP_PASS** : mot de passe SMTP / “App Password” (Gmail)
- **SMTP_FROM** (optionnel) : ex `BLIGHT Devis <votre-email@gmail.com>` (par défaut = `SMTP_USER`)

L’email est envoyé **uniquement** à `pro.blight00@gmail.com` (aucun email n’est envoyé au client).


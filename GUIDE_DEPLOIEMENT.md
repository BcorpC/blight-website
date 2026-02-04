# 📚 Guide complet : Publier votre site BLIGHT sur Internet

## 🎯 Objectif
Publier votre site BLIGHT en ligne gratuitement avec Vercel (recommandé pour Next.js).

---

## 📋 ÉTAPE 1 : Créer un compte GitHub

### 1.1 Aller sur GitHub
- Ouvrez votre navigateur
- Allez sur : **https://github.com**
- Cliquez sur le bouton **"Sign up"** (en haut à droite)

### 1.2 Créer votre compte
- **Email** : Entrez votre adresse email
- **Mot de passe** : Créez un mot de passe sécurisé
- **Username** : Choisissez un nom d'utilisateur (ex: "votre-nom" ou "blight-site")
- Cliquez sur **"Create account"**

### 1.3 Vérifier votre email
- GitHub vous enverra un email de vérification
- Ouvrez votre boîte mail et cliquez sur le lien de vérification

✅ **Votre compte GitHub est créé !**

---

## 📋 ÉTAPE 2 : Créer un repository (dépôt) sur GitHub

### 2.1 Créer un nouveau repository
- Une fois connecté sur GitHub, cliquez sur le bouton **"+"** en haut à droite
- Sélectionnez **"New repository"**

### 2.2 Configurer le repository
- **Repository name** : `blight-website` (ou un nom de votre choix)
- **Description** (optionnel) : "Site web BLIGHT - Enseignes lumineuses"
- **Visibilité** : 
  - ✅ Cochez **"Public"** (gratuit et recommandé)
  - OU **"Private"** si vous voulez que ce soit privé
- **NE COCHEZ PAS** "Add a README file" (on a déjà un projet)
- **NE COCHEZ PAS** "Add .gitignore" (on en a déjà un)
- **NE COCHEZ PAS** "Choose a license"

### 2.3 Créer le repository
- Cliquez sur le bouton vert **"Create repository"**

✅ **Votre repository est créé !**

### 2.4 Copier l'URL du repository
- GitHub va vous montrer une page avec des instructions
- **IMPORTANT** : Copiez l'URL qui ressemble à :
  ```
  https://github.com/VOTRE-USERNAME/blight-website.git
  ```
- Gardez cette URL, vous en aurez besoin à l'étape suivante !

---

## 📋 ÉTAPE 3 : Connecter votre projet local à GitHub

### 3.1 Ouvrir le terminal
- Ouvrez le terminal dans votre projet (vous êtes déjà dans le bon dossier)

### 3.2 Ajouter le repository GitHub
Exécutez cette commande (remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub) :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/blight-website.git
```

### 3.3 Renommer la branche principale
```bash
git branch -M main
```

### 3.4 Envoyer votre code sur GitHub
```bash
git push -u origin main
```

**Note** : GitHub vous demandera votre nom d'utilisateur et mot de passe. 
- **Username** : Votre nom d'utilisateur GitHub
- **Password** : Utilisez un **Personal Access Token** (voir ci-dessous si nécessaire)

### 3.5 Si GitHub demande un token (au lieu du mot de passe)
1. Allez sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Cliquez sur "Generate new token (classic)"
3. Donnez-lui un nom (ex: "blight-deployment")
4. Cochez "repo" (accès complet aux repositories)
5. Cliquez sur "Generate token"
6. **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois !)
7. Utilisez ce token comme mot de passe dans le terminal

✅ **Votre code est maintenant sur GitHub !**

---

## 📋 ÉTAPE 4 : Publier sur Vercel

### 4.1 Créer un compte Vercel
- Allez sur : **https://vercel.com**
- Cliquez sur **"Sign Up"**
- Choisissez **"Continue with GitHub"** (le plus simple)
- Autorisez Vercel à accéder à votre compte GitHub

### 4.2 Importer votre projet
- Sur la page d'accueil de Vercel, cliquez sur **"Add New..."** → **"Project"**
- Vous verrez la liste de vos repositories GitHub
- Trouvez **"blight-website"** (ou le nom que vous avez choisi)
- Cliquez sur **"Import"**

### 4.3 Configurer le projet
- **Project Name** : `blight-website` (ou laissez par défaut)
- **Framework Preset** : Vercel détectera automatiquement "Next.js" ✅
- **Root Directory** : Laissez vide (ou `./` si demandé)
- **Build Command** : `npm run build` (déjà pré-rempli)
- **Output Directory** : `.next` (déjà pré-rempli)
- **Install Command** : `npm install` (déjà pré-rempli)

### 4.3.1 (Important) Variables d’environnement – envoi email “Devis”

Pour que le formulaire “Demande de devis” envoie bien un email interne, ajoutez dans Vercel → **Settings → Environment Variables** :

- **SMTP_HOST** (ex : `smtp.gmail.com`)
- **SMTP_PORT** (ex : `465` ou `587`)
- **SMTP_SECURE** (`true` si 465, sinon `false`)
- **SMTP_USER** (email du compte expéditeur)
- **SMTP_PASS** (mot de passe SMTP / “App Password”)
- **SMTP_FROM** (optionnel, sinon `SMTP_USER`)

### 4.4 Déployer !
- Cliquez sur le gros bouton **"Deploy"**
- Attendez 1-2 minutes pendant que Vercel construit votre site

✅ **Votre site est en ligne !**

### 4.5 Voir votre site
- Une fois le déploiement terminé, Vercel vous donnera une URL comme :
  ```
  https://blight-website.vercel.app
  ```
- Cliquez dessus pour voir votre site en ligne ! 🎉

---

## 🔄 Mettre à jour votre site (après des modifications)

Chaque fois que vous modifiez votre code :

1. **Sauvegarder les changements sur GitHub** :
   ```bash
   git add .
   git commit -m "Description de vos modifications"
   git push
   ```

2. **Vercel déploiera automatiquement** la nouvelle version en quelques secondes !

---

## 🎨 Personnaliser l'URL (optionnel)

### Changer le nom de domaine
- Sur Vercel, allez dans votre projet
- Cliquez sur **"Settings"** → **"Domains"**
- Vous pouvez :
  - Changer le nom du projet (ex: `blight` → URL devient `blight.vercel.app`)
  - Ajouter votre propre domaine (ex: `blight.com`)

---

## ❓ Questions fréquentes

**Q : C'est gratuit ?**  
R : Oui ! GitHub et Vercel offrent des plans gratuits généreux.

**Q : Combien de temps ça prend ?**  
R : Environ 10-15 minutes pour la première fois, puis quelques secondes pour les mises à jour.

**Q : Mon site est-il sécurisé ?**  
R : Oui, Vercel utilise HTTPS automatiquement.

**Q : Puis-je annuler ?**  
R : Oui, vous pouvez supprimer le projet sur Vercel à tout moment.

---

## 🆘 Besoin d'aide ?

Si vous bloquez à une étape, dites-moi où vous en êtes et je vous aiderai !


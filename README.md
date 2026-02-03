# TimeTravel Agency

Une application web premium de réservation de voyages temporels. Explorez Paris 1889, le Crétacé ou Florence 1504 et réservez votre expédition à travers les siècles.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)

## Description

TimeTravel Agency est une webapp fictive de voyage temporel avec une interface utilisateur moderne et immersive. L'application propose :

- Une expérience visuelle haut de gamme avec vidéo hero en plein écran
- Un système de réservation complet avec persistance locale
- Un assistant IA conversationnel "Chronos" pour guider les utilisateurs
- Un design responsive adapté mobile et desktop

## Technologies utilisées

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 18.x | Framework frontend |
| **Vite** | 7.x | Build tool & dev server |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **React Router** | 7.x | Routing multi-pages |
| **Lucide React** | Latest | Icônes SVG |
| **localStorage** | Native | Persistance des réservations |

## Features implémentées

### Pages
- **Accueil** : Hero vidéo plein écran, présentation des features, aperçu des destinations
- **Destinations** : Liste des 3 destinations avec filtres visuels et détails
- **Détail Destination** : Page complète avec informations, points forts et formulaire de réservation
- **Mes Réservations** : Gestion des réservations (voir, annuler, supprimer)

### Composants
- **Navbar** : Navigation glassmorphism avec menu hamburger mobile et badge de réservations
- **Chatbot Chronos** : Assistant IA conversationnel avec réponses contextuelles

### Fonctionnalités
- Système de réservation avec sélection de date et nombre de voyageurs
- Calcul automatique du prix total en "Crédits Temporels"
- Persistance des données via localStorage (pas de backend requis)
- Design responsive mobile-first
- Animations et transitions fluides
- Effet de zoom au hover sur les images

## Outils IA utilisés

> **Transparence** : Ce projet a été développé avec l'assistance d'outils d'IA.

| Outil | Utilisation |
|-------|-------------|
| **Claude (Anthropic)** | Génération du code React/Tailwind, architecture des composants, logique du chatbot |
| **Claude Code** | Assistant de développement CLI pour la création et modification des fichiers |

### Chatbot Chronos
Le chatbot "Chronos" utilise un système de réponses basé sur des règles (rule-based). Il analyse les mots-clés dans les messages utilisateur pour fournir des réponses contextuelles sur :
- Les 3 destinations disponibles et leurs caractéristiques
- Les tarifs en Crédits Temporels
- Les réservations de l'utilisateur (contexte dynamique)
- Les recommandations basées sur les intérêts (art, aventure, histoire)

### Maquette rapide

![Maquette rapide](./public/assets/img/maquette.png)

## Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm ou yarn

### Étapes

```bash
# Cloner le repository (si applicable)
git clone <url-du-repo>
cd timetravel-app

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build
```

L'application sera accessible sur `http://localhost:5173`

## Structure du projet

```
timetravel-app/
├── public/
│   └── assets/
│       ├── img/
│       │   ├── paris_169.png
│       │   ├── cretace_169.png
│       │   └── florence_169.png
│       └── video/
│           └── trailer.mp4
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Chatbot.jsx
│   ├── context/
│   │   └── BookingContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetail.jsx
│   │   └── Reservations.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Crédits

### Assets visuels
- **Images des destinations** : Assets fournis pour le projet (générés par IA)
- **Vidéo trailer** : Asset fourni pour le projet

### Polices
- **Playfair Display** : Google Fonts (licence OFL)
- **Inter** : Google Fonts (licence OFL)

### Icônes
- **Lucide React** : Licence ISC - https://lucide.dev

### Inspiration Design
- Design "Glassmorphism" pour la navbar
- Palette de couleurs : Slate (sombre) + Amber (accents dorés)
- Thème luxe/premium inspiré des agences de voyage haut de gamme

## Team
    - Olfa Zaouali
    - Mezen Ben Kamil 
    - Jopcelin Tatang
    - David Morais Pereira
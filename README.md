# Lost in AI - Frontend Documentation

<div align="center">

**Un'esperienza satirica di customer service bancario**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 📋 Indice

- [Descrizione](#-descrizione)
- [Obiettivi del Sistema](#-obiettivi-del-sistema)
- [Architettura](#-architettura)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Store e Gestione dello Stato](#-store-e-gestione-dello-stato)
- [Flussi Principali](#-flussi-principali)
- [Variabili d'Ambiente](#-variabili-dambiente)
- [Contributi del Team](#-contributi-del-team)

---

## 📖 Descrizione

**Lost-In-AI** è un progetto frontend che simula un servizio clienti bancario con un tocco satirico. Gli utenti interagiscono con **Bankly**, un bot AI volutamente frustrante e inefficace, progettato per ironizzare sull'esperienza spesso negativa dei call center bancari.

> **Nota**: Questo progetto è stato sviluppato come satira delle esperienze frustranti con i sistemi di customer service automatizzati. Bankly è volutamente inefficace per scopi umoristici ed educativi.

---

## 🎯 Obiettivi del Sistema

- **Simulare l'inefficienza**: Il bot risponde in modo volutamente nonsense, ironizzando sui call center reali
- **Gestione sessioni**: Mantenere cronologia chat persistente attraverso le sessioni
- **UX coerente**: Interfaccia semplice e chiara nonostante il comportamento frustrante del bot
- **Controllo utente**: Possibilità di interrompere l'interazione in qualsiasi momento

---

## 🏗️ Architettura

Il progetto è organizzato in due parti principali:

- **Frontend**: Sviluppato con React 19, TypeScript e Vite
- **Backend**: Servizio esterno che gestisce le risposte simulate del bot via API REST `POST ${VITE_BE_BASE_URL}/chat`

---

## 🛠️ Tech Stack

| Tecnologia | Versione | Scopo |
|------------|----------|-------|
| **React** | 19 | Libreria UI moderna per interfacce interattive |
| **TypeScript** | 5.0+ | Tipizzazione statica per la riduzione bug |
| **Vite** | 5.0+ | Build tool rapido e dev-server performante |
| **Tailwind CSS** | v4 | Framework CSS utility-first |
| **Zustand** | Latest | State management leggero |
| **ESLint + Prettier + Husky** | Latest | Code quality e pre-commit hooks |

---

## 🚀 Getting Started

### Prerequisiti

- Node.js (v18 o superiore)
- npm o yarn

### Installazione
```bash
# 1. Clona il repository
git clone https://github.com/Lost-In-AI/lost_in_ai_FE
cd lost_in_ai_FE

# 2. Installa le dipendenze
npm install

# 3. Configura le variabili d'ambiente
# Crea un file .env nella root del progetto
touch .env
```
### Aggiungi le seguenti variabili nel file .env:
```tsx
VITE_BE_BASE_URL=<url-del-backend>
```

```bash
# 4. Avvia il server di sviluppo
npm run dev
```
---

## 📁 Struttura del Progetto

```bash
lost_in_ai_FE/
├── public/                 # Asset 
├── src/
│   ├── components/         # Componenti UI riutilizzabili
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Componenti a livello di pagina
│   ├── store/              # Store Zustand per lo stato globale
├── types/                  # Definizioni TypeScript globali
├── .env                    # Variabili d'ambiente
├── package.json            
├── vite.config.ts          
```

# 🔄 Flussi Principali
## Flusso chat

```tsx
1. Utente inserisce messaggio
   ↓
2. Frontend invia POST /chat al backend
   ↓
3. Backend risponde con messaggio simulato
   ↓
4. useSessionStore aggiorna lo stato
   ↓
5. UI mostra nuovo messaggio con animazione
```
## Flusso interruzione
```tsx
1. Utente clicca "Interrompi"
   ↓
2. Richiesta HTTP viene annullata
   ↓
3. Stato viene mantenuto coerente
   ↓
4. UI torna allo stato "idle"
```

## 👥 Contributi del Team

### 🎨 Federico
- **Design Figma**: Creazione del design completo e mockup dell'applicazione
- **Implementazione Tailwind**: Setup della struttura di design con Tailwind CSS, incluse variabili e configurazioni personalizzate
- **Gestione dello Stato Globale**: Implementazione della gestione dello stato globale per lo stato della chat utilizzando Zustand
- **Integrazione Backend**: Sviluppo della logica per le chiamate API e comunicazione con i servizi backend
- **Gestione flusso di animazione**: Coordinamento delle animazioni nell'interfaccia
- **Gestione cambio di personalità**: Coordinamento degli avatar del chatbot

### 💬 Emy
- **Project managment**: Creazione e gestione delle issue, coordinamento dello sviluppo frontend e organizzazione del workflow del team
- **Componenti UI del Chatbot**: Costruzione dell'interfaccia completa del chatbot:
  - Componente di input per i messaggi dell utente
  - Componenti per la visualizzazione dei messaggi
  - IU Stato di caricamento
  - Wrapper della chat e componenti di layout
- **Gestione Interruzioni**: Implementazione della possibilità di interrompere o bloccare le richieste al server, mantenendo lo stato dell'app coerente

### 🎵 Donato
- **Setup Iniziale**: Setup del progetto e configurazione dell'ambiente di sviluppo
- **Gestione del Flusso Musicale**: Sviluppo del sistema musicale completo e gestione dell'audio per l'applicazione
- **Landing Page**: Creazione della struttura UI e dei componenti per la pagina di atterraggio

### 🎨 Virginia
- **Componenti Core**: Sviluppo di componenti essenziali e riutilizzabili
  - Componente Button con styling coerente al figma,
  - Component Error Message
  - Gestione degli errori dell'applicazione
- **Design Creativo e Concettuale**: Fornitura di asset grafici che contribuiscono alla personalizzazione dell'aspetto del chatbot

---

### Note Importanti

- Bankly è progettato per dare risposte frustranti: è una feature, non un bug! 😄

---

## 📄 Licenza

Questo progetto è stato sviluppato a scopo educativo e satirico.

---


<div align="center">

**Made with ❤️ (and a lot of frustration) by the Lost-In-AI Team**

</div>
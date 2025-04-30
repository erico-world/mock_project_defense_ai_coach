<div align="center">
  <br />
  <img src="/public/robot.png" alt="COACH-ME-AI" width="200">
  <br />
  
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
  </div>

  <h3 align="center">COACH-ME-AI: Your AI Project Defense Coach</h3>

   <div align="center">
     A comprehensive AI-powered platform to help you prepare for your project defense presentations
   </div>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Environment Setup](#environment)
6. 📊 [Project Structure](#structure)

## 🤖 <a name="introduction">Introduction</a>

COACH-ME-AI is an innovative platform designed to help students and developers prepare for project defense presentations. Built with a modern tech stack including Next.js, Firebase, and AI technology, the platform provides realistic practice sessions with AI-powered examiners who ask relevant questions and provide comprehensive feedback.

## ⚙️ <a name="tech-stack">Tech Stack</a>

- **Frontend & Backend**: Next.js
- **Authentication & Database**: Firebase
- **Styling**: Tailwind CSS
- **Voice AI**: Vapi AI
- **UI Components**: shadcn/ui
- **AI Models**: Google Gemini
- **Form Validation**: Zod

## 🔋 <a name="features">Features</a>

👉 **Authentication**: Secure sign-up and sign-in using Firebase authentication

👉 **Create Practice Sessions**: Easily generate project defense practice sessions tailored to your project topic, technical stack, and academic level

👉 **AI Voice Interaction**: Practice with realistic AI voice examiners that ask relevant questions about your project

👉 **Comprehensive Feedback**: Receive detailed feedback on:

- Communication Skills
- Technical Knowledge
- Problem-Solving Abilities
- Academic Context
- Confidence & Clarity

👉 **Modern UI/UX**: Intuitive, responsive interface that works across devices

👉 **Practice Dashboard**: Track your progress and review past practice sessions

👉 **Personalized Experience**: Sessions adapt to your project specifics and technical stack

## 🤸 <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/coach-me-ai.git
   cd coach-me-ai
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables (see Environment Setup section)

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔗 <a name="environment">Environment Setup</a>

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

You'll need to create accounts with:

- [Firebase](https://firebase.google.com/) for authentication and database
- [Vapi](https://vapi.ai/) for AI voice capabilities
- [Google AI Studio](https://ai.google.dev/) for the Gemini AI model

## 📊 <a name="structure">Project Structure</a>

```
coach-me-ai/
├── app/                # Next.js app directory
│   ├── (auth)/         # Authentication routes
│   ├── (root)/         # Main application routes
│   ├── api/            # API endpoints
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
├── constants/          # Application constants
├── firebase/           # Firebase configuration
├── lib/                # Utility functions and actions
├── public/             # Static assets
└── package.json        # Project dependencies
```

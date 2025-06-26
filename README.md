## 🚀 Quick Access
[![Portfolio](https://img.shields.io/badge/Visit-Portfolio-blue?style=for-the-badge)](https://www.om-chavda.me)

# 💸 PayNest – Razorpay-Integrated Online Payment App

**PayNest** is a modern and secure **online payment platform** built with **Next.js**. It allows users to sign in with Google, activate their account by adding **Razorpay credentials**, and send money to other users. The app features smart contact management, a detailed transaction history, and search capabilities for messages, names, and emails.

---

## 🚀 Features

### 🔐 Authentication & Activation
- Sign in using **Google** via NextAuth
- Add Razorpay credentials to **activate account**
- Only active accounts can **receive payments**

### 💸 Payment System
- Search any active user and **send them money**
- **Attach messages** with money
- Transactions are visible to both sender and receiver

### 📇 Contacts
- Add any user to your **contact list**
- Special section for contacts with whom you transacted in **past 2 days**

### 📊 User Profile
- View your **name**, **email**
- See total **money sent**, **money received**
- Count of total **successful transactions**

### 📜 Transaction History
- View all transactions: **sent**, **received**, **successful**, **failed**
- **Search** by:
  - Other user’s name
  - Email
  - Message text
- **Filter** by:
  - Sent
  - Received

---

## 🧠 Tech Stack

- **Frontend**: Next.js (15), Tailwind CSS
- **Auth**: NextAuth with Google OAuth
- **Payments**: Razorpay SDK
- **Database**: MongoDB with Mongoose
- **UI & Icons**: Radix UI, Lucide, Tabler Icons
- **Notifications**: react-hot-toast
- **Utilities**: clsx, tailwind-merge, crypto, motion

---



## 🌐 Environment Variables

Create a `.env.local` file at the root of your project and add:

```env
GOOGLE_ID=your_google_oauth_client_id
GOOGLE_SECRET=your_google_oauth_client_secret

GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret

MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_URL=http://localhost:3000

ENCRYPTION_SECRET=your_custom_encryption_secret
```

---

## 📦 Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/paynest.git
cd paynest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create `.env.local` file and fill with your credentials (see above).

### 4. Run Dev Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 📥 Dependencies

```json
"dependencies": {
  "@radix-ui/react-label": "^2.1.7",
  "@tabler/icons-react": "^3.34.0",
  "clsx": "^2.1.1",
  "crypto": "^1.0.1",
  "lucide-react": "^0.522.0",
  "mongoose": "^8.16.0",
  "motion": "^12.18.1",
  "next": "15.3.4",
  "next-auth": "^4.24.11",
  "razorpay": "^2.9.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.5.2",
  "tailwind-merge": "^3.3.1"
}
```

---

## 🧪 Dev Dependencies

```json
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "15.3.4",
  "tailwindcss": "^4"
}
```


# 🌱 Gardening Hub - Client

A modern, responsive web application for gardening enthusiasts to share tips, connect with expert gardeners, and explore gardening knowledge.

![Gardening Hub Homepage](https://i.postimg.cc/43dpR2P5/screencapture-localhost-3001-2025-12-02-03-30-09.png)

![Browse Tips](https://i.postimg.cc/DwCb6dhc/screencapture-localhost-3001-browse-tips-2025-12-02-03-31-25.png)

## 🚀 Live Demo

- **Live Site:** [https://ph-assignment-10-garden.netlify.app](https://ph-assignment-10-garden.netlify.app)
- **Server Repository:** [GitHub - PH-Assignment-10-Server](https://github.com/MHMITHUN/PH-Assignment-10-Server)

## ✨ Features

### 🔐 Authentication
- Email/Password authentication
- Google Sign-In integration
- Protected routes for authenticated users
- User profile management
- reCAPTCHA v2 bot protection

### 📝 Gardening Tips Management
- **Browse Tips** - View all public gardening tips
- **Share Tips** - Create and publish your own tips (requires login)
- **My Tips** - Manage your personal tips (edit, delete, toggle privacy)
- **Trending Tips** - See the most liked tips
- **Filter by Difficulty** - Easy, Medium, Hard levels

### 👥 Gardener Community
- **Explore Gardeners** - Browse profiles of expert gardeners
- **Featured Gardeners** - Highlighted active community members
- **Detailed Profiles** - View gardener experience, bio, and contributions

### 🎨 User Experience
- **Dark/Light Mode** - Persistent theme toggle
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern UI** - Gradient backgrounds, smooth animations
- **Interactive Elements** - Hover effects, micro-animations
- **Toast Notifications** - User-friendly feedback messages

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + Custom CSS
- **Authentication:** Firebase Auth
- **HTTP Client:** Axios
- **UI Components:**
  - React Icons
  - React Hot Toast
  - React Google reCAPTCHA
  - React Slick (carousel)
  - SweetAlert2

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Google reCAPTCHA site key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MHMITHUN/PH-Assignment-10-Client.git
   cd PH-Assignment-10-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

   **Get Firebase config:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or use existing
   - Enable Email/Password and Google authentication
   - Copy config values to `.env`

   **Get reCAPTCHA key:**
   - Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Create reCAPTCHA v2 (checkbox)
   - Copy site key to `.env`

4. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🌐 Deployment (Netlify)

### Automatic Deployment

1. **Connect to Netlify**
   - Push code to GitHub
   - Import repository in Netlify
   - Netlify auto-detects Vite configuration

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add all `VITE_*` variables from your `.env` file
   - **Important:** Set `VITE_API_URL` to your deployed server URL

4. **Deploy**
   - Trigger deploy
   - Your site will be live!

### Manual Deployment

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
client/
├── public/
│   ├── _redirects          # Netlify SPA routing
│   └── ...
├── src/
│   ├── components/         # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── BrowseTips.jsx
│   │   ├── ShareTip.jsx
│   │   ├── MyTips.jsx
│   │   └── ...
│   ├── config/            # Configuration files
│   │   └── firebase.config.js
│   ├── utils/             # Utility functions
│   │   └── toast.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (gitignored)
├── .env.example           # Example environment file
├── netlify.toml           # Netlify configuration
├── vite.config.js         # Vite configuration
└── package.json
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | ✅ |
| `VITE_API_URL` | Backend API URL | ✅ |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 site key | ✅ |

## 🧪 Testing Locally

1. Ensure backend server is running on `http://localhost:5000`
2. Start the client with `npm run dev`
3. Open `http://localhost:3000` in your browser

### Test Features:
- ✅ Register a new account
- ✅ Login with email/password or Google
- ✅ Browse public tips
- ✅ Share a new tip (requires login)
- ✅ Edit/delete your tips
- ✅ Toggle dark/light mode
- ✅ View gardener profiles

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🎨 Features Showcase

### Authentication
- Secure Firebase authentication
- Google OAuth integration
- reCAPTCHA bot protection

### Gardening Tips
- Create, read, update, delete (CRUD)
- Public/Private visibility toggle
- Difficulty level filtering
- Like/trending system

### UI/UX
- Responsive design (mobile-first)
- Dark mode support
- Smooth animations
- Toast notifications
- Modern gradients

## 🤝 Contributing

This is an academic assignment project. Not open for contributions.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**MD Mahamudul Hasan**
- GitHub: [@MHMITHUN](https://github.com/MHMITHUN)

## 🙏 Acknowledgments

- Programming Hero Assignment 10
- Firebase for authentication
- Vite for build tooling
- Tailwind CSS for styling

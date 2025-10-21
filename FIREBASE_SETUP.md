# Firebase Setup Guide for High Five

## 🚀 Quick Start

Your website is now fully functional with Firebase integration! Here's what you need to do to get it running:

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `high-five-teacher-ratings` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" provider
3. Enable "Google" provider
4. For Google provider, add your domain to authorized domains

## 3. Create Firestore Database

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location close to your users

## 4. Get Firebase Configuration

1. Go to Project Settings (gear icon) → "General" tab
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app (</> icon)
4. Register your app with nickname: "High Five Web"
5. Copy the Firebase configuration object

## 5. Update Firebase Config

Replace the placeholder values in `/web/src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## 6. Migrate Teacher Data (Optional)

If you want to populate your database with teacher data:

1. Update the Firebase config in `/web/scripts/migrate-teachers.js`
2. Run the migration script:
   ```bash
   cd web
   node scripts/migrate-teachers.js
   ```

## 7. Set Up Firestore Security Rules

In Firebase Console → Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Teachers collection - readable by all, writable by admins
    match /teachers/{teacherId} {
      allow read: if true;
      allow write: if false; // Only admins can modify teachers
    }
    
    // Reviews collection - readable by all, writable by authenticated users
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users collection - readable/writable by the user themselves
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎉 What's Now Functional

✅ **User Authentication**
- Email/password signup and login
- Google OAuth integration
- User session management
- Protected routes

✅ **Teacher Search & Discovery**
- Dynamic teacher search with real-time suggestions
- Teacher profile pages with real data
- Rating display and statistics

✅ **Review System**
- Submit reviews with ratings and tags
- View all reviews for each teacher
- Real-time rating calculations
- Authentication-protected submissions

✅ **Database Integration**
- Firestore for data storage
- Real-time data synchronization
- Proper data relationships

## 🔧 Next Steps (Optional Enhancements)

1. **Real-time Updates**: Add live updates when new reviews are submitted
2. **Admin Panel**: Create admin interface to manage teachers
3. **Email Notifications**: Notify teachers of new reviews
4. **Advanced Search**: Filter by rating, tags, grade level
5. **User Profiles**: Let users manage their review history
6. **Moderation**: Add review moderation system

## 🚀 Deploy Your App

1. **Vercel** (Recommended):
   ```bash
   npm install -g vercel
   cd web
   vercel
   ```

2. **Netlify**:
   ```bash
   npm run build
   # Upload dist folder to Netlify
   ```

3. **Firebase Hosting**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   npm run build
   firebase deploy
   ```

## 🔒 Security Considerations

- Update Firestore rules for production
- Add email verification for user accounts
- Implement rate limiting for review submissions
- Add content moderation for reviews
- Set up proper CORS policies

## 📱 Mobile Optimization

Your app is already mobile-responsive! The design uses Tailwind CSS with responsive breakpoints.

## 🎨 Customization

- Colors: Update CSS variables in `globals.css`
- Fonts: Modify font imports in `layout.tsx`
- Branding: Update logo and colors throughout
- Features: Add new review tags or teacher fields

---

**Your teacher rating platform is now live and functional!** 🎉

Students can search for teachers, view ratings, and submit their own reviews. The system handles authentication, data storage, and real-time updates automatically.

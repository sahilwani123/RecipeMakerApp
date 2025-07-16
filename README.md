# 🍲 Recipe Maker

A sleek mobile app for discovering, creating, and saving amazing Indian recipes. From Butter Chicken to Gulab Jamun, it's your go-to cooking companion — built with **React Native** and **Expo**.

---

## 📸 Screenshots

> App screenshots below:
- 🏠 Home Page
   <img width="378" height="811" alt="Screenshot 2025-07-16 124428" src="https://github.com/user-attachments/assets/c23033b0-4a2b-4e4e-8bbe-10b10996ba5c" />
   
- ➕ Add Recipe
  <img width="367" height="891" alt="Screenshot 2025-07-16 124636" src="https://github.com/user-attachments/assets/d49e4565-6703-4216-aab7-a309eb906a06" />
  
- ❤️ Favorites
  <img width="361" height="751" alt="Screenshot 2025-07-16 124604" src="https://github.com/user-attachments/assets/f8196086-16df-4094-afa4-f7142681668a" />
  
- 🧾 Scroll View
  <img width="357" height="830" alt="Screenshot 2025-07-16 002821" src="https://github.com/user-attachments/assets/9f5e28d6-6fd0-4bc7-a661-1950e3e96803" />

- 🔐 Sign In (filled)
  <img width="375" height="816" alt="Screenshot 2025-07-16 124400" src="https://github.com/user-attachments/assets/536796f1-0910-4512-b24a-f6bccfc2be52" />
  
- 🔓 Sign In (empty)
  <img width="355" height="824" alt="Screenshot 2025-07-16 002735" src="https://github.com/user-attachments/assets/0c876e4c-3bad-4085-ad75-42dd88305ced" />
  
- 🕒 Timer
  <img width="375" height="658" alt="Screenshot 2025-07-16 124617" src="https://github.com/user-attachments/assets/f9678851-6528-4674-a49c-0d6d08c78b8b" />

- 🔍 Search
  <img width="357" height="193" alt="Screenshot 2025-07-16 124648" src="https://github.com/user-attachments/assets/8b73fb63-463c-4b3e-818a-9322f95cc0fb" />



---

## ✨ Purpose of the App

The **Recipe Maker** app allows users to:

- Explore and filter Indian recipes by category (e.g., Snacks, Desserts, Curries).
- Add new custom recipes with difficulty level, ingredients, and an image.
- Mark recipes as **favorites** for quick access.
- Sign in with email or social accounts to **securely save recipes**.

> This project was inspired by the love for Indian cuisine and the need for a modern way to digitally **store, share, and discover recipes**.

---

## 🛠 Tech Stack

| Feature | Technology |
|--------|-------------|
| **Framework** | React Native (via Expo) |
| **Routing** | React Navigation / Expo Router |
| **Camera** | expo-camera |
| **Notifications** | expo-notifications |
| **UI Components** | NativeBase / Custom React Native Components |
| **Authentication** | Firebase Auth |
| **Database** | Firebase Firestore or preferred backend |
| **Icons** | React Native Vector Icons / Lucide Icons |

---

## 🤝 Collaborators

| Name | GitHub | Email |
|------|--------|-------|
| Vanshika | (https://github.com/Vanshikamahant) | vanshikamahant@gmail.com |
| Uman Muzaffar | (https://github.com/UmanMuzaffar) | umandand05@gmail.com |

---

## 📚 What We Learned

- File-based navigation using **Expo Router**
- Controlled inputs and form validation
- Camera integration to **upload recipe images**
- Local push notifications with **expo-notifications**
- UI layout using **View, ScrollView, FlatList, Text**
- State and effect management using `useState`, `useEffect`, and `useRef`
- Firebase Authentication & securing protected routes

---

## 🚧 Installation & Running Locally

> Make sure you have **Node.js** and **Expo CLI** installed.

```bash
git clone https://github.com/yourusername/recipe-maker-app.git
cd recipe-maker-app
npm install
npx expo start
```

### 📱 To Test on a Device:
- Install **Expo Go** app on Android/iOS
- Scan the QR code shown in the terminal/browser after `npx expo start`

---

## 🔒 Authentication

- Firebase Email/Password Auth integrated
- Add your Firebase config in a `.env` or config file
- Optionally extend to support Google / Apple Sign-In

---

## 📁 Folder Structure (Basic)

```
/app
  /screens
  /components
  /assets
  /services
/App.js
```

---

## 📬 Feedback & Contributions

Have ideas to improve? Found a bug?  
Feel free to open a pull request or issue!

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

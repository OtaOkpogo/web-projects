import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuSb55Ou9A5kG13uxxkkjxe5Bl7YHgXJo",
  authDomain: "interprep-app",
  projectId: "interprep-app",
  storageBucket: "interprep-app",
  messagingSenderId: "442832203249",
  appId: "interprep-app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


import { auth, db } from '../firebase/firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { validateEmail, validateRequired } from '../utils/validators.js';
import { showToast } from '../components/toast.js';

export const initLogin = () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('toggle-password');
  const btnSubmit = document.getElementById('btn-login');

  if (togglePassword) {
    togglePassword.addEventListener('change', (e) => {
      passwordInput.type = e.target.checked ? 'text' : 'password';
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Reset Error Messages
      document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

      let isValid = true;
      if (!validateRequired(email) || !validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Email tidak valid';
        isValid = false;
      }
      if (!validateRequired(password)) {
        document.getElementById('password-error').textContent = 'Password wajib diisi';
        isValid = false;
      }

      if (!isValid) return;

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner"></span> Memproses...`;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        
        if (userDoc.exists()) {
          sessionStorage.setItem('user_session', JSON.stringify(userDoc.data()));
          window.location.href = 'dashboard.html';
        } else {
          throw new Error('Data profil user tidak ditemukan');
        }
      } catch (error) {
        showToast(error.message, 'danger');
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = 'Login';
      }
    });
  }
};

export const checkSession = (onSuccess) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (window.location.pathname.endsWith('login.html')) {
        window.location.href = 'dashboard.html';
      } else if (onSuccess) {
        onSuccess(user);
      }
    } else {
      if (!window.location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
      }
    }
  });
};

export const logout = async () => {
  await signOut(auth);
  sessionStorage.removeItem('user_session');
  window.location.href = 'login.html';
};

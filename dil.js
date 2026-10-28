import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// FIREBASE AYARLARI
const firebaseConfig = {
  apiKey: "AIzaSyB_QgwlRfonAj3PyA3QWEeHZ0qINi9I8Cw",
  authDomain: "maisson-fb7ae.firebaseapp.com",
  databaseURL: "https://maisson-fb7ae-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "maisson-fb7ae",
  storageBucket: "maisson-fb7ae.firebasestorage.app",
  messagingSenderId: "1041887335858",
  appId: "1:1041887335858:web:92f88a256991e19d85c0ab"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Global Firebase fonksiyonları
window.firebaseDB = database;
window.firebaseRef = ref;
window.firebaseSet = set;
window.firebaseOnValue = onValue;
window.firebasePush = push;

// ============================================
// DİL DEĞİŞTİRME (Düzeltildi)
// ============================================
function changeLang(lang, btn) {
    // Butonların aktifliğini ayarla
    if (btn) {
        document.querySelectorAll('.lang-selector button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    // Dili hafızaya kaydet
    localStorage.setItem('maissonLang', lang);
    // Dili uygula
    applyLanguage(lang);
}

function applyLanguage(lang) {
    // Sayfa yönünü (RTL) ayarla
    document.documentElement.setAttribute('lang', lang);
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    // Sayfadaki tüm data-* etiketlerini güncelle
    document.querySelectorAll('[data-tr], [data-en], [data-ar]').forEach(el => {
        const translatedText = el.getAttribute(`data-${lang}`);
        if (translatedText) {
            el.textContent = translatedText;
        }
    });
}

// ============================================
// TEMA DEĞİŞTİRME (Düzeltildi)
// ============================================
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    if (body.classList.contains('light-mode')) {
        // Karanlık moda geç
        body.classList.remove('light-mode'); 
        localStorage.setItem('maissonTheme', 'dark'); 
        if (icon) icon.textContent = '🌙';
    } else {
        // Aydınlık moda geç
        body.classList.add('light-mode'); 
        localStorage.setItem('maissonTheme', 'light'); 
        if (icon) icon.textContent = '☀️';
    }
}

// ============================================
// SAYFA YÜKLENDİĞİNDE HAFIZAYI UYGULA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Dili Uygula
    const savedLang = localStorage.getItem('maissonLang') || 'tr';
    applyLanguage(savedLang);

    // Dil butonlarını güncelle
    document.querySelectorAll('.lang-selector button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toLowerCase() === savedLang) {
            btn.classList.add('active');
        }
    });
    
    // 2. Temayı Uygula
    const savedTheme = localStorage.getItem('maissonTheme') || 'dark';
    const icon = document.getElementById('themeIcon');
    if (savedTheme === 'light') { 
        document.body.classList.add('light-mode'); 
        if (icon) icon.textContent = '☀️'; 
    } else { 
        document.body.classList.remove('light-mode'); 
        if (icon) icon.textContent = '🌙'; 
    }
});

// Fonksiyonları HTML dosyalarından çağrılabilir yap
window.changeLang = changeLang;
window.toggleTheme = toggleTheme;

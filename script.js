// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLtyPh91GCq2tUQsVW6mApSzu6QdwmEXc",
  authDomain: "safe-space-anonvents.firebaseapp.com",
  projectId: "safe-space-anonvents",
  storageBucket: "safe-space-anonvents.firebasestorage.app",
  messagingSenderId: "684031284047",
  appId: "1:684031284047:web:3b1aa41f7b0dd6e78ceb3a",
  measurementId: "G-9NCSQH52E8"
};

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// --- All other website functionality goes here ---
document.addEventListener('DOMContentLoaded', () => {

  const siteHeader = document.getElementById('siteHeader');
  
  // --- MOBILE NAVIGATION TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const closeMobileNav = () => siteHeader.classList.remove('nav-open');
  if (navToggle) navToggle.addEventListener('click', () => siteHeader.classList.toggle('nav-open'));
  if (navOverlay) navOverlay.addEventListener('click', closeMobileNav);

  // --- SMOOTH SCROLL & ACTIVE NAV LINK ---
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileNav();
    });
  });

  // --- APPOINTMENT BUTTON SCROLL ---
  const navBookBtn = document.getElementById('bookBtn');
  const heroBookBtn = document.getElementById('heroBook');
  const mobileBookBtn = document.getElementById('mobileBookBtn');
  const bookingSection = document.getElementById('booking');
  const scrollToBooking = (e) => {
    e.preventDefault();
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileNav();
  };
  if (navBookBtn) navBookBtn.addEventListener('click', scrollToBooking);
  if (heroBookBtn) heroBookBtn.addEventListener('click', scrollToBooking);
  if (mobileBookBtn) mobileBookBtn.addEventListener('click', scrollToBooking);

  // --- FADE-IN SECTIONS ON SCROLL ---
  const sections = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // --- FOOTER YEAR ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // =================================================================
  // === ANONYMOUS VENT & MODAL FUNCTIONALITY WITH FIREBASE =====
  // =================================================================
  const ventTextarea = document.getElementById('ventTextarea');
  const postVentBtn = document.getElementById('postVentBtn');
  const ventDisplayArea = document.getElementById('ventDisplayArea');
  const ventTriggerBtn = document.getElementById('ventTriggerBtn');
  const ventFormContent = document.getElementById('ventFormContent');
  
  const modal = document.getElementById('ventModal');
  const modalText = document.getElementById('modalVentText');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let allVents = [];
  let currentIndex = -1;

  // --- LOAD VENTS FROM FIREBASE (REAL-TIME) ---
  const ventsQuery = query(collection(db, "vents"), orderBy("timestamp", "desc"));
  onSnapshot(ventsQuery, (snapshot) => {
    ventDisplayArea.innerHTML = ''; // Clear display
    allVents = []; // Reset local array
    snapshot.forEach((doc) => {
      const vent = doc.data();
      const ventCard = document.createElement('div');
      ventCard.className = 'vent-card';
      
      const date = vent.timestamp?.toDate(); // The ?. is a safe-guard
      const formattedDate = date ? date.toLocaleString('en-US', {
        month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }) : 'Just now';

      ventCard.innerHTML = `<p>"${vent.text}"</p><small>Posted ${formattedDate}</small>`;
      ventDisplayArea.appendChild(ventCard);
      allVents.push(ventCard);
    });
  });

  // --- SAVE A NEW VENT TO FIREBASE ---
  if (postVentBtn) {
    postVentBtn.addEventListener('click', async () => {
      const ventText = ventTextarea.value.trim();
      if (ventText === '') return;

      try {
        await addDoc(collection(db, "vents"), {
          text: ventText,
          timestamp: serverTimestamp() // Use the server's timestamp
        });
        ventTextarea.value = '';
        if (ventFormContent.classList.contains('is-open')) {
          ventFormContent.classList.remove('is-open');
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Sorry, could not post your vent. Please try again later.");
      }
    });
  }

  // --- MODAL AND ACCORDION LOGIC ---
  if (ventTriggerBtn) {
    ventTriggerBtn.addEventListener('click', () => {
      ventFormContent.classList.toggle('is-open');
    });
  }
  const openModal = (index) => {
    if (index < 0 || index >= allVents.length) return;
    currentIndex = index;
    modalText.innerHTML = allVents[index].querySelector('p').innerHTML;
    modal.style.display = 'block';
  };
  const closeModal = () => modal.style.display = 'none';
  if (ventDisplayArea) {
    ventDisplayArea.addEventListener('click', (e) => {
      const clickedCard = e.target.closest('.vent-card');
      if (clickedCard) {
        openModal(allVents.indexOf(clickedCard));
      }
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  if (nextBtn) nextBtn.addEventListener('click', () => openModal((currentIndex + 1) % allVents.length));
  if (prevBtn) prevBtn.addEventListener('click', () => openModal((currentIndex - 1 + allVents.length) % allVents.length));
});

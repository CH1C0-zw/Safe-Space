document.addEventListener('DOMContentLoaded', () => {

  const siteHeader = document.getElementById('siteHeader');
  
  // --- MOBILE NAVIGATION TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');

  const closeMobileNav = () => {
    siteHeader.classList.remove('nav-open');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      siteHeader.classList.toggle('nav-open');
    });
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  // --- SMOOTH SCROLL & ACTIVE NAV LINK ---
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMobileNav();
  };

  if (navBookBtn) navBookBtn.addEventListener('click', scrollToBooking);
  if (heroBookBtn) heroBookBtn.addEventListener('click', scrollToBooking);
  if (mobileBookBtn) mobileBookBtn.addEventListener('click', scrollToBooking);


  // --- FADE-IN SECTIONS ON SCROLL ---
  const sections = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // --- FOOTER YEAR ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- ANONYMOUS VENT & MODAL FUNCTIONALITY ---
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

  if (ventTriggerBtn) {
    ventTriggerBtn.addEventListener('click', () => {
      ventFormContent.classList.toggle('is-open');
    });
  }

  const refreshVents = () => { allVents = Array.from(document.querySelectorAll('#ventDisplayArea .vent-card')); };
  const openModal = (index) => {
    if (index < 0 || index >= allVents.length) return;
    currentIndex = index;
    modalText.innerHTML = allVents[index].querySelector('p').innerHTML;
    modal.style.display = 'block';
  };
  const closeModal = () => { modal.style.display = 'none'; };

  if (postVentBtn) {
    postVentBtn.addEventListener('click', () => {
      const ventText = ventTextarea.value.trim();
      if (ventText === '') return;
      const newVentCard = document.createElement('div');
      newVentCard.className = 'vent-card';
      newVentCard.innerHTML = `<p>"${ventText}"</p><small>Posted a few moments ago</small>`;
      ventDisplayArea.prepend(newVentCard);
      ventTextarea.value = '';
      refreshVents();
      if (ventFormContent.classList.contains('is-open')) {
        ventFormContent.classList.remove('is-open');
      }
    });
  }
  
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
  if (nextBtn) nextBtn.addEventListener('click', () => { openModal((currentIndex + 1) % allVents.length); });
  if (prevBtn) prevBtn.addEventListener('click', () => { openModal((currentIndex - 1 + allVents.length) % allVents.length); });

  refreshVents();
});

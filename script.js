document.addEventListener('DOMContentLoaded', () => {

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
    });
  });

  // --- APPOINTMENT BUTTON SCROLL ---
  // This makes the 'Request Appointment' buttons scroll to the contact form
  const navBookBtn = document.getElementById('bookBtn');
  const heroBookBtn = document.getElementById('heroBook');
  const contactSection = document.getElementById('contact');

  const scrollToContact = (e) => {
    e.preventDefault();
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (navBookBtn) navBookBtn.addEventListener('click', scrollToContact);
  if (heroBookBtn) heroBookBtn.addEventListener('click', scrollToContact);


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
  
  // Modal Elements
  const modal = document.getElementById('ventModal');
  const modalText = document.getElementById('modalVentText');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let allVents = [];
  let currentIndex = -1;

  const refreshVents = () => {
    allVents = Array.from(document.querySelectorAll('#ventDisplayArea .vent-card'));
  };

  const openModal = (index) => {
    if (index < 0 || index >= allVents.length) return;
    
    currentIndex = index;
    const ventContent = allVents[index].querySelector('p').innerHTML;
    modalText.innerHTML = ventContent;
    modal.style.display = 'block';
  };
  
  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (postVentBtn) {
    postVentBtn.addEventListener('click', () => {
      const ventText = ventTextarea.value.trim();
      if (ventText === '') return;

      const newVentCard = document.createElement('div');
      newVentCard.className = 'vent-card';
      newVentCard.innerHTML = `
        <p>"${ventText}"</p>
        <small>Posted a few moments ago</small>
      `;
      ventDisplayArea.prepend(newVentCard);
      ventTextarea.value = '';
      
      refreshVents();
    });
  }
  
  if (ventDisplayArea) {
    ventDisplayArea.addEventListener('click', (e) => {
      const clickedCard = e.target.closest('.vent-card');
      if (clickedCard) {
        const index = allVents.indexOf(clickedCard);
        openModal(index);
      }
    });
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % allVents.length;
      openModal(newIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + allVents.length) % allVents.length;
      openModal(newIndex);
    });
  }

  refreshVents();
});
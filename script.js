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

// =================================================================
// === LANGUAGE TRANSLATION ========================================
// =================================================================

const translations = {
  en: {
    pageTitle: "Ellen's Safe Space — Counseling Services",
    logoTagline: "Safe Space",
    navAbout: "About",
    navServices: "Services",
    navVent: "Anonymous Vent",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    btnRequestAppointment: "Request Appointment",
    heroMotto: "Speak freely. Be heard. Find calm.",
    heroSub: "A safe, supportive space for short vent sessions and counseling for individuals and couples.",
    btnAnonVent: "Anonymous Vent",
    servicesTitle: "Our Services",
    servicesSub: "We offer a range of support tailored to your needs.",
    service1Title: "Individual Counseling",
    service1Desc: "One-on-one sessions to explore your thoughts and feelings in a confidential setting.",
    service2Title: "Couples Counseling",
    service2Desc: "Support for building healthier communication and stronger connections with your partner.",
    service3Title: "Anonymous Vent Sessions",
    service3Desc: "A non-judgmental space to simply let go and be heard without any strings attached.",
    ventTitle: "Vent Anonymously",
    ventSub: "A judgment-free zone. Share what's on your mind below.",
    ventFormTitle: "Let It Out...",
    ventTrigger: "Click Here to Vent",
    ventPlaceholder: "Type what's on your mind... no names, no identifiers. Just your thoughts.",
    ventPost: "Post Anonymously",
    testimonialsTitle: "What People Are Saying",
    testimonial1: "\"The counseling session was life-changing. I felt heard and truly supported. Thank you.\"",
    testimonial2: "\"The quick vent session was exactly what I needed to clear my head. Simple and effective.\"",
    testimonial3: "\"My partner and I made more progress in one couples session than we had in months on our own.\"",
    contactTitle: "Get In Touch",
    contactSub: "The easiest way to reach out is through WhatsApp or Facebook.",
    contactWhatsapp: "Chat on WhatsApp",
    contactFacebook: "Message on Facebook",
    bookingTitle: "Or, Book a Session Directly",
    bookingSub: "Fill out the form below to request your appointment.",
    formApptType: "Appointment type",
    formApptOptionDefault: "Select type...",
    formApptOption1: "Individual Counseling",
    formApptOption2: "Couples Counseling",
    formApptOption3: "Just need to vent (off-my-chest)",
    formFormat: "Format",
    formFormatOption1: "Voice call",
    formFormatOption2: "Text chat",
    formDate: "Choose date",
    formTime: "Choose time",
    formName: "Your name",
    formNamePlaceholder: "Your name or a nickname",
    formPhone: "Phone number (for WhatsApp)",
    formEmail: "Email (for confirmation)",
    formReason: "Reason for visit (optional)",
    formReasonPlaceholder: "Briefly, what's on your mind?",
    formConsent: "I agree to the privacy policy and understand this is not an emergency service.",
    formReset: "Reset",
    formSubmit: "Confirm Booking",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
  },
  sn: { // SHONA TRANSLATIONS
    pageTitle: " Ellen's Safe Space — Counseling Services",
    // --- NAV & BUTTON TEXT NOW STAYS IN ENGLISH ---
    logoTagline: "Safe Space",
    navAbout: "About",
    navServices: "Services",
    navVent: "Anonymous Vent",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    btnRequestAppointment: "Request Appointment", // This line was changed
    // --- END OF CHANGE ---
    heroMotto: " Taura wakasununguka. Inzwika. Wana zororo.",
    heroSub: " Nzvimbo yakachengeteka, inotsigira zvikamu zvekuburitsa zviri pamoyo nekupa mazano kune vanhu vasina kuroora uye vakaroorana.",
    btnAnonVent: " Buditsa Chiri Mumoyo",
    servicesTitle: " Masevhisi Edu",
    servicesSub: " Isu tinopa rutsigiro rwakasiyana-siyana rwakagadzirirwa zvaunoda.",
    service1Title: " Mazano emunhu mumwe",
    service1Desc: " Zvikamu zvemunhu mumwe chete kuti uongorore pfungwa nemanzwiro ako munzvimbo yakavanzika.",
    service2Title: " Mazano eVakaroorana",
    service2Desc: " Rutsigiro rwekuvaka kutaurirana kune hutano uye hukama hwakasimba nemumwe wako.",
    service3Title: " Zvikamu zveAnonymous Vent",
    service3Desc: " Nzvimbo isina rusaruro yekungoregedza nekunzwika pasina tambo dzakabatanidzwa.",
    ventTitle: " Buditsa Chiri Mumoyo",
    ventSub: " Nzvimbo isina kutongwa. Goverana zviri mupfungwa dzako pazasi.",
    ventFormTitle: " Zvibudise...",
    ventTrigger: " Dzvanya Pano Kuti Uburitse",
    ventPlaceholder: " Nyora zviri mupfungwa dzako...",
    ventPost: " Tumira Usingazivikanwe",
    testimonialsTitle: " Zviri Kutaurwa neVanhu",
    testimonial1: "\" Chikamu chemazano chakachinja hupenyu. Ndakanzwa kunzwika uye kutsigirwa zvechokwadi. Ndatenda.\"",
    testimonial2: "\" Chikamu chekukurumidza kuburitsa chaive chaicho chandaida kujekesa musoro wangu. Zviri nyore uye zvinoshanda.\"",
    testimonial3: "\" Ini nemumwe wangu takabudirira zvakanyanya muchikamu chimwe chevakaroora kupfuura zvatakanga taita mumwedzi tiri toga.\"",
    contactTitle: " Taura Nesu",
    contactSub: " Nzira iri nyore yekusvika ndeye WhatsApp kana Facebook.",
    contactWhatsapp: " Taura paWhatsApp",
    contactFacebook: " Tumira meseji paFacebook",
    bookingTitle: " Kana, Bhuka Chikamu Zvakananga",
    bookingSub: " Zadza fomu riri pazasi kuti ukumbire kusangana kwako.",
    formApptType: " Rudzi rwekusangana",
    formApptOptionDefault: " Sarudza rudzi...",
    formApptOption1: " Mazano emunhu mumwe",
    formApptOption2: " Mazano eVakaroorana",
    formApptOption3: " Kungoda kuburitsa (pachifuva changu)",
    formFormat: " Chimiro",
    formFormatOption1: " Kufona nezwi",
    formFormatOption2: " Kunyorerana mameseji",
    formDate: " Sarudza zuva",
    formTime: " Sarudza nguva",
    formName: " Zita rako",
    formNamePlaceholder: " Zita rako kana zita remadunhurirwa",
    formPhone: " Nhamba dzerunhare (dzekuWhatsApp)",
    formEmail: " Email (yekusimbisa)",
    formReason: " Chikonzero chekushanya (kusarudza)",
    formReasonPlaceholder: " Muchidimbu, chii chiri mupfungwa dzako?",
    formConsent: " Ndinobvumirana nemutemo wekuvanzika uye ndinonzwisisa kuti iyi haisi sevhisi yekukurumidzira.",
    formReset: " Dzosa",
    formSubmit: " Simbisa Kubhuka",
    footerPrivacy: " Zvekuvanzika",
    footerTerms: " Mitemo",
  },
  nd: { // NDEBELE TRANSLATIONS
    pageTitle: " Ellen's Safe Space — Counseling Services",
    // --- NAV & BUTTON TEXT NOW STAYS IN ENGLISH ---
    logoTagline: "Safe Space",
    navAbout: "About",
    navServices: "Services",
    navVent: "Anonymous Vent",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    btnRequestAppointment: "Request Appointment", // This line was changed
    // --- END OF CHANGE ---
    heroMotto: " Khuluma ukhululekile. Zwakala. Thola ukuthula.",
    heroSub: " Indawo ephephile, esekelayo yezikhathi ezimfushane zokukhipha okusenhliziyweni kanye nokwelulekwa kwabantu ngabanye nabashadile.",
    btnAnonVent: " Khipha Okusenhliziyweni",
    servicesTitle: " Imisebenzi Yethu",
    servicesSub: " Sinikeza uhla losekelo olwenzelwe izidingo zakho.",
    service1Title: " Ukwelulekwa Komuntu Oyedwa",
    service1Desc: " Izikhathi zomuntu oyedwa zokuhlola imicabango nemizwa yakho endaweni eyimfihlo.",
    service2Title: " Ukwelulekwa Kwabashadile",
    service2Desc: " Usekelo lokwakha ukuxhumana okunempilo nokuxhumana okuqinile nomlingani wakho.",
    service3Title: " Izikhathi Zokukhipha Okungaziwa",
    service3Desc: " Indawo engenakwahlulela yokumane uyeke uzwakale ngaphandle kwezibopho.",
    ventTitle: " Khipha Okungaziwa",
    ventSub: " Indawo engenakwahlulelwa. Yabelana ngalokho okusemqondweni wakho ngezansi.",
    ventFormTitle: " Kukhiphe...",
    ventTrigger: " Chofoza Lapha Ukuze Ukhiphe",
    ventPlaceholder: " Thayipha okusemqondweni wakho...",
    ventPost: " Thumela Ngokungaziwa",
    testimonialsTitle: " Okushiwo Abantu",
    testimonial1: "\" Isikhathi sokwelulekwa besishintsha impilo. Ngizwe ngilalelwe futhi ngisekelwe ngempela. Ngiyabonga.\"",
    testimonial2: "\" Isikhathi esisheshayo sokukhipha bekuyilokho kanye engangikudinga ukuze ngicacise ikhanda lami. Kulula futhi kuyasebenza.\"",
    testimonial3: "\" Mina nomlingani wami senze inqubekelaphambili enkulu esimisweni esisodwa sabashadile kunalokho ebesinakho ezinyangeni sisodwa.\"",
    contactTitle: " Thintana Nathi",
    contactSub: " Indlela elula yokufinyelela inge-WhatsApp noma i-Facebook.",
    contactWhatsapp: " Xoxa ku-WhatsApp",
    contactFacebook: " Thumela umlayezo ku-Facebook",
    bookingTitle: " Noma, Bhukha Iseshini Ngokuqondile",
    bookingSub: " Gcwalisa ifomu elingezansi ukuze ucele ukuqokwa kwako.",
    formApptType: " Uhlobo lokuqokwa",
    formApptOptionDefault: " Khetha uhlobo...",
    formApptOption1: " Ukwelulekwa Komuntu Oyedwa",
    formApptOption2: " Ukwelulekwa Kwabashadile",
    formApptOption3: " Ngidinga nje ukukhipha (okuphuma esifubeni sami)",
    formFormat: " Ifomethi",
    formFormatOption1: " Ucingo lwezwi",
    formFormatOption2: " Ingxoxo yombhalo",
    formDate: " Khetha usuku",
    formTime: " Khetha isikhathi",
    formName: " Igama lakho",
    formNamePlaceholder: " Igama lakho noma isiteketiso",
    formPhone: " Inombolo yocingo (ye-WhatsApp)",
    formEmail: " I-imeyili (yokuqinisekisa)",
    formReason: " Isizathu sokuvakasha (uyazikhethela)",
    formReasonPlaceholder: " Kafushane, yini esemqondweni wakho?",
    formConsent: " Ngiyavumelana nenqubomgomo yobumfihlo futhi ngiyaqonda ukuthi lokhu akuyona isevisi yezimo eziphuthumayo.",
    formReset: " Setha kabusha",
    formSubmit: " Qinisekisa Ukubhuka",
    footerPrivacy: " Ubumfihlo",
    footerTerms: " Imigomo",
  }
};


// --- All other website functionality goes here ---
document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  
  // =================================================================
  // === LANGUAGE SWITCHER LOGIC =====================================
  // =================================================================
  const langButtons = document.querySelectorAll('.btn-lang');
  
  const setLanguage = (lang) => {
    // Apply translations
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-translate-key');
      const translation = translations[lang][key];

      if (translation !== undefined) {
        if (el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', translation);
        } else {
          el.textContent = translation;
        }
      }
    });
    
    // Update active button state
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Store preference
    localStorage.setItem('userLanguage', lang);

    // --- EDIT: If the mobile nav is open, close it and unlock body scroll ---
    if (siteHeader && siteHeader.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      document.body.classList.remove('no-scroll');
    }
  };

  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedLang = button.dataset.lang;
      setLanguage(selectedLang);
    });
  });

  // Check for saved language on load
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
  } else {
    setLanguage('en'); // Default to English
  }

  // --- MOBILE NAVIGATION TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const mainNav = document.querySelector('.main-nav'); // Select the nav itself
  
  const closeMobileNav = () => {
    siteHeader.classList.remove('nav-open');
    document.body.classList.remove('no-scroll');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      siteHeader.classList.toggle('nav-open');
      document.body.classList.toggle('no-scroll'); // lock background scroll
    });
  }

  if (navOverlay) navOverlay.addEventListener('click', closeMobileNav);
  
  // Close nav when a link inside it is clicked
  if (mainNav) {
    mainNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        closeMobileNav();
      }
    });
  }

  // --- SMOOTH SCROLL & ACTIVE NAV LINK ---
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        // We call closeMobileNav() here too, but the nav-level click handles it.
        // This is a good fallback.
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- APPOINTMENT BUTTON SCROLL ---
  const navBookBtn = document.getElementById('bookBtn');
  const heroBookBtn = document.getElementById('heroBook');
  const mobileBookBtn = document.getElementById('mobileBookBtn');
  const bookingSection = document.getElementById('booking');
  const scrollToBooking = (e) => {
    if (e) e.preventDefault();
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // closeMobileNav() is not needed here as these buttons aren't in the mobile nav menu
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
    if (!ventDisplayArea) return;
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
    document.body.classList.add('no-scroll'); // lock scroll when modal open for better UX
  };
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  };
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

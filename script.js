// Theme handling
const body = document.body;
const btnTheme = document.querySelector('.fa-moon') || document.querySelector('.fa-sun');
const btnHamburger = document.querySelector('.fa-bars');

// Theme functions
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  if (btnTheme) {
    btnTheme.classList.add(btnClass);
  }
}

// Get saved theme from localStorage or use defaults
const getBodyTheme = localStorage.getItem('portfolio-theme') || 'light';
const getBtnTheme = localStorage.getItem('portfolio-btn-theme') || 'fa-moon';
addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
  const currentTheme = localStorage.getItem('portfolio-theme');
  const currentBtnTheme = localStorage.getItem('portfolio-btn-theme');
  
  if (currentTheme) body.classList.remove(currentTheme);
  if (btnTheme && currentBtnTheme) btnTheme.classList.remove(currentBtnTheme);
  
  addThemeClass(bodyClass, btnClass);
  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
}

const toggleTheme = () => {
  if (isDark()) {
    setTheme('light', 'fa-moon');
  } else {
    setTheme('dark', 'fa-sun');
  }
}

// Event listeners
if (btnTheme) {
  btnTheme.addEventListener('click', toggleTheme);
}

// Navigation handling
const displayList = () => {
  const navUl = document.querySelector('.nav__list');
  if (!navUl || !btnHamburger) return;
  
  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars');
    btnHamburger.classList.add('fa-times');
    navUl.classList.add('display-nav-list');
  } else {
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    navUl.classList.remove('display-nav-list');
  }
}

if (btnHamburger) {
  btnHamburger.addEventListener('click', displayList);
}

// Scroll to top button
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top');
  if (!btnScrollTop) return;
  
  if (window.scrollY > 500) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
}

window.addEventListener('scroll', scrollUp);

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip if it's just "#"
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (btnHamburger && btnHamburger.classList.contains('fa-times')) {
        displayList();
      }
    }
  });
});

// Add animations CSS
const addAnimationStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 1s ease forwards;
    }
    
    .animate-slideInUp {
      animation: slideInUp 0.8s ease forwards;
    }
    
    .animate-bounce {
      animation: bounce 2s infinite;
    }
    
    .project {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project:hover {
      transform: translateY(-10px) !important;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .scroll-top {
      transition: opacity 0.3s ease;
    }
    
    .nav__list-item {
      transition: transform 0.2s ease;
    }
    
    .nav__list-item:hover {
      transform: translateY(-3px);
    }
    
    .skills__list-item {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .skills__list-item:hover {
      transform: scale(1.05);
      background-color: var(--clr-primary);
      color: var(--clr-bg);
    }
  `;
  
  document.head.appendChild(styleEl);
}

// Apply animations to elements
const applyAnimations = () => {
  // Section headings
  document.querySelectorAll('.section__title').forEach(title => {
    title.classList.add('animate-fadeIn');
    title.style.opacity = '0';
    title.style.animationDelay = '0.2s';
  });
  
  // Projects
  document.querySelectorAll('.project').forEach((project, index) => {
    project.classList.add('animate-slideInUp');
    project.style.opacity = '0';
    project.style.animationDelay = `${0.2 + (index * 0.1)}s`;
  });
  
  // Skills
  document.querySelectorAll('.skills__list-item').forEach((skill, index) => {
    skill.classList.add('animate-slideInUp');
    skill.style.opacity = '0';
    skill.style.animationDelay = `${0.1 + (index * 0.05)}s`;
  });
  
  // About section elements
  const aboutElements = [
    '.about__role',
    '.about__desc',
    '.about__contact'
  ];
  
  aboutElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add('animate-slideInUp');
      element.style.opacity = '0';
      element.style.animationDelay = `${0.3 + (index * 0.2)}s`;
    }
  });
  
  // Scroll arrow bounce
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.classList.add('animate-bounce');
  }
}

// Create a simple scroll progress bar
const createProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0%';
  progressBar.style.height = '3px';
  progressBar.style.backgroundColor = 'var(--clr-primary)';
  progressBar.style.zIndex = '1000';
  progressBar.style.transition = 'width 0.2s ease';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Function to highlight active nav item
const highlightNavOnScroll = () => {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if(window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav__list-item a').forEach(link => {
      link.classList.remove('active-nav');
      if(link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  });
}

// Add active nav styling
const addActiveNavStyle = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .active-nav {
      color: var(--clr-primary) !important;
      font-weight: bold !important;
    }
  `;
  document.head.appendChild(styleEl);
}

// Wait for page to load before applying animations
window.addEventListener('DOMContentLoaded', () => {
  addAnimationStyles();
  createProgressBar();
  addActiveNavStyle();
  
  // Slight delay to ensure elements are ready
  setTimeout(() => {
    applyAnimations();
    highlightNavOnScroll();
  }, 100);
});
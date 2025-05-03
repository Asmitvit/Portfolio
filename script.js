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

// Change default theme to 'dark' if not already saved in localStorage
const getBodyTheme = localStorage.getItem('portfolio-theme') || 'dark';
const getBtnTheme = localStorage.getItem('portfolio-btn-theme') || 'fa-sun';
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

// Timeline Animation
document.addEventListener('DOMContentLoaded', function() {
    // Check if timeline items exist
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    if (timelineItems.length) {
      // Initial check on page load
      checkTimelineItemsInView();
      
      // Check on scroll
      window.addEventListener('scroll', checkTimelineItemsInView);
    }
    
    function checkTimelineItemsInView() {
      timelineItems.forEach(item => {
        const top = item.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        
        if (isVisible) {
          item.classList.add('animate');
        }
      });
    }
    
    // Add event listeners to timeline items for special effects
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.timeline__icon i');
        if (!icon) return;
        
        // Apply a random transform to the icon for a more dynamic effect
        const transforms = [
          'rotateY(180deg)',
          'rotateX(180deg)',
          'scale(1.2)',
          'translateY(-5px)'
        ];
        
        const randomTransform = transforms[Math.floor(Math.random() * transforms.length)];
        
        icon.style.transition = 'transform 0.5s ease';
        icon.style.transform = randomTransform;
      });
      
      item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.timeline__icon i');
        if (!icon) return;
        icon.style.transform = 'none';
      });
    });
});

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

// Add loader styles
const addLoaderStyles = () => {
  if (document.getElementById('loader-styles')) return;
  
  const loaderStyles = document.createElement('style');
  loaderStyles.id = 'loader-styles';
  loaderStyles.textContent = `
    .pixel-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--clr-bg, #ffffff);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    }
    
    .pixel-loader.hidden {
      opacity: 0;
    }
    
    .pixel-loader__container {
      width: 300px;
      text-align: center;
    }
    
    .pixel-loader__character {
      width: 40px;
      height: 40px;
      background-color: var(--clr-primary, #4a4a4a);
      margin: 0 auto 20px;
      animation: bounce 0.5s infinite alternate;
    }
    
    .pixel-loader__ground {
      width: 100px;
      height: 4px;
      background-color: #ddd;
      margin: 0 auto 30px;
    }
    
    .pixel-loader__progress {
      width: 100%;
      height: 20px;
      background-color: #eee;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    
    .pixel-loader__progress-bar {
      height: 100%;
      width: 0%;
      background-color: var(--clr-primary, #4a4a4a);
      transition: width 0.3s ease-out;
    }
    
    .pixel-loader__percentage {
      margin-bottom: 10px;
      font-family: monospace;
      font-size: 14px;
    }
    
    .pixel-loader__text {
      font-family: monospace;
      font-size: 16px;
      letter-spacing: 1px;
    }
    
    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(loaderStyles);
};

// Fixed Pixelated Game-Style Loading Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add loader styles first
  addLoaderStyles();
  
  // Get or create loader
  let loader = document.querySelector('.pixel-loader');
  let progressBar, percentageElement, loadingText;
  
  // If loader doesn't exist or doesn't have proper structure, create or update it
  if (!loader) {
    const loaderHTML = `
      <div class="pixel-loader">
        <div class="pixel-loader__container">
          <div class="pixel-loader__character"></div>
          <div class="pixel-loader__ground"></div>
          <div class="pixel-loader__progress">
            <div class="pixel-loader__progress-bar"></div>
          </div>
          <div class="pixel-loader__percentage">0%</div>
          <div class="pixel-loader__text">LOADING...</div>
        </div>
      </div>
    `;
    
    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    loader = document.querySelector('.pixel-loader');
  }
  
  // Get references to elements
  progressBar = loader.querySelector('.pixel-loader__progress-bar');
  percentageElement = loader.querySelector('.pixel-loader__percentage');
  loadingText = loader.querySelector('.pixel-loader__text');
  
  // Make sure all elements exist
  if (!progressBar || !percentageElement || !loadingText) {
    console.error('Loader elements not found');
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
    return;
  }
  
  // Start with 0%
  progressBar.style.width = '0%';
  percentageElement.textContent = '0%';
  
  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(function() {
    // Increase progress
    progress += Math.random() * 15;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      // Ensure 100% is shown
      progressBar.style.width = '100%';
      percentageElement.textContent = '100%';
      loadingText.textContent = 'LOADING... 100%';
      
      // Hide loader after a short delay
      setTimeout(function() {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after transition completes
        setTimeout(function() {
          if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
          
          // Trigger entrance animations for content
          triggerEntranceAnimations();
        }, 500);
      }, 500);
    } else {
      // Update progress bar and text
      const currentProgress = Math.floor(progress);
      progressBar.style.width = currentProgress + '%';
      percentageElement.textContent = currentProgress + '%';
      loadingText.textContent = `LOADING... ${currentProgress}%`;
      
      // Random "game loading" messages
      if (progress > 30 && progress < 60 && Math.random() > 0.7) {
        const messages = [
          "RENDERING PIXELS...",
          "INITIALIZING INTERFACE...",
          "CHARGING POWER-UPS...",
          "BUILDING WORLD...",
          "LOADING EXPERIENCE..."
        ];
        loadingText.textContent = messages[Math.floor(Math.random() * messages.length)];
      }
    }
  }, 200);
});

// Sound effect system using Web Audio API
let pixelAudioContext = null;

// Function to safely create audio context after user interaction
function createAudioContext() {
  if (pixelAudioContext) return pixelAudioContext;
  
  try {
    pixelAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    return pixelAudioContext;
  } catch(e) {
    console.log('Web Audio API not supported');
    return null;
  }
}

// Function to play different pixel sounds based on type
function playPixelSound(type, volume = 0.1) {
  // Ensure audio context exists and is created after user interaction
  const audioContext = createAudioContext();
  if (!audioContext) return;
  
  // Create oscillator
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Set volume
  gainNode.gain.value = volume;
  
  // Configure sound based on type
  switch(type) {
    case 'hover':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
      
    case 'click':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
      break;
      
    case 'select':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1800, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
      
    case 'powerup':
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1800, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
      break;
      
    default:
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
  }
}

// Add sound effects to interactive elements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only add these effects after loader is gone and user has interacted with the page
  document.addEventListener('click', function initializeSounds() {
    // Create audio context on first interaction
    createAudioContext();
    
    // Only continue setting up sound effects if audio is supported
    if (!pixelAudioContext) return;
    
    // Remove this initialization listener
    document.removeEventListener('click', initializeSounds);
    
    // Wait for loader to be gone
    setTimeout(() => {
      // Add sound to important buttons
      const buttons = document.querySelectorAll('.btn--outline');
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          playPixelSound('hover');
        });
        
        button.addEventListener('click', () => {
          playPixelSound('click');
        });
      });
      
      // Add sound to nav items
      const navItems = document.querySelectorAll('.nav__list-item');
      
      navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          playPixelSound('hover', 0.05);
        });
        
        item.addEventListener('click', () => {
          playPixelSound('select', 0.1);
        });
      });
  
      // Add sounds to portfolio items
      const portfolioItems = document.querySelectorAll('.portfolio__item');
      if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            playPixelSound('hover', 0.08);
          });
          
          item.addEventListener('click', () => {
            playPixelSound('powerup', 0.15);
          });
        });
      }
    }, 1500);
  });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if we need to create a theme toggle button
  const existingThemeToggle = document.querySelector('.theme-toggle') || document.querySelector('.fa-moon') || document.querySelector('.fa-sun');
  
  if (!existingThemeToggle) {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = isDark() ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    // Add click event
    themeToggle.addEventListener('click', function() {
      toggleTheme();
      
      // Update icon after theme change
      const themeIcon = themeToggle.querySelector('i');
      if (themeIcon) {
        themeIcon.className = isDark() ? 'fas fa-sun' : 'fas fa-moon';
      }
      
      // Add visual effect for theme change
      animateToggleEffect();
    });
  }
  
  // Add a visual effect when toggling theme
  function animateToggleEffect() {
    const effect = document.createElement('div');
    effect.className = 'theme-toggle-effect';
    effect.style.position = 'fixed';
    effect.style.top = '0';
    effect.style.left = '0';
    effect.style.width = '100%';
    effect.style.height = '100%';
    effect.style.backgroundColor = isDark() ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    effect.style.zIndex = '999';
    effect.style.pointerEvents = 'none';
    effect.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(effect);
    
    // Fade out and remove the effect
    setTimeout(() => {
      effect.style.opacity = '0';
      setTimeout(() => {
        if (effect.parentNode) {
          document.body.removeChild(effect);
        }
      }, 500);
    }, 50);
  }
  
  // Add CSS for theme toggle if not present
  if (!document.getElementById('theme-toggle-styles')) {
    const themeToggleStyles = document.createElement('style');
    themeToggleStyles.id = 'theme-toggle-styles';
    themeToggleStyles.textContent = `
      .theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--clr-primary, #4a4a4a);
        color: var(--clr-bg, #ffffff);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 99;
        transition: transform 0.3s ease;
      }
      
      .theme-toggle:hover {
        transform: scale(1.1);
      }
      
      .theme-toggle i {
        font-size: 18px;
      }
      
      .theme-toggle-effect {
        opacity: 1;
      }
    `;
    document.head.appendChild(themeToggleStyles);
  }
});

// Trigger entrance animations for content sections
function triggerEntranceAnimations() {
  // Add entrance animation classes to main sections
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    // Set initial state
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Trigger animation with delay based on index
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });
  
  // Special animation for about section
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'scale(0.95)';
    aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      aboutSection.style.opacity = '1';
      aboutSection.style.transform = 'scale(1)';
    }, 300);
  }
}

// Add animations CSS
const addAnimationStyles = () => {
  if (document.getElementById('animation-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'animation-styles';
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
      transform: translateY(-10px);
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
    
    .active-nav {
      color: var(--clr-primary, #0077ff);
      font-weight: bold;
    }
 `;
  
  document.head.appendChild(styleEl);
};

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
};

// Create a simple scroll progress bar
const createProgressBar = () => {
  if (document.querySelector('.scroll-progress-bar')) return;
  
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
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
};

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
};

// Wait for page to load before applying animations
window.addEventListener('DOMContentLoaded', () => {
  addAnimationStyles();
  createProgressBar();
  
  // Slight delay to ensure elements are ready
  setTimeout(() => {
    applyAnimations();
    highlightNavOnScroll();
  }, 100);
});

// Ensure loader is removed after page load as a fallback
window.addEventListener('load', function() {
  setTimeout(function() {
    const loader = document.querySelector('.pixel-loader');
    if (loader && loader.parentNode) {
      loader.classList.add('hidden');
      setTimeout(function() {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 2000);
    }
  }, 4000);
});
// Contact Form Handling - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      const formData = new FormData(form);
      
      // Using fetch with correct options
      fetch(form.action, {
        method: 'POST', // Explicitly set method to POST
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        if (response.ok) {
          formStatus.className = 'status-success';
          formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
          form.reset();
        } else {
          response.json().then(data => {
            formStatus.className = 'status-error';
            formStatus.textContent = data.error || "Oops! There was a problem sending your message.";
          })
          .catch(error => {
            formStatus.className = 'status-error';
            formStatus.textContent = "There was a problem with the server response.";
          });
        }
      })
      .catch(error => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        formStatus.className = 'status-error';
        formStatus.textContent = "Network error. Please check your connection and try again.";
      });
    });
  }
});
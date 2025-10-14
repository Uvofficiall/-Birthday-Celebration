// Professional Full Animation System
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let targetFPS = 120;
let frameTime = 1000 / targetFPS;
let lastTime = 0;
let isScrolling = false;
let scrollTimeout;

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('bg'), 
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
  
  // Enhanced Particle System
  const particleCount = 3000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.3 + 0.7, 0.8, 0.8);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  
  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  camera.position.z = 1000;
  
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  animate();
}

function animate(currentTime) {
  requestAnimationFrame(animate);
  
  if (currentTime - lastTime < frameTime) return;
  lastTime = currentTime;
  
  const time = currentTime * 0.0005;
  const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2);
  
  // Dynamic particle animation
  particles.rotation.x = time * 0.15 + (isScrolling ? 0.5 : 0);
  particles.rotation.y = time * 0.25 + (mouseX * 0.1);
  
  // Enhanced mouse parallax
  camera.position.x += (mouseX * 150 - camera.position.x) * 0.08 * deltaTime;
  camera.position.y += (mouseY * 150 - camera.position.y) * 0.08 * deltaTime;
  
  // Scroll-reactive particles
  const scrollY = window.pageYOffset;
  particles.position.y += (scrollY * 0.3 - particles.position.y) * 0.1 * deltaTime;
  
  renderer.render(scene, camera);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Mouse ripple effect
  createMouseRipple(event.clientX, event.clientY);
}

function createMouseRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'mouse-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  
  gsap.to(ripple, {
    duration: 0.6,
    scale: 20,
    opacity: 0,
    ease: 'power2.out',
    onComplete: () => ripple.remove()
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Professional Animation System
gsap.registerPlugin(ScrollTrigger);
gsap.ticker.fps(120);
gsap.config({ force3D: true, nullTargetWarn: false });

window.addEventListener('load', () => {
  if (screen.refreshRate && screen.refreshRate > 60) {
    targetFPS = Math.min(screen.refreshRate, 120);
    frameTime = 1000 / targetFPS;
  }
  
  initThree();
  enableHighPerformanceMode();
  
  // Auto scroll to Enter Celebration button
  setTimeout(() => {
    const enterBtn = document.getElementById('enter-site');
    if (enterBtn) {
      enterBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1000);
  
  // Initialize animations after splash is hidden
  setTimeout(() => {
    if (document.getElementById('birthday-splash').style.display === 'none') {
      initAnimations();
      initInteractions();
    }
  }, 1000);
});

function initSplashScreen() {
  const splash = document.getElementById('birthday-splash');
  const enterBtn = document.getElementById('enter-site');
  
  if (!splash || !enterBtn) {
    console.error('Splash screen elements not found');
    return;
  }
  
  // Simple enter button handler
  enterBtn.onclick = function() {
    console.log('Enter button clicked!');
    // Hide splash screen immediately
    splash.style.display = 'none';
    
    // Initialize main content
    initAnimations();
    initInteractions();
  };
  
  // Also work with touch
  enterBtn.ontouchstart = function() {
    console.log('Enter button touched!');
    splash.style.display = 'none';
    initAnimations();
    initInteractions();
  };
}

function createConfettiExplosion() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.innerHTML = ['🎉', '🎊', '✨', '🌟', '💖'][Math.floor(Math.random() * 5)];
    document.body.appendChild(confetti);
    
    const angle = (i / 50) * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    
    gsap.to(confetti, {
      duration: 2,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance + 200,
      rotation: Math.random() * 720,
      scale: 0,
      opacity: 0,
      ease: 'power2.out',
      onComplete: () => confetti.remove()
    });
  }
}

function enableHighPerformanceMode() {
  document.body.style.transform = 'translateZ(0)';
  document.body.style.backfaceVisibility = 'hidden';
  document.body.style.perspective = '1000px';
  document.body.style.willChange = 'transform';
}

function initAnimations() {
  // Animated page entrance
  gsap.timeline()
    .from('header', { duration: 1, y: -100, opacity: 0, ease: 'power3.out' })
    .from('.hero-section h1', { duration: 1.5, y: 100, opacity: 0, ease: 'power3.out', force3D: true }, '-=0.5')
    .from('.hero-section p', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out', force3D: true }, '-=0.8')
    .from('.hero-section .btn-primary', { duration: 1, scale: 0, opacity: 0, ease: 'back.out(1.7)', force3D: true }, '-=0.5')
    .from('.photo-frame', { duration: 1.5, x: 100, opacity: 0, rotation: 10, ease: 'power3.out', force3D: true }, '-=1');
  
  // Continuous floating animation
  gsap.to('.photo-frame', {
    duration: 3,
    y: -20,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    force3D: true
  });
  
  // Scroll-triggered section animations
  gsap.utils.toArray('section').forEach((section, i) => {
    gsap.from(section.children, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => animateSection(section),
        onLeave: () => resetSection(section)
      },
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      force3D: true
    });
  });
  
  // Memory items advanced animation
  gsap.from('.memory-item', {
    scrollTrigger: {
      trigger: '#memories',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    scale: 0,
    opacity: 0,
    rotation: 180,
    ease: 'back.out(1.7)',
    stagger: 0.05,
    force3D: true
  });
  
  // Sparkle continuous animation
  gsap.to('.sparkle', {
    duration: 2,
    scale: 1.5,
    opacity: 0.3,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
    force3D: true
  });
  
  gsap.to('.sparkle', {
    duration: 4,
    rotation: 360,
    ease: 'none',
    repeat: -1,
    stagger: 0.5,
    force3D: true
  });
}

function animateSection(section) {
  gsap.to(section, {
    duration: 0.5,
    scale: 1.02,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1,
    force3D: true
  });
}

function resetSection(section) {
  gsap.to(section, {
    duration: 0.3,
    scale: 1,
    ease: 'power2.out',
    force3D: true
  });
}

function initInteractions() {
  // Enhanced scroll animations
  let scrollTl = gsap.timeline({ paused: true });
  
  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    
    // Scroll progress animation
    const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    gsap.to('.sparkle-effect', {
      duration: 0.3,
      rotation: scrollProgress * 360,
      scale: 1 + scrollProgress * 0.5,
      force3D: true
    });
    
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  });
  
  // Enhanced click animations for all interactive elements
  document.querySelectorAll('button, a, .memory-item').forEach(element => {
    element.addEventListener('click', (e) => {
      createClickExplosion(e.clientX, e.clientY);
      
      // Modern button press effect
      gsap.timeline()
        .to(element, { 
          duration: 0.1, 
          scale: 0.92, 
          rotationX: 5,
          rotationY: 2,
          ease: 'power2.out', 
          force3D: true 
        })
        .to(element, { 
          duration: 0.3, 
          scale: 1.05, 
          rotationX: 0,
          rotationY: 0,
          ease: 'back.out(2)', 
          force3D: true 
        })
        .to(element, { 
          duration: 0.2, 
          scale: 1, 
          ease: 'power2.out', 
          force3D: true 
        });
      
      // Glow effect
      gsap.to(element, {
        duration: 0.5,
        boxShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(134, 239, 172, 0.6)',
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
      
      // Handle section navigation for buttons
      if (element.getAttribute('href') && element.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = element.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          // Page transition effect
          gsap.to('body', {
            duration: 0.3,
            scale: 0.98,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
          });
          
          gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: 'power3.inOut',
            onUpdate: () => {
              gsap.to(particles.rotation, {
                duration: 0.1,
                x: particles.rotation.x + 0.2,
                y: particles.rotation.y + 0.2,
                force3D: true
              });
            },
            onComplete: () => {
              if (targetId === '#wishes') {
                startTypingAnimation();
              }
            }
          });
        }
      }
    });
  });
  
  // Memory item interactions
  document.querySelectorAll('.memory-item').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        duration: 0.2,
        scale: 1.1,
        rotation: 5,
        z: 50,
        ease: 'power2.out',
        force3D: true
      });
      
      // Animate neighboring items
      gsap.to(item.parentElement.children, {
        duration: 0.3,
        scale: 0.95,
        ease: 'power2.out',
        force3D: true
      });
      
      gsap.to(item, {
        duration: 0.3,
        scale: 1.1,
        ease: 'power2.out',
        force3D: true
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        duration: 0.2,
        scale: 1,
        rotation: 0,
        z: 0,
        ease: 'power2.out',
        force3D: true
      });
      
      gsap.to(item.parentElement.children, {
        duration: 0.3,
        scale: 1,
        ease: 'power2.out',
        force3D: true
      });
    });
  });
  
  // Button hover effects
  document.querySelectorAll('.btn-primary, a[href^="#"]').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        duration: 0.2,
        scale: 1.05,
        y: -5,
        ease: 'power2.out',
        force3D: true
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        duration: 0.2,
        scale: 1,
        y: 0,
        ease: 'power2.out',
        force3D: true
      });
    });
  });
  
  // Navigation smooth scroll with animations
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: target,
          ease: 'power3.inOut',
          onUpdate: () => {
            // Animate particles during scroll
            gsap.to(particles.rotation, {
              duration: 0.1,
              x: particles.rotation.x + 0.1,
              y: particles.rotation.y + 0.1,
              force3D: true
            });
          }
        });
      }
    });
  });
}

function createClickExplosion(x, y) {
  // Modern wave effect
  const wave = document.createElement('div');
  wave.className = 'click-wave';
  wave.style.left = x + 'px';
  wave.style.top = y + 'px';
  document.body.appendChild(wave);
  
  gsap.timeline()
    .to(wave, { duration: 0.6, scale: 30, opacity: 0, ease: 'power2.out' })
    .call(() => wave.remove());
  
  // Particle burst
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    const angle = (i / 12) * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    
    gsap.to(particle, {
      duration: 0.8 + Math.random() * 0.4,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: 0,
      opacity: 0,
      ease: 'power2.out',
      onComplete: () => particle.remove()
    });
  }
  
  // Screen flash effect
  const flash = document.createElement('div');
  flash.className = 'screen-flash';
  document.body.appendChild(flash);
  
  gsap.timeline()
    .to(flash, { duration: 0.1, opacity: 0.3, ease: 'power2.out' })
    .to(flash, { duration: 0.3, opacity: 0, ease: 'power2.out' })
    .call(() => flash.remove());
}

// Page visibility optimization
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

// Typing Animation Function
function startTypingAnimation() {
  const wishesText = document.getElementById('wishes-text');
  const fullText = "Happy Birthday, beautiful soul! ✨ Another year of your incredible journey around the sun! May this special day bring you boundless joy, laughter, and all the wonderful things you deserve. Here's to celebrating the amazing person you are! 🎉💖 You're my favorite human! 🎉 You're not just a friend — you're family. From late-night talks to random laughs, every memory with you is gold. Hope your day is as amazing as your vibe. Wishing you endless happiness, success, and crazy adventures ahead! ❤️✨";
  
  wishesText.innerHTML = '<span class="typing-cursor">|</span>';
  
  let currentIndex = 0;
  
  function typeNextCharacter() {
    if (currentIndex < fullText.length) {
      const currentText = fullText.substring(0, currentIndex + 1);
      wishesText.innerHTML = currentText + '<span class="typing-cursor">|</span>';
      currentIndex++;
      
      // Variable typing speed for natural feel
      const delay = fullText[currentIndex - 1] === ' ' ? 50 : Math.random() * 100 + 30;
      setTimeout(typeNextCharacter, delay);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        wishesText.innerHTML = fullText;
      }, 1000);
    }
  }
  
  // Start typing after a brief delay
  setTimeout(typeNextCharacter, 500);
}
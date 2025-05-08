document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
      
      if (!isClickInsideNav && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  
    // Animaciones al hacer scroll
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll('.section-animate');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.getAttribute('data-animation');
            const animationDelay = element.getAttribute('data-delay') || '0';
            
            element.style.animationDelay = animationDelay;
            element.classList.add(animationType);
            
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
  
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    };
  
    // Inicializar animaciones
    animateOnScroll();
  });
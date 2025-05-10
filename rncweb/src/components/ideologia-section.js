const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background: url('public/imagenes/fondo-estrellas.jpg');
      background-size: cover;
      color: white;
      padding: 60px 20px;
      text-align: center;
      font-family: 'Cinzel', serif;
    }
    .ideologia-titulo {
      font-size: 20px;
      letter-spacing: 2px;
      margin-bottom: 10px;
      color: #ccc;
      margin-top: 120px;

    }
    .ideologia-subtitulo {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .ideologia-texto {
      max-width: 800px;
      margin: 0 auto 20px;
      font-size: 19px;
      line-height: 1.8;
      color: white;
    }
    /* Responsive */
    @media(max-width: 768px) {
      :host {
        padding: 40px 10px;
      }
      .ideologia-texto {
        font-size: 16px;
        max-width: 95%;
      }
    }
  </style>
  <section id="ideologia" class="section-animate" data-animation="animate-fadeInUp">
    <h2 class="ideologia-titulo">IDEOLOGÍA</h2>
    <h3 class="ideologia-subtitulo">¿En qué creemos?</h3>
    <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="100">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="200">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="300">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
      id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua.
    </p>
  </section>
`;

class IdeologiaSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this._initAnimations();
  }
  _initAnimations() {
    const animatedElements = this.shadowRoot.querySelectorAll('.section-animate');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const el = entry.target;
          const anim = el.getAttribute('data-animation');
          const delay = el.getAttribute('data-delay') || '0s';
          el.style.animationDelay = delay;
          el.classList.add(anim);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach(el => observer.observe(el));
  }
}

customElements.define('ideologia-section', IdeologiaSection);

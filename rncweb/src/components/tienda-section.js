const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #2c2c2c;
      padding: 40px 20px;
      text-align: center;
      font-family: 'Cinzel', serif;
      color: white;
    }
    .tienda-titulo {
      font-size: 28px;
      margin-bottom: 30px;
      color: white;
      padding-top:40px;
      
    }
    .productos-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin: 0 auto;
      justify-content: center;
    }
    .producto {
      background-color: #3e3e3e;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      transition: transform 0.2s;
      width: 250px;
      margin: 0 auto;
    }
    .producto:hover {
      transform: scale(1.03);
    }
    .producto img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 5px;
    }
    .precio {
      margin-top: 10px;
      font-size: 16px;
      background-color: #5c4433;
      color: white;
      padding: 6px 10px;
      border-radius: 5px;
      display: inline-block;
    }
    .mensaje-tienda {
      margin-top: 40px;
      font-size: 16px;
      background-color: #5c4433;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      color: white;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .productos-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .productos-grid {
        grid-template-columns: 1fr;
      }

    }
  </style>
  <section id="tienda" class="section-animate" data-animation="animate-fadeInUp">
    <h2 class="tienda-titulo">TIENDA</h2>
    <div class="productos-grid">
    <a href="./producto.html">
      <div class="producto" data-animation="animate-fadeInUp" data-delay="100">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
    </a>
      <div class="producto" data-animation="animate-fadeInUp" data-delay="200">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
      <div class="producto" data-animation="animate-fadeInUp" data-delay="300">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
      <div class="producto" data-animation="animate-fadeInUp" data-delay="100">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
      <div class="producto" data-animation="animate-fadeInUp" data-delay="200">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
      <div class="producto" data-animation="animate-fadeInUp" data-delay="300">
        <img src="public/imagenes/camiseta.png" alt="camiseta" />
        <p class="precio">60.000$</p>
      </div>
    </div>
    <div class="mensaje-tienda section-animate" data-animation="animate-fadeInUp" data-delay="400">
      Estamos trabajando para traer más diseños y productos!
    </div>
  </section>
`;

class TiendaSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
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

customElements.define('tienda-section', TiendaSection);

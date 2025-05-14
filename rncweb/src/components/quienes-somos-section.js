const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background: url('public/imagenes/space-bg.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      font-family: 'Cinzel', serif;
      padding: 60px 40px;
      text-align: center;
    }

    .tituloqns {
      font-size: 26px;
      font-style: italic;
      margin-bottom: 30px;
      margin-top: 80px;

    }

    .section-1 {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap: wrap;
      margin-buttom: 50px;
    }

    .img1, .img2 {
      width: 350px;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }

    .img1 {
      transform: rotate(-12deg);
    }

    .img2 {
      transform: rotate(12deg);
    }

    .texto-qns {
      max-width: 367px;
      line-height: 1.8;
      text-align: center;
      font-size: 19px;
      color: white;
    }
  .animate-fadeInUp {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-fadeInUp.visible {
    opacity: 1;
    transform: translateY(0);
  }


    .section-2 {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-buttom: 50px;

    }

    .img3 {
      width: 380px;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }

    .texto-qns2 {
      max-width: 450px;
      text-align: center;
      font-size: 19px;
      line-height: 1.8;
      color: white;
    }

    /* Responsive */

    @media (max-width: 768px) {
      :host {
        padding: 40px 20px;
      }

      .section-1, .section-2 {
        flex-direction: column;
        gap: 20px;
      }

      .img1, .img2, .img3 {
        width: 80%;
        transform: none !important;
      }

      .texto-qns, .texto-qns2 {
        max-width: 90%;
        font-size: 16px;
      }
    }
  </style>

  <section id="quienes-somos" class="section-animate" data-animation="animate-fadeInUp">
    <h1 class="tituloqns">¿QUIENES SOMOS?</h1>

    <div class="section-1">
      <img class="img1 section-animate" src="/imagenes/1.jpg" alt="Imagen izquierda" data-animation="animate-fadeInLeft" data-delay="100" />
      <p class="texto-qns section-animate" data-animation="animate-fadeInUp" data-delay="200">
        Resurgimiento Nacional es una organización política fundada<br/>
        sobre los principios inquebrantables de unidad nacional,<br/>
        soberanía absoluta y preservación de nuestra identidad patria.<br/>
        sIdenficados por la salvaguarda de la tradición y defensores de<br/>
        la independencia nacional, comprometidos con el<br/>
        resurgimiento de una Colombia fuerte, unida y soberana.
      </p>
      <img class="img2 section-animate" src="/imagenes/2.jpg" alt="Imagen derecha" data-animation="animate-fadeInRight" data-delay="100" />
    </div>

    <div class="section-2">
      <img class="img3 section-animate" src="/imagenes/4.jpg" alt="" data-animation="animate-fadeInLeft" data-delay="100" />
      <p class="texto-qns2 section-animate" data-animation="animate-fadeInUp" data-delay="200">
        No somos simples actores políticos; somos el movimiento de<br/>
        los patriotas, los que alzan la voz por la grandeza de la Nación <br/>
        frente a las amenazas de la decadencia. Nuestra causa es<br/>
        clara: Colombia primero, siempre.<br/>
        Con disciplina, honor y lealtad, trabajamos para asegurar que las generaciones futuras hereden una patria libre, orgullosa y<br/>
        dueña de su destino. Colombia no se negocia, se defiende.
      </p>
    </div>
  </section>
`;

class QuienesSomosSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
  }

  
  _initAnimations() {
    const animatedElements = this.shadowRoot.querySelectorAll('.section-animate');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const animationType = el.getAttribute('data-animation');
          const animationDelay = el.getAttribute('data-delay') || '0s';

          el.style.animationDelay = animationDelay;
          el.classList.add(animationType);

          observer.unobserve(el);
        }
      });
    },{
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }
}

customElements.define('quienes-somos-section', QuienesSomosSection);

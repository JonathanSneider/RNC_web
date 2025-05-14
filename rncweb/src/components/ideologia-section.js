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
    <strong>Soberanía Nacional e Independencia:</strong><br>
    Establecer la soberanía sobre el territorio, decisiones políticas y económicas, y gestión de recursos naturales.
    Garantizar que ningún estado o entidad extranjera tenga derecho, beneficio o poder sobre el territorio, recursos naturales, población, decisiones políticas y económicas.
    Deber del Estado y sus ciudadanos de preservar la patria, su soberanía e independencia en todos los aspectos.
  </p>

  <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="200">
    <strong>Identidad Cultural:</strong><br>
    Protección y promoción de la identidad y la cultura colombiana.
    Rechazo a cualquier ideología racista, discriminatoria, segregacionista o de superioridad entre culturas, religiones, etnias, razas, costumbres y grupos sociales.
    Priorización del bienestar del ciudadano colombiano y la convivencia pacífica entre todas las comunidades.
  </p>

  <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="300">
    <strong>Respeto por la Historia:</strong><br>
    Valoración y respeto por la historia y valores del país.
    Enseñanza de la cultura colombiana resaltando sus logros históricos y promoviendo el orgullo nacional.
    Superar las manchas del narcotráfico, violencia y criminalidad para destacar las acciones nobles de los colombianos.
  </p>

  <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="400">
    <strong>Bienestar Nacional:</strong><br>
    Priorización del bienestar y mejora de la calidad de vida de la población en tiempos de paz.
    Garantizar derechos como seguridad, salud, trabajo, vida, defensa personal y libertad para todos los ciudadanos, con especial atención a los más vulnerables.
    Apoyo a la eugenesia únicamente con fines médicos para prevenir discapacidades, sin propósitos raciales o políticos.
  </p>

  <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="500">
    <strong>Orden y Seguridad:</strong><br>
    Apoyo a la pena de muerte para criminales no políticos que hayan cometido crímenes atroces, traición a la patria o amenacen la seguridad del pueblo colombiano.
    Todos los prisioneros a través del trabajo van a contribuir al bienestar de la sociedad.
    Respeto a los derechos de los prisioneros y garantía de libertad tras cumplir su castigo y rehabilitación.
    Los ciudadanos tienen total derecho a la defensa personal, de sus cercanos y de sus propiedades y esto primará sobre la vida del agresor.
  </p>

  <p class="ideologia-texto section-animate" data-animation="animate-fadeInUp" data-delay="600">
    <strong>Políticas Internacionales y Económicas:</strong><br>
    Impulso al desarrollo económico e industrial para el pueblo colombiano, brindando garantías y apoyo a la población para competir en el mercado.
    Fomento de la producción nacional y la competitividad frente a productos extranjeros, apoyando la mano de obra local y los productos colombianos.
    Extracción de recursos naturales exclusivamente por entidades colombianas, con destinos dirigidos a la defensa de la patria y el bienestar de la población.
    Exigencia de un Estado neutral en la geopolítica internacional, buscando siempre el beneficio nacional en asuntos de política exterior.
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

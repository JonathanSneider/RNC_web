import { productos } from './productos.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #2c2c2c;
      padding: clamp(20px, 5vw, 40px) clamp(10px, 3vw, 20px);
      text-align: center;
      font-family: 'Cinzel', serif;
      color: white;
    }

    .tienda-titulo {
      font-size: clamp(1.5rem, 6vw, 2.2rem);
      margin-bottom: clamp(20px, 4vw, 30px);
      color: white;
      padding-top: clamp(20px, 4vw, 40px);
      letter-spacing: 1px;
    }

    .productos-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(60px, 3vw, 30px);
      margin: 0 auto;
      justify-content: center;
      max-width: 1000px;
      padding: 0 10px;
      
    }

    .producto-link {
      text-decoration: none;
      color: inherit;
      display: block;
      height: 100%;
    }

    .producto {
      background-color: #3e3e3e;
      padding: clamp(10px, 2vw, 15px);
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      
    }

    .producto:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.6);
    }

    .producto img {
      width: 100%;
      height: clamp(200px, 30vw, 250px);
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .precio {
      margin-top: auto;
      font-size: clamp(14px, 2vw, 16px);
      background-color: #5c4433;
      color: white;
      padding: 6px 10px;
      border-radius: 5px;
      display: inline-block;
      margin-bottom: 5px;
    }

    .mensaje-tienda {
      margin-top: clamp(20px, 5vw, 40px);
      font-size: clamp(14px, 2vw, 16px);
      background-color: #5c4433;
      padding: clamp(15px, 3vw, 20px);
      border-radius: 0 0 10px 10px;
      color: white;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 900px) {
      .productos-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .productos-grid {
        grid-template-columns: 1fr;
        justify-items: center; /* Centra los elementos del grid */
        max-width: 300px; /* Ancho máximo para móvil */
        row-gap: 30px;
      }
      
      .producto {
        max-width: 250px; /* Ancho fijo para móvil */
        width: 100%; /* Ocupa todo el espacio disponible */
      }
    }
  </style>

  <section id="tienda">
    <h2 class="tienda-titulo">TIENDA</h2>
    <div class="productos-grid" id="productos-container">
      <!-- Productos se generan aquí -->
    </div>
    <div class="mensaje-tienda">
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
    this.renderProductos();
  }

  renderProductos() {
    const container = this.shadowRoot.getElementById('productos-container');
    container.innerHTML = '';

    Object.entries(productos).forEach(([id, producto]) => {
      const productoHTML = `
        <a href="producto.html?id=${id}" class="producto-link">
          <div class="producto">
            <img src="${producto.imagenes[0]}" alt="${producto.titulo}" loading="lazy" />
            <p class="precio">${producto.precio}</p>
          </div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', productoHTML);
    });
  }
}

customElements.define('tienda-section', TiendaSection);
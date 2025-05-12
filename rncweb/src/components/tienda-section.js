import { productos } from './productos.js';

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
      padding-top: 40px;
    }

    .productos-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(250px, 1fr));
      gap: 30px;
      margin: 0 auto;
      justify-content: center;
      max-width: 1000px;
    }

    .producto-link {
      text-decoration: none;
      color: inherit;
    }

    .producto {
      background-color: #3e3e3e;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      transition: transform 0.2s;
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
            <img src="${producto.imagenes[0]}" alt="${producto.titulo}" />
            <p class="precio">${producto.precio}</p>
          </div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', productoHTML);
    });
  }
}

customElements.define('tienda-section', TiendaSection);

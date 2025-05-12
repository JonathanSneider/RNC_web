import { articulos } from './articulos.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .wrapper {
      padding: 40px;
      background-color: #1e1e1e;
      color: white;
      font-family: 'Cinzel', serif;
      display: flex;
      justify-content: center;
    }

    .container {
      max-width: 800px;
      text-align: center;
    }

    .titulo {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .imagen {
      width: 100%;
      max-width: 500px;
      border-radius: 15px;
      margin-bottom: 20px;
    }

    .descripcion {
      font-size: 1.1rem;
      line-height: 1.6;
      white-space: pre-line;  /* Esta es la propiedad clave */
      text-align: left;      /* Alinea el texto a la izquierda */
      margin: 0 auto;       /* Centra el contenedor */
      max-width: 80ch;      /* Ancho máximo en caracteres */
    }

    @media (max-width: 768px) {
      .titulo {
        font-size: 2rem;
      }
    }
  </style>

  <div class="wrapper">
    <div class="container">
      <h1 class="titulo"></h1>
      <img class="imagen" />
      <p class="descripcion"></p>
    </div>
  </div>
`;

class ArticuloDetalle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('articulo');

    const articulo = articulos.find(a => a.id === id);

    if (!articulo) {
      this.shadowRoot.querySelector('.container').innerHTML = `<p>Artículo no encontrado.</p>`;
      return;
    }

    this.shadowRoot.querySelector('.titulo').textContent = articulo.titulo;
    this.shadowRoot.querySelector('.imagen').src = articulo.imagen;
    this.shadowRoot.querySelector('.descripcion').textContent = articulo.texto;
  }
}

customElements.define('articulo-detalle', ArticuloDetalle);

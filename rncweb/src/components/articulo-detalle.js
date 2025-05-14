import { articulos } from './articulos.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .wrapper {
      padding: 60px 20px;
      background-color: #121212;
      color: #f0f0f0;
      font-family: 'Cinzel', serif;
      display: flex;
      justify-content: center;
      min-height: 100vh;
    }

    .container {
      background-color: #1e1e1e;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      padding: 40px;
      max-width: 900px;
      width: 100%;
      text-align: center;
    }

    .titulo {
      font-size: 3rem;
      margin-bottom: 30px;
      color: #f9d98c;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }

    .imagen {
      width: 100%;
      max-width: 600px;
      border-radius: 20px;
      margin-bottom: 30px;
      border: 4px solid #f9d98c;
      box-shadow: 0 8px 20px rgba(0,0,0,0.6);
      transition: transform 0.3s ease;
    }

    .imagen:hover {
      transform: scale(1.02);
    }

    .descripcion {
      font-size: 1.3rem;
      line-height: 1.8;
      white-space: pre-line;
      text-align: justify;
      margin: 0 auto;
      max-width: 80ch;
      color: #e0e0e0;
    }

    @media (max-width: 768px) {
      .titulo {
        font-size: 2.2rem;
      }

      .descripcion {
        font-size: 1.1rem;
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
    this.shadowRoot.querySelector('.descripcion').textContent = articulo.contenido;
  }
}

customElements.define('articulo-detalle', ArticuloDetalle);

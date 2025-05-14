import { articulos } from './articulos.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #000;
      color: #fff;
      padding: 50px 20px;
      text-align: center;
      font-family: 'Cinzel', serif;
    }
    .articulos-titulo {
      font-size: 2.5rem;
      margin-bottom: 40px;
      margin-top: 84px;
    }
    .articulos-grid {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
    .articulo {
      background-color: #f1f1f1;
      color: #000;
      border-radius: 20px;
      width: 300px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      transition: transform 0.3s;
      cursor: pointer;
    }
    .articulo:hover {
      transform: translateY(-10px);
    }
    .articulo-img {
      width: 100%;
      border-radius: 15px;
      margin-bottom: 15px;
      max-width: 200px;
    }
    .articulo-texto {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .productos-grid {
        flex-direction: column;
        align-items: center;
      }
      .articulo {
        width: 260px;
      }
    }
  </style>
  <section id="articulos">
    <h2 class="articulos-titulo">Artículos y Noticias</h2>
    <div class="articulos-grid"></div>
  </section>
`;

class ArticulosSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const grid = this.shadowRoot.querySelector('.articulos-grid');
    grid.innerHTML = '';

    articulos.forEach(articulo => {
      const div = document.createElement('div');
      div.classList.add('articulo');
      div.innerHTML = `
        <img src="${articulo.imagen}" alt="${articulo.titulo}" class="articulo-img">
        <p class="articulo-texto">${articulo.texto.slice(0, 100)}...</p>
      `;
      div.addEventListener('click', () => {
  window.location.href = `index.html?articulo=${articulo.id}`;
});

      grid.appendChild(div);
    });
  }
}

customElements.define('articulos-section', ArticulosSection);

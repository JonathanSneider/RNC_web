import { productos } from './productos.js';

const templateProducto = document.createElement('template');
templateProducto.innerHTML = `
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
      display: flex;
      gap: 40px;
      max-width: 1000px;
      flex-wrap: wrap;
    }
    .image-section {
      flex: 1;
    }
    .image-wrapper {
      position: relative;
    }
    .main-image {
      width: 100%;
      max-width: 400px;
      border-radius: 10px;
    }
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      cursor: pointer;
      color: #fff;
      background-color: rgba(0,0,0,0.4);
      padding: 10px;
      border-radius: 50%;
      user-select: none;
    }
    .arrow.left {
      left: -20px;
    }
    .arrow.right {
      right: -20px;
    }
    .thumbnails {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .thumbnails img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
    }

    .details-section {
      flex: 1;
      max-width: 500px;
    }
    .product-title {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .product-category {
      font-style: italic;
      margin-bottom: 20px;
    }
    .description {
      margin-bottom: 20px;
    }
    .sizes {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .sizes .size-options {
        margin-top: 10px; 
      } 
    .size-button {
      margin-right: 10px;
      padding: 6px 12px;
      background-color: #5c4433;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .details-section{
    display:flex;
    flex-direction:column;
    }
    .price {
      font-size: 24px;
      margin-bottom: 20px;
      display: inline-block;
      background-color: #5c4433;
      padding: 6px 12px;
      border-radius: 5px;
      max-width:100px;
    }
    .buy-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #8b5e3c;
      color: white;
      border-radius: 10px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
      max-width:150px;

    }
    .buy-button:hover {
      background-color: #a06d49;
    }
  </style>

  <div class="wrapper">
    <div class="container">
      <div class="image-section">
        <div class="image-wrapper">
          <div class="arrow left">&#9664;</div>
          <img class="main-image" />
          <div class="arrow right">&#9654;</div>
        </div>
        <div class="thumbnails"></div>
      </div>

      <div class="details-section">
        <h1 class="product-title"></h1>
        <p class="product-category"></p>
        <div class="description"></div>

        <div class="sizes">
          <label>Tallas disponibles:</label>
          <div class="size-options">
            <button class="size-button">S</button>
            <button class="size-button">M</button>
            <button class="size-button">L</button>
            <button class="size-button">XL</button>
          </div>
        </div>

        <div class="price"></div>
        <a class="buy-button" target="_blank" rel="noopener noreferrer">Comprar</a>
      </div>
    </div>
  </div>
`;

class ProductoDetalle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateProducto.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['data-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-id' && newValue) {
      this.renderProducto(newValue);
    }
  }

  renderProducto(id) {
    const data = productos[id];
    if (!data) {
      this.shadowRoot.innerHTML = `<p style="padding: 50px; text-align: center;">Producto no encontrado.</p>`;
      return;
    }

    const root = this.shadowRoot;
    root.querySelector('.product-title').textContent = data.titulo;
    root.querySelector('.product-category').textContent = `Categoría: ${data.categoria}`;
    root.querySelector('.description').innerHTML = data.descripcion;
    root.querySelector('.price').textContent = data.precio;
    root.querySelector('.buy-button').href = data.telegram;

    const mainImage = root.querySelector('.main-image');
    const thumbnails = root.querySelector('.thumbnails');
    let currentIndex = 0;

    const updateMainImage = (index) => {
      mainImage.src = data.imagenes[index];
    };

    updateMainImage(currentIndex);

    root.querySelector('.arrow.left').onclick = () => {
      currentIndex = (currentIndex - 1 + data.imagenes.length) % data.imagenes.length;
      updateMainImage(currentIndex);
    };

    root.querySelector('.arrow.right').onclick = () => {
      currentIndex = (currentIndex + 1) % data.imagenes.length;
      updateMainImage(currentIndex);
    };

    thumbnails.innerHTML = '';
    data.imagenes.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.addEventListener('click', () => {
        currentIndex = index;
        updateMainImage(index);
      });
      thumbnails.appendChild(img);
    });
  }
}

customElements.define('producto-detalle', ProductoDetalle);
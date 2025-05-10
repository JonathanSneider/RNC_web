const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: 'Cinzel', serif;
      color: #111;
      padding: 20px;
      max-width: 1000px;
      margin: auto;
    }

    .container {
      display: flex;
      flex-direction: row;
      gap: 30px;
      align-items: flex-start;
    }

    .image-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .image-wrapper {
      position: relative;
      width: 350px;
    }

    .main-image {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: #caa25b;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      cursor: pointer;
      padding: 5px 10px;
      user-select: none;
      z-index: 2;
    }

    .arrow.left {
      left: -20px;
    }

    .arrow.right {
      right: -20px;
    }

    .thumbnails {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 15px 0;
    }

    .thumbnails img {
      width: 60px;
      border-radius: 6px;
      cursor: pointer;
      border: 2px solid transparent;
    }

    .thumbnails img:hover {
      border-color: #caa25b;
    }

    .details-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .product-title {
      font-size: 28px;
      font-weight: bold;
      color: #caa25b;
      margin-bottom: 5px;
    }

    .product-category {
      font-size: 14px;
      margin-bottom: 20px;
      color: #777;
    }

    .description {
      border: 1px solid #000;
      padding: 20px;
      margin: 20px 0;
      font-style: italic;
      line-height: 1.6;
      background: #fffef9;
    }

    .price {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .buy-button {
      background-color: #caa25b;
      color: #000;
      padding: 12px 25px;
      border: none;
      border-radius: 12px;
      font-family: 'Cinzel', serif;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .buy-button:hover {
      background-color: #a9863a;
    }
  </style>

  <div class="container">
    <div class="image-section">
      <div class="image-wrapper">
        <div class="arrow left">&#9664;</div>
        <img class="main-image" src="public/imagenes/camiseta.png" alt="Producto" />
        <div class="arrow right">&#9654;</div>
      </div>
      <div class="thumbnails">
        <img src="public/imagenes/camiseta.png" alt="Mini 1" />
        <img src="public/imagenes/camiseta.png" alt="Mini 2" />
        <img src="public/imagenes/1.jpg" alt="Mini 3" />
      </div>
    </div>
    <div class="details-section">
      <h1 class="product-title">RNC CAMISETA</h1>
      <p class="product-category">Categoría: Ropa</p>

      <div class="description">
        <p><strong>Camiseta RNC</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div class="price">$60.000</div>
      <button class="buy-button">Comprar</button>
    </div>
  </div>
`;

class ProductoDetalle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.currentIndex = 0;
    this.images = [];
  }

  connectedCallback() {
    const mainImage = this.shadowRoot.querySelector('.main-image');
    const thumbnails = this.shadowRoot.querySelectorAll('.thumbnails img');
    const leftArrow = this.shadowRoot.querySelector('.arrow.left');
    const rightArrow = this.shadowRoot.querySelector('.arrow.right');

    this.images = Array.from(thumbnails).map(img => img.src);
    mainImage.src = this.images[this.currentIndex];

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.currentIndex = index;
        mainImage.src = this.images[this.currentIndex];
      });
    });

    leftArrow.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      mainImage.src = this.images[this.currentIndex];
    });

    rightArrow.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      mainImage.src = this.images[this.currentIndex];
    });
  }
}

customElements.define('producto-detalle', ProductoDetalle);

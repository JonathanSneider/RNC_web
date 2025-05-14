const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #333;
      color: #fff;
      padding: 30px 20px;
      font-family: 'Cinzel', serif;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .footer-logo img {
      width: 60px;
      margin-bottom: 15px;
    }
    .footer-section {
      margin: 10px 20px;
    }
    .footer-section h4 {
      margin-bottom: 10px;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-section li {
      margin-bottom: 5px;
    }
    .footer-section ul li a {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .footer-section ul li a:hover {
      color: #ccc;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .footer-section {
        margin: 10px 0;
      }
    }
  </style>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/imagenes/logo.png" alt="Logo Footer">
      </div>
      <div class="footer-section">
        <h4>Redes:</h4>
        <ul>
          <li><a href="https://t.me/FiltroNacional" target="_blank">Telegram</a></li>
          <li><a href="https://x.com/RNC34392" target="_blank">X</a></li>
          <li><a href="https://www.tiktok.com/@resurgimientonacionalc" target="_blank">Tiktok</a></li>
          <li><a href="https://www.whatsapp.com/channel/0029Vb6aa4yBqbrGYib1lN2G" target="_blank">Whatsapp</a></li>
          <li><a href="https://www.instagram.com/Resurgimiento.nacional" target="_blank">Instagram</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Menus:</h4>
        <ul>
          <li><a href="#main-content">Inicio</a></li>
          <li><a href="#quienes-somos">Quienes Somos</a></li>
          <li><a href="#ideologia">Ideologia</a></li>
          <li><a href="#tienda">Tienda</a></li>
          <li><a href="#articulos">Foro</a></li>
          <li><a href="#donaciones">Donaciones</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contáctenos:</h4>
        <p>Resurgimientonacional@gmail.com</p>
      </div>
    </div>
  </footer>
`;

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
  }
}

customElements.define('app-footer', AppFooter);

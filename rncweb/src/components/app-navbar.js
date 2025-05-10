const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: 'Cinzel', serif;
    }
    header {
      padding: 30px 0;
    }

    .navbar {
      position: fixed;
      top: 0;
      right: 12px;
      width: 100%;
      background-color: rgb(0, 0, 0);
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    .menu-icon {
      width: 100px;
      height: auto;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1001;
    }

    .hamburger span {
      width: 100%;
      height: 3px;
      background: white;
      transition: all 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    .nav-links {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      background-color: #e0e0e0;
      padding: 16px 35px;
      border-radius: 25px;
      margin: 0;
    }

    .nav-links li a {
      text-decoration: none;
      color: black;
      font-weight: bold;
      padding: 10px 14px;
      transition: background 0.3s ease;
      border-radius: 10px;
      font-size: 18px;
    }

    .nav-links li a:hover,
    .nav-links li a.active {
      background-color: #cfcfcf;
    }

    /* Responsive para tablets */
    @media (max-width: 1024px) {
      .navbar {
        justify-content: space-between;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        max-width: 300px;
        height: 100vh;
        background-color: #000;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 20px;
        transition: right 0.3s ease;
        z-index: 1000;
        border-radius: 0;
      }
      
      .nav-links.active {
        right: 0;
      }
      
      .nav-links li a {
        color: white !important;
        font-size: 18px !important;
        padding: 15px 0 !important;
        display: block;
        width: 100%;
        text-align: center;
        background: transparent !important;
      }
      
      .hamburger {
        display: flex;
      }
    }
    /* Responsive para móviles */
    @media (max-width: 768px) {
      .nav-links {
        width: 80%;
      }
    }
  </style>
  <header id="main-content">
    <nav class="navbar">
      <div class="logo-container">
        <img src="public/imagenes/logo0.png" alt="Logo menú" class="menu-icon">
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links" >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links" id="nav-links" role="menu">
        <li><a href="#main-content" role="menuitem">INICIO</a></li>
        <li><a href="#quienes-somos" role="menuitem">QUIENES SOMOS</a></li>
        <li><a href="#ideologia" role="menuitem">IDEOLOGÍA</a></li>
        <li><a href="#tienda" role="menuitem">TIENDA</a></li>
        <li><a href="#articulos" role="menuitem">FORO</a></li>
        <li><a href="#donaciones" role="menuitem">DONACIONES</a></li>
      </ul>
    </nav>
  </header>
`;

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._hamburger = this.shadowRoot.getElementById('hamburger');
    this._navLinks = this.shadowRoot.getElementById('nav-links');
    this._body = document.body;

    this._hamburger.addEventListener('click', () => {
      const isActive = this._navLinks.classList.toggle('active');
      this._hamburger.classList.toggle('active');
      this._body.classList.toggle('menu-open');
      this._hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    this.shadowRoot.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        this._navLinks.classList.remove('active');
        this._hamburger.classList.remove('active');
        this._body.classList.remove('menu-open');
        this._hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      const path = event.composedPath();
      if(!path.includes(this._navLinks) && !path.includes(this._hamburger)) {
        if(this._navLinks.classList.contains('active')) {
          this._navLinks.classList.remove('active');
          this._hamburger.classList.remove('active');
          this._body.classList.remove('menu-open');
          this._hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
}

customElements.define('app-navbar', AppNavbar);


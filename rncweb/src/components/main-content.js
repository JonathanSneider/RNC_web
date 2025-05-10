const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: relative;
      flex: 1;
      padding-top: 80px;
      text-align: center;
      font-family: 'Cinzel', serif;
    }
    .main-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10% 20px 2em;
      margin-top: 34px;

    }
    .center-logo {
      position: absolute;
      top: 26%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 23vw;
      max-width: 300px;
      height: auto;
      z-index: 1;
      animation: slideInLogo 2s ease-out forwards;
    }
    .statue {
      position: relative;
      width: 35vw;
      min-width: 220px;
      max-width: 380px;
      height: auto;
      z-index: 2;
      animation: slideInStatue 2.5s ease-out forwards;
    }
    @keyframes slideInLogo {
      from {
        transform: translateX(-50%) translateY(-200%) scale(1.2);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(-50%) scale(1);
        opacity: 1;
      }
    }
    @keyframes slideInStatue {
      from {
        transform: translateX(100%) scale(1.2);
        opacity: 0;
      }
      to {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
    }

    /* Responsive for mobile */
    @media (max-width: 768px) {
      .center-logo {
        width: 40vw;
        top: 20%;
      }
      .statue {
        width: 70vw;
        margin-left: 0;
      }
    }
    @media (max-width: 480px) {
      .center-logo {
        width: 50vw;
      }
      .statue {
        width: 80vw;
      }
    }
  </style>
  <div class="main-content">
    <img src="public/imagenes/logo.png" alt="Logo central" class="center-logo" />
    <img src="public/imagenes/estatua.png" alt="Estatua" class="statue" />
  </div>
`;

class MainContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
  }
}

customElements.define('main-content', MainContent);

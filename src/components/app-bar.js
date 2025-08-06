class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.display();
    this.initializeClock();
  }

  initializeClock() {
    const timeContainer = this.shadowRoot.querySelector('.time-display');
    setInterval(() => {
      const current = new Date();
      const time = current.toLocaleTimeString();
      const date = current.toLocaleDateString();
      timeContainer.textContent = `${date} ${time}`;
    }, 1000);
  }

  display() {
    this.shadowRoot.innerHTML = `
      <style>
        .header-container {
          background: linear-gradient(to right, #00e676, #1de9b6);
          color: #fff;
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .app-title {
          margin: 0;
          font-size: 1.4rem;
          font-weight: bold;
        }

        .time-display {
          font-size: 1rem;
          font-family: monospace;
        }
      </style>

      <div class="header-container">
        <div class="app-title">Catatan Digital</div>
        <div class="time-display"></div>
      </div>
    `;
  }
}

customElements.define('app-bar', AppHeader);

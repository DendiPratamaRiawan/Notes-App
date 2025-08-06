class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.display();
  }

  display() {
    this.shadowRoot.innerHTML = `
      <style>
        .footer-section {
          background: linear-gradient(to right, #00e676, #1de9b6);
          color: #ffffff;
          text-align: center;
          font-weight: 600;
          padding: 1rem 0;
          font-size: 0.95rem;
        }

        .footer-section p {
          margin: 0;
          letter-spacing: 0.5px;
        }
      </style>
      <div class="footer-section">
        <p>&copy; 2024 Adzkia Adi. Hak cipta dilindungi.</p>
      </div>
    `;
  }
}

customElements.define('footer-bar', AppFooter);

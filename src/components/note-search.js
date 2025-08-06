class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const placeholder = this.getAttribute('placeholder') || 'Cari catatan...';

    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          background-color: #fff;
          border: 1px solid #dcdcdc;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        input[type="text"] {
          width: 100%;
          padding: 0.7rem;
          font-size: 0.9rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          transition: border-color 0.3s ease;
        }

        input[type="text"]:focus {
          border-color: #888;
          outline: none;
        }
      </style>

      <div class="wrapper">
        <input type="text" id="inputSearch" placeholder="${placeholder}" />
      </div>
    `;

    const input = this.shadowRoot.querySelector('#inputSearch');
    input.addEventListener('input', (e) => {
      this.dispatchEvent(
        new CustomEvent('search-note', {
          detail: e.target.value,
          bubbles: true,
          composed: true, // penting agar bisa ditangkap di luar shadow DOM
        })
      );
    });
  }
}

customElements.define('note-search', SearchBar);

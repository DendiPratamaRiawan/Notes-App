class NoteInputForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderForm();
  }

  renderForm() {
    const buttonLabel = this.getAttribute('data-form-type') || 'Kirim';

    this.shadowRoot.innerHTML = `
      <style>
        .note-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .note-form input,
        .note-form textarea {
          padding: 0.6rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 0.85rem;
        }

        .note-form input:focus,
        .note-form textarea:focus {
          border-color: #999;
          outline: none;
          border-width: 2px;
        }

        .button-area {
          display: flex;
          justify-content: flex-end;
        }

        .note-form button {
          padding: 0.6rem 1.2rem;
          background-color: #6c757d;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .note-form button:hover {
          background-color: #5a6268;
        }

        .error-message {
          font-size: 0.75rem;
          color: red;
          margin-top: -0.5rem;
        }
      </style>

      <form class="note-form">
        <input type="text" id="input-title" placeholder="Judul Catatan" required />
        <div id="title-error" class="error-message"></div>

        <textarea id="input-body" rows="4" placeholder="Isi Catatan" required></textarea>
        <div id="body-error" class="error-message"></div>

        <div class="button-area">
          <button type="submit">${buttonLabel}</button>
        </div>
      </form>
    `;

    const titleField = this.shadowRoot.getElementById('input-title');
    const bodyField = this.shadowRoot.getElementById('input-body');
    const titleErr = this.shadowRoot.getElementById('title-error');
    const bodyErr = this.shadowRoot.getElementById('body-error');
    const form = this.shadowRoot.querySelector('.note-form');

    titleField.addEventListener('input', () => {
      titleErr.textContent = titleField.value.trim() === '' ? 'Judul wajib diisi.' : '';
    });

    bodyField.addEventListener('input', () => {
      bodyErr.textContent = bodyField.value.trim() === '' ? 'Isi wajib diisi.' : '';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const titleVal = titleField.value.trim();
      const bodyVal = bodyField.value.trim();

      titleErr.textContent = titleVal ? '' : 'Judul wajib diisi.';
      bodyErr.textContent = bodyVal ? '' : 'Isi wajib diisi.';

      if (!titleVal || !bodyVal) return;

      const noteData = {
        id: `note-${Date.now()}`,
        title: titleVal,
        body: bodyVal,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(new CustomEvent('add-note', { detail: noteData }));
      form.reset();
    });
  }
}

customElements.define('note-form', NoteInputForm);

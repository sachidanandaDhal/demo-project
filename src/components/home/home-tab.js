import { OmniElement, OmniStyleElement, css, html, nothing } from 'omni-ui';
import './user-details.js';
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();
export default class Hometab extends (OmniElement) {
  static get styles() {
    return css`

    `;
  }
  constructor() {
    super();
    this.reloadData = false; 
  }

  static get properties() {
    return {
      reloadData: { type: Boolean } 
    };
  }
  openUserForm() {
    Router.go('/home/create');
  }
  closeUserForm() {
    const userForm = document.querySelector('user-form');
    if (userForm) {
      userForm.remove();
      this.reloadData = !this.reloadData;
    }
    this.requestUpdate();
  }
  
  render() {
    return html`
      <omni-style >
        <div class="card m-5">
          <header class="card-header">
            <div class="card-header-title">
              <div
                class="is-flex is-justify-content-space-between"
                style="width:100%;"
              >
                <div
                  class="is-flex is-justify-content-flex-start is-align-items-center"
                >
                  <h3 slot="start" class="title is-3 has-text-weight-normal is-block">
                    Users
                  </h3>
                </div>
                <div slot="center-end" class="pr-4">
                  <button
                    class="button is-outlined is-medium"
                    @click="${this.openUserForm}"
                  >
                    Create new
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div
            class="card-content pb-1 pt-1 pl-0 pr-0"
            style="background-color: rgb(245, 248, 251) !important;"
          >
          ${this.reloadData ? html`<user-details></user-details>` : html`<user-details></user-details>`}
          </div>
        </div>
      </omni-style>
    `;
  }

  
}

customElements.define('home-tab', Hometab);

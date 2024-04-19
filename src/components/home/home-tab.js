import { OmniElement, OmniStyleElement, css, html, nothing } from 'omni-ui';
import './user-details.js';
OmniElement.register();
OmniStyleElement.register();
export default class Hometab extends (OmniElement) {
  static get styles() {
    return css`

    `;
  }
  openUserForm() {
    const userForm = document.createElement('user-form');
    document.body.appendChild(userForm);
    userForm.addEventListener('close-user-form', this.closeUserForm.bind(this));
  }
  closeUserForm() {
    const userForm = document.querySelector('user-form');
    if (userForm) {
      userForm.remove();
      console.log('Close user form, dispatching reload event');
      this.dispatchEvent(new CustomEvent('reload-user-details'));
    }
    this.requestUpdate();
  }
  // handleReloadUserDetails() {
  //   // Reload user details here
  //   // For example:
  //   const userDetails = this.shadowRoot.querySelector('user-details');
  //   userDetails.reload(); // Assuming userDetails component has a method to reload data
  // }
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.addEventListener('reload-user-details', this.handleReloadUserDetails.bind(this));
  // }
  render() {
    return html`
      <omni-style class="omni">
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
                    class="button is-outlined is-small"
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
            <user-details></user-details>
          </div>
        </div>
      </omni-style>
    `;
  }

  
}

customElements.define('home-tab', Hometab);

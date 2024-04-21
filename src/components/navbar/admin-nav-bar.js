import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import './nav-bar1.js';
import '../home/user-data.js';
import '../form/user-form.js';
import '../home/home-tab.js';
OmniElement.register();
OmniStyleElement.register();

export default class AdminNavBar extends OmniElement{
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      userName: { type: String }
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleEndDrawer() {
    this.endDrawerOpen = !this.endDrawerOpen;
  }
  // openUserForm() {
  //   const userForm = document.createElement('user-form');
  //   document.body.appendChild(userForm);
  //   userForm.addEventListener('close-user-form', this.closeUserForm.bind(this));
  // }
  // closeUserForm() {
  //   const userForm = document.querySelector('user-form');
  //   if (userForm) {
  //     userForm.remove();
  //   }
  // }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          /* Customizable CSS Variables and their defaults */
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 80px;
          --omni-app-layout-drawer-closed-width: 45px;
          --omni-app-layout-end-drawer-width: 300px;
          --omni-app-layout-bg: #f1f5fa;
          --omni-app-layout-header-bg: #fff;
          --omni-app-layout-drawer-bg: var(--color-pale-grey-two);
          --omni-app-layout-end-drawer-bg: #fff;

          /* Variables useful for nesting layouts */
          --omni-app-layout-height: 100vh;
          --omni-app-layout-top: 0px;
          --omni-app-layout-left: 0px;
          --omni-app-layout-drawer-z-index: 32;
          --omni-app-layout-end-drawer-z-index: 34;
          --omni-app-layout-header-z-index: 36;
        }
        
      `,
    ];
  }

  render() {
    return html`
      <omni-style>
        <omni-app-layout
          .drawerOpen=${this.drawerOpen}
          .endDrawerOpen=${this.endDrawerOpen}
        >
          <header slot="header">
            <omni-toolbar class="">
              <p class=" title is-2 pt-2 ">User Management</p>
              <div slot="center-end" class="pr-4">
                <!-- <button class="button is-outlined" @click="${this.openUserForm}">
                  Create new
                </button> -->

                <div>Hello, ${this.userName}</div>
              </div>
              <!-- <user-profile></user-profile> -->
              
            </omni-toolbar>
          </header>

          <main>
            <!-- <nav-bar1></nav-bar1> -->
            <home-tab></home-tab>
          </main>

          <nav slot="drawer">
          <div slot="end-drawer" place= "right">
            <button slot="end-drawer" class="button is-text " @click="${this.toggleDrawer}">
              <omni-icon
                class="is-size-1"
                icon-id="${this.drawerOpen ? 'omni:interactive:left' : 'omni:interactive:right'}"
              ></omni-icon>
            </button>
          </div>
          
          </nav>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("admin-nav-bar", AdminNavBar);

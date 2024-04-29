import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import '../home/user-data.js';
import '../form/user-form.js';
import '../home/home-tab.js';
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();

export default class AdminNavBar extends OmniElement{
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  }

  connectedCallback() {
    super.connectedCallback();
    // Ensure data retrieval when navigating back to the home page
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
    this.requestUpdate();
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleEndDrawer() {
    this.endDrawerOpen = !this.endDrawerOpen;
  }

  openDropdown() {
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          /* Customizable CSS Variables and their defaults */
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 4px;
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
        .dropdown-content {
          width: 260px;
          margin-right: 35px !important;    
        }
        .text{
          text-align: center;
        }
        .omni{
          overflow: hidden;
        }
        
      `,
    ];
  }
  
  handleSignOut() {
    // Navigate to the home route ("/") using Router.go()
    Router.go('/');
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
              <button class="button is-text " @click="${this.toggleDrawer}">
                <omni-icon
                  class="is-size-1"
                  icon-id="${this.drawerOpen
                    ? "omni:informative:menu"
                    : "omni:informative:menu"}"
                ></omni-icon>
              </button>
              <!-- <omni-icon class="is-size-4" icon-id="omni:brand:apple"></omni-icon> -->
              <p class=" title is-2 pt-2 ">User Management</p>
              <div slot="center-end" class="pr-6">
              <div class="is-flex pt-2">
                  
                  <!-- <div class="pl-3 pr-6">${this.userData.personal_details.first_name} ${this.userData.personal_details.last_name}</div>
                  <div>
                  <omni-icon class="is-size-1" icon-id="omni:informative:user"></omni-icon>
                  <label class="columns title is-7 pl-1  pt-2">User</label>
                </div> -->
                <div class="dropdown is-right">
                                <div class="dropdown-trigger">
                                  <button class="button is-text" aria-haspopup="true" aria-controls="dropdown-menu" @click="${
                                    this.openDropdown
                                  }">

                                    <span>${this.userData.personal_details.first_name} ${this.userData.personal_details.last_name}</span>
                                    <omni-icon class="is-size-1" icon-id="omni:informative:user"></omni-icon>
                                  </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                  <div class="dropdown-content">
                                    
                                    <div class="dropdown-item text">
                                    <!-- <omni-icon class="is-size-1" icon-id="omni:informative:user"></omni-icon> -->
                                      <p>
                                      ${this.userData.personal_details.first_name} ${this.userData.personal_details.last_name}
                                      </p>
                                      <p>
                                      ${this.userData.user_login_details.officeEmail}
                                      </p>
                                    </div>
                                    <hr class="dropdown-divider" />
                                    <div class="dropdown-item">
                                      <p>Contact</p>
                                      <div class="is-flex pt-2">
                                      <omni-icon class="is-size-3" icon-id="omni:informative:mobile"></omni-icon>
                                      <p class="pl-3"> ${this.userData.contact_details.phoneNumber}</p>
                                      </div>
                                    </div>
                                    <hr class="dropdown-divider" />
                                    <a @click=${this.handleSignOut}>
                                      <div class="dropdown-item is-flex">
                                        <omni-icon class="is-size-3" icon-id="omni:interactive:exit" aria-label="icon" role="img"></omni-icon>
                                        <p class="pl-2">Sign Out</p>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                </div>
            </div>
            </omni-toolbar>
          </header>
          <main>
            <home-tab></home-tab>
          </main>
          <nav slot="drawer" class="menu">
            <ul class="menu-list pl-3">
              <li><a class="  has-background-almost-black">Dashboard</a></li>
              <!-- <li>
              <details>
                <summary>
                    <omni-icon class=is-size-3 icon-id="omni:interactive:right"></omni-icon>
                    <omni-icon class=is-size-1 icon-id="omni:informative:learn"></omni-icon>
                    <span>Role</span>
                  </div>
                </summary>
                <ul class="menu-list">
                  <li>
                    <a class="pg-1" style="padding: 0px 0px 0px 4px;">
                      <span>Nested Menu Item</span>
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
            <details>
                <summary>
                    <omni-icon class=is-size-3 icon-id="omni:interactive:right"></omni-icon>
                    <omni-icon class=is-size-1 icon-id="omni:informative:learn"></omni-icon>
                    <span>User</span>
                </summary>
                <ul class="menu-list">
                  <li>
                    <a class="pg-1" style="padding: 0px 0px 0px 4px;">
                      <span>Nested Menu Item</span>
                    </a>
                  </li>
                </ul>
              </details>
            </li> -->
            </ul>
          </nav>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("admin-nav-bar", AdminNavBar);

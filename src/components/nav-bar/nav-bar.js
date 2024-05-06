import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "../home/home-tab.js";
import "../home/user-home.js";
import { Router } from "@vaadin/router";
OmniElement.register();
OmniStyleElement.register();

export default class NavBar extends OmniElement {
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      user_role: { type: String },
      activeLink: { type: String }
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    
    this.activeLink = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
    this.user_role = this.userData.user_login_details.role[0];
    const currentPath = window.location.pathname;
    this.activeLink = currentPath;
    this.requestUpdate();
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleEndDrawer() {
    this.endDrawerOpen = !this.endDrawerOpen;
  }

  openDropdown() {
    const dropdown = this.shadowRoot.querySelector(".dropdown");
    dropdown.classList.toggle("is-active");
  }

  navigateTo(path) {
    Router.go(path);
  }

  handleLinkClick(path) {
    this.navigateTo(path);
    this.activeLink = path;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          /* Customizable CSS Variables and their defaults */
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 0px;
          --omni-app-layout-end-drawer-width: 300px;
          --omni-app-layout-bg: #f1f5fa;
          --omni-app-layout-header-bg: #fff;
          --omni-app-layout-drawer-bg: #fff;
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
          margin-right: 20px !important;
        }
        .text {
          text-align: center;
        }

        .hg {
          background-image: url(./../assets/image.png);
          background-size: cover;
          background-position: center;
          overflow: hidden !important;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 36px;
          height: 37px !important;
        }
        .fontsize {
          font-size: 31px;
        }
      `,
    ];
  }

  handleSignOut() {
    Router.go("/");
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
              ${this.user_role !== "User"
                ? html`
                    <button
                      class="button is-text "
                      @click="${this.toggleDrawer}"
                    >
                      <omni-icon
                        class="is-size-1"
                        icon-id="${this.drawerOpen
                          ? "omni:informative:menu"
                          : "omni:informative:menu"}"
                      ></omni-icon>
                    </button>
                  `
                : nothing}
              <p class="hg"></p>
              <p class=" title is-2 pt-2 ">User Management</p>
              <div slot="center-end" class="pr-1">
                <div class="is-flex pt-2">
                  <div class="dropdown is-right">
                    <div class="dropdown-trigger">
                      <button
                        class="button is-text is-shadowless"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        @click="${this.openDropdown}"
                      >
                        <span
                          >${this.userData.personal_details.first_name}
                          ${this.userData.personal_details.last_name}</span
                        >
                        <omni-icon
                          class="is-size-1"
                          icon-id="omni:informative:user"
                        ></omni-icon>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item text">
                          <p class="is-flex is-justify-content-center pb-3">
                            <omni-icon
                              class="fontsize"
                              icon-id="omni:informative:user"
                            ></omni-icon>
                          </p>
                          <p>
                            ${this.userData.personal_details.first_name}
                            ${this.userData.personal_details.last_name}
                          </p>
                          <p>${this.userData.user_login_details.officeEmail}</p>
                        </div>
                        <hr class="dropdown-divider" />
                        <a @click=${this.handleSignOut}>
                          <div class="dropdown-item is-flex">
                            <omni-icon
                              class="is-size-3"
                              icon-id="omni:interactive:exit"
                              aria-label="icon"
                              role="img"
                            ></omni-icon>
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
            <slot>
          ${this.user_role === "User"
              ? html`<user-home></user-home>`
              : html`<home-tab></home-tab>
                `}</slot>
          </main>
          
          <nav slot="drawer" class="menu">
            
            <ul class="menu-list pl-3">
            <li>
                  <a
                    @click="${() => this.handleLinkClick("/home/dashboard")}"
                    class="${this.activeLink === '/home/dashboard' ? 'is-active' : ''}"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    @click="${() => this.handleLinkClick("/home")}"
                    class="${this.activeLink === '/home' ? 'is-active' : ''}"
                    >User</a
                  >
                </li>
              </div>
            </ul>
          </nav>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("nav-bar", NavBar);

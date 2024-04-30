import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import './dashboard-page.js';
import './user-page.js';
import './admin-page.js';
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();

export default class  SuperAdminNavBar extends OmniStyleElement{
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      activeLink: { type: String }
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    this.activeLink = '';
    
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleEndDrawer() {
    this.endDrawerOpen = !this.endDrawerOpen;
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
              <button class="button is-text " @click="${this.toggleDrawer}">
                <omni-icon
                  class="is-size-1"
                  icon-id="${this.drawerOpena
                    ? "omni:informative:menu"
                    : "omni:informative:menu"}"
                ></omni-icon>
              </button>
              <!-- <omni-icon class="is-size-4" icon-id="omni:brand:apple"></omni-icon> -->
              <p class=" title is-2 pt-2 ">User Management</p>
              <div slot="center-end" class="pr-6">
                <div class="is-flex pt-2">
                  <div>
                    <omni-icon
                      class="is-size-1"
                      icon-id="omni:informative:user"
                    ></omni-icon>
                    <label class="columns title is-7 pl-1  pt-2"
                      >supperAdmin</label
                    >
                  </div>
                </div>
              </div>
            </omni-toolbar>
          </header>
          <main>
            <slot></slot>
          </main>
          <nav slot="drawer" class="menu">
            <ul class="menu-list pl-3">
              <div>
                <li>
                  <a
                    @click="${() => this.handleLinkClick("/super-admin/dashboard")}"
                    class="${this.activeLink === "/super-admin/dashboard"
                      ? "is-active"
                      : ""}"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    @click="${() => this.handleLinkClick("/super-admin/user")}"
                    class="${this.activeLink === "/super-admin/user"
                      ? "is-active"
                      : ""}"
                    >User</a
                  >
                </li>
                <li>
                  <a
                    @click="${() => this.handleLinkClick("/super-admin/admin")}"
                    class="${this.activeLink === "/super-admin/admin"
                      ? "is-active"
                      : ""}"
                    >Admin</a
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
customElements.define("super-admin-nav", SuperAdminNavBar);

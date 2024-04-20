import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "./nav-bar1.js";
import "../home/user-data.js";
import "../form/user-form.js";
import "../home/home-tab.js";

OmniElement.register();
OmniStyleElement.register();

export default class NavBar extends OmniElement {
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      userData: { type: String },
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
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 4px;
          --omni-app-layout-end-drawer-width: 300px;
          --omni-app-layout-bg: #f1f5fa;
          --omni-app-layout-header-bg: #ffffff;
          --omni-app-layout-drawer-bg: #f1f5fa;
          --omni-app-layout-end-drawer-bg: #f5f0f0;

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
    console.log("renderdata:", this.userData);
    return html`
      <omni-style>
        <omni-app-layout
          .drawerOpen=${this.drawerOpen}
          .endDrawerOpen=${this.endDrawerOpen}
        >
          <header slot="header">
            <omni-toolbar class="">
            <button  class="button is-text " @click="${this.toggleDrawer}">
              <omni-icon
                class="is-size-1"
                icon-id="${
                  this.drawerOpen
                    ? "omni:informative:menu"
                    : "omni:informative:menu"
                }"
              ></omni-icon>
            </button>
              <p class=" title is-2 pt-2 ">User Management</p>
                <div slot="center-end" class="pr-4">
                <div>Hello, ${this.userData.personal_details.first_name}</div>
              </div>
              <!-- <user-profile></user-profile> -->
              
            </omni-toolbar>
          </header>

          


          <nav slot="drawer" class="menu">
          <div class="pl-8 ">
            <!-- <button  class="button is-text " @click="${this.toggleDrawer}">
              <omni-icon
                class="is-size-1"
                icon-id="${
                  this.drawerOpen
                    ? "omni:interactive:left"
                    : "omni:interactive:right"
                }"
              ></omni-icon>
            </button> -->
          </div>
          <ul class="menu-list pl-3">  
          <li><a  class="  has-background-almost-black">Dashboard</a></li>
            <li>
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
            </li>
            <!-- <li><a  class="  has-background-almost-black">Setings</a></li>
            <li><a  class="  has-background-almost-black">logs</a></li> -->
          </ul>
        </nav>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("test-nab", NavBar);

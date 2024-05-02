import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from "@vaadin/router";
import "../home/edit-user.js";

OmniElement.register();
OmniStyleElement.register();

export default class UserNavBar extends OmniElement {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --omni-app-layout-header-height: 0px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 4px;
          --omni-app-layout-end-drawer-width: 660px;
          
          --omni-app-layout-drawer-bg: var(--color-white);
          --omni-app-layout-end-drawer-bg: var(--color-white);

          /* Variables useful for nesting layouts */
          --omni-app-layout-height: 100vh;
          --omni-app-layout-top: 0px;
          --omni-app-layout-left: 0px;
          --omni-app-layout-drawer-z-index: 32;
          --omni-app-layout-end-drawer-z-index: 34;
          --omni-app-layout-header-z-index: 36;
        }
        omni-app-layout::part(content) {
          padding: 2.5rem;
        }
        omni-tile::part(body-scroller) {
          overflow: auto;
        height: calc(100vh - 150px);
        }
        .ph{
          height: calc(100vh - 50px);
          overflow-y: auto;
          overflow-x: hidden;
        }

        .dropdown-content {
          width: 260px;
          margin-right: 35px !important;    
        }
        .text{
          text-align: center;
        }

        
        .header-separator {
          border-bottom: 1px solid rgb(241, 245, 250) !important;
          height: 43px;
        }
        .hg{
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

        .g-2 {
          margin-block-start: -28px !important;
        }
        .g-3 {
          margin-block-start: -43px !important;
        }
        .g-1 {
          margin-block-start: -20px !important;
        }
        .g-4 {
          margin-block-start: -6px !important;
        }
      `,
    ];
  }

  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      endDrawerContent: { type: String },
      userData: { type: String },
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    this.endDrawerContent = "";
    this.userData = {};
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleEndDrawer(content) {
    this.endDrawerContent = content;
    this.endDrawerOpen = true;
  }
  closeEndDrawer() {
    this.endDrawerOpen = false;
    this.endDrawerContent = "";
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
    this.requestUpdate();
  }
  handleSignOut() {
    // Navigate to the home route ("/") using Router.go()
    Router.go('/');
  }
  openDropdown() {
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
    this.requestUpdate();
  }

  handleSignOut() {
    Router.go('/');
  }

  render() {
    return html`
      <omni-style>
        <omni-app-layout class="ph"
          .drawerOpen=${this.drawerOpen}
          .endDrawerOpen=${this.endDrawerOpen}
        >
          <omni-tile>
            <omni-toolbar slot="header">
            <h1 slot="start" class="titel is-size-2">User Profile</h1>
            </omni-toolbar>
          <section>
              <!-- <h1 class="title is-2 pb-3">Personal Details</h1> -->
              <div class="is-flex is-justify-content-space-between">
              <h1 class="title is-3 pb-2">Biographical</h1>
              <button  class=" button is-text" @click="${() =>
                this.toggleEndDrawer("biographical")}">
              <omni-icon class="is-size-2 " icon-id="omni:interactive:edit"></omni-icon>
              </button>
              </div>
              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">First Name *</p>
                  <p class="mb-1">${
                    this.userData.personal_details.first_name
                  }</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Last Name *</p>
                  <p class="mb-1">${
                    this.userData.personal_details.last_name
                  }</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Marital Status *
                  </p>
                  <p class="mb-1">${this.userData.personal_details.marital}</p>
                </div>
              </div>

              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Gender *</p>
                  <p class="mb-1">${this.userData.personal_details.gender}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">DOB *</p>
                  <p class="mb-1">${this.userData.personal_details.dob}</p>
                </div>
              </div>
              <hr />

              <div class="is-flex is-justify-content-space-between">
              <h1 class="title is-3 pb-2">Contact Details</h1>
              <button  class=" button is-text" @click="${() =>
                this.toggleEndDrawer("contact")}">
              <omni-icon class="is-size-2 " icon-id="omni:interactive:edit"></omni-icon>
              </button>
              </div>
              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Personal Email ID *
                  </p>
                  <p class="mb-1">${
                    this.userData.contact_details.personalEmail
                  }</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Personal Mobile No *
                  </p>
                  <p class="mb-1">${
                    this.userData.contact_details.phoneNumber
                  }</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Office Mobile No *
                  </p>
                  <p class="mb-1">${
                    this.userData.contact_details.officephoneNumber
                  }</p>
                </div>
              </div>
              <hr />

              <div class="is-flex is-justify-content-space-between">
              <h1 class="title is-3 pb-2">Address</h1>
              <button  class="button is-text" @click="${() =>
                this.toggleEndDrawer("address")}">
              <omni-icon class="is-size-2 " icon-id="omni:interactive:edit"></omni-icon>
              </button>
              </div>
              <div class="columns col-spacing is-flex">
                <div class="column is-half">
                  <h1 class="title is-4 pb-2">Current Address Detail</h1>
                  <div>
                    <p class="mb-1 c">Flat/House/Wing Number *</p>
                    <p class="mb-4">${
                      this.userData.address.current_address.flat_house_no
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Street/Locality/Area *
                    </p>
                    <p class="mb-4">${
                      this.userData.address.current_address.building_no
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Pincode *</p>
                    <p class="mb-4">${
                      this.userData.address.current_address.pin
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">District *</p>
                    <p class="mb-4">${
                      this.userData.address.current_address.district
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">State *</p>
                    <p class="mb-4">${
                      this.userData.address.current_address.state
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Country *</p>
                    <p class="mb-4">${
                      this.userData.address.current_address.country
                    }</p>
                  </div>
                </div>

                <div class="column is-half">
                  <h1 class="title is-4 pb-2">Permanent Address Detail</h1>
                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Flat/House/Wing Number *
                    </p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.flat_house_no
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Street/Locality/Area *
                    </p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.building_no
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Pincode *</p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.pin
                    }</p>
                  </div>
                  <div>
                    <p class="mb-1 has-text-grey is-size-6">District *</p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.district
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">State *</p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.state
                    }</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Country *</p>
                    <p class="mb-4">${
                      this.userData.address.permanent_address.country
                    }</p>
                  </div>
                </div>
              </div>
                <hr>
                <div class="is-flex is-justify-content-space-between">
              <h1 class="title is-3 pb-2">Account Access Details</h1>
              <button  class="button is-text" @click="${() =>
                this.toggleEndDrawer("login")}">
              <omni-icon class="is-size-2 " icon-id="omni:interactive:edit"></omni-icon>
              </button>
              </div>
              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">User Name *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.username}
                  </p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Password *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.password}
                  </p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Office Email ID *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.officeEmail}
                  </p>
                </div>
              </div>
              <div class="columns col-spacing is-flex">
              <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Employee ID *</p>
                  <p class="mb-1">${this.userData.empId}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Join Date *</p>
                  <p class="mb-1" >
                  ${this.userData.registered_on}
                  </p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Last Modified Date *</p>
                  <p class="mb-1" >
                  ${this.userData.modified_on}
                  </p>
                </div>
              </div>
            </section>
            </omni-tile>


          <nav slot="drawer" class="menu">         
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
          </ul>
        </nav>
        <aside slot="end-drawer">
        ${
    ['biographical', 'contact', 'address','login',].includes(this.endDrawerContent)
      ? html`
          <edit-user
            .userData="${this.userData}"
            .editSection="${this.endDrawerContent}" 
            @close-edit-user="${this.closeEndDrawer}"
          ></edit-user>
        `
      : ""
  }
</aside>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("user-nav-bar", UserNavBar);

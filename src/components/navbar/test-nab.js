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

          <div class="pr-4  pt-4">
          <section class="modal-card-body pl-5 ml-4">
              <!-- <h1 class="title is-2 pb-3">Personal Details</h1> -->
              <h1 class="title is-3 pb-2">Biographical</h1>
              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">First Name *</p>
                  <p class="mb-1">${this.userData.personal_details.first_name}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Last Name *</p>
                  <p class="mb-1">${this.userData.personal_details.last_name}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Marital Status *
                  </p>
                  <p class="mb-1">${this.userData.personal_details.Marital}</p>
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

              <h1 class="title is-3 pb-2">Contact Details</h1>
              <div class="columns col-spacing is-flex">
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Personal Email ID *
                  </p>
                  <p class="mb-1">${this.userData.contact_details.personalEmail}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Personal Mobile No *
                  </p>
                  <p class="mb-1">${this.userData.contact_details.phoneNumber}</p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">
                    Office Mobile No *
                  </p>
                  <p class="mb-1">${this.userData.contact_details.officephoneNumber}</p>
                </div>
              </div>
              <hr />

              <h1 class="title is-3 pb-2">Address</h1>
              <div class="columns col-spacing is-flex">
                <div class="column is-half">
                  <h1 class="title is-4 pb-2">Current Address Detail</h1>
                  <div>
                    <p class="mb-1 c">Flat/House/Wing Number *</p>
                    <p class="mb-4">${this.userData.address.current_address.flat_house_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Street/Locality/Area *
                    </p>
                    <p class="mb-4">${this.userData.address.current_address.building_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Pincode *</p>
                    <p class="mb-4">${this.userData.address.current_address.pin}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">District *</p>
                    <p class="mb-4">${this.userData.address.current_address.district}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">State *</p>
                    <p class="mb-4">${this.userData.address.current_address.state}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Country *</p>
                    <p class="mb-4">${this.userData.address.current_address.country}</p>
                  </div>
                </div>

                <div class="column is-half">
                  <h1 class="title is-4 pb-2">Permanent Address Detail</h1>
                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Flat/House/Wing Number *
                    </p>
                    <p class="mb-4">${this.userData.address.permanent_address.flat_house_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Street/Locality/Area *
                    </p>
                    <p class="mb-4">${this.userData.address.permanent_address.building_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Pincode *</p>
                    <p class="mb-4">${this.userData.address.permanent_address.pin}</p>
                  </div>
                  <div>
                    <p class="mb-1 has-text-grey is-size-6">District *</p>
                    <p class="mb-4">${this.userData.address.permanent_address.district}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">State *</p>
                    <p class="mb-4">${this.userData.address.permanent_address.state}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Country *</p>
                    <p class="mb-4">${this.userData.address.permanent_address.country}</p>
                  </div>
                </div>
              </div>
                <hr>
              <h1 class="title is-3 pb-2">Account Access Details</h1>
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
                  ${this.userData.modified_on}
                  </p>
                </div>
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Last Modified Date *</p>
                  <p class="mb-1" >
                    N.A
                  </p>
                </div>
              </div>
              <div class="buttons are-medium is-right pt-5 pr-4">
                <button
                  class="button is-size-5 is-link"
                  @click="${this.closeUserData}"
                >
                  Close
                </button>
              </div>
            </section>
            </div>


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

import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();

export default class UserData extends OmniElement {
  static get styles() {
    return css`
      .header-seperator {
        border-bottom: 1px solid rgb(241, 245, 250) !important;
        height: 50px;
      }

      .omni .modal-card,
      .omni .modal-content {
        min-width: 870px !important;
      }
    `;
  }

  static get properties() {
    return {
      userData: { type: Object }, 
    };
  }

  constructor() {
    super();

    this.userData = {}; 
  }
  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    this.userId = params.get('userId');
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    this.userData = users.find(user => user.id === this.userId) || {};
  }
  closeUserData() {
    Router.go("/home");
  }

  render() {
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-card ">
            <header class="modal-card-head header-seperator">
              <p class="modal-card-title">User Details</p>
              <button class="button is-outlined " @click="${this.closeUserData}">
          <omni-icon class="is-size-1" icon-id="omni:interactive:close"></omni-icon>
        </button>
            </header>
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
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">User ID *</p>
                  <p class="mb-1">${this.userData.empId}</p>
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
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Roll *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.role}
                  </p>
                </div>
                
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Office Email ID *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.officeEmail}
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
          
        </div>
      </omni-style>
    `;
  }
}

customElements.define("view-user-data", UserData);

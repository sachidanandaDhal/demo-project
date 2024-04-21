import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";

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

  closeUserData() {
    this.dispatchEvent(new CustomEvent("close-user-data"));
  }

  render() {
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-card ">
            <header class="modal-card-head header-seperator">
              <p class="modal-card-title">User Details</p>
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
                <div class="column is-one-third">
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Employee ID *</p>
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
                    <p class="mb-4">${this.userData.permanent_address.flat_house_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">
                      Street/Locality/Area *
                    </p>
                    <p class="mb-4">${this.userData.permanent_address.building_no}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Pincode *</p>
                    <p class="mb-4">${this.userData.permanent_address.pin}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">District *</p>
                    <p class="mb-4">${this.userData.permanent_address.district}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">State *</p>
                    <p class="mb-4">${this.userData.permanent_address.state}</p>
                  </div>

                  <div>
                    <p class="mb-1 has-text-grey is-size-6">Country *</p>
                    <p class="mb-4">${this.userData.permanent_address.country}</p>
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
                  <p class=" m-0 mb-2 has-text-grey is-size-6">Roll *</p>
                  <p class="mb-1" >
                  ${this.userData.user_login_details.role}
                  </p>
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
          <button class="modal-close is-large" aria-label="close"></button>
        </div>
      </omni-style>
    `;
  }
}

customElements.define("user-data1", UserData);

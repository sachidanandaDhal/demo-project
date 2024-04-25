import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "../home/user-data.js";
import "../form/user-form.js";
import "../home/home-tab.js";

OmniElement.register();
OmniStyleElement.register();

export default class UserNavBar extends OmniElement {
  static get properties() {
    return {
      drawerOpen: { type: Boolean },
      endDrawerOpen: { type: Boolean },
      endDrawerContent: { type: String },
      userData: { type: Object },
      
    };
  }

  constructor() {
    super();
    this.drawerOpen = false;
    this.endDrawerOpen = false;
    this.endDrawerContent = "";
    this.userData = {
      id: "",
      empId: "",
      modified_on: new Date().toISOString(),
      personal_details: {
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        marital: "",
      },
      contact_details: {
        phoneNumber: "",
        personalEmail: "",
        officephoneNumber: "",
      },
      address: {
        current_address: {
          flat_house_no: "",
          building_no: "",
          pin: "",
          state: "",
          district: "",
          country: "",
        },
        permanent_address: {
          flat_house_no: "",
          building_no: "",
          pin: "",
          district: "",
          state: "",
          country: "",
        },
      },
      user_login_details: {
        username: "",
        password: "OMNI.user",
        officeEmail: "",
        role: "",
        active: true,
      },
    };
    this.marital = [
      "Single",
      "Married",
      "Divorced",
      "Widowed",
      "Separated",
      "Common Law",
    ];
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
    
  }
  // handleUpdateButtonClick() {
  //   this.endDrawerOpen = false;
  //   // Retrieve existing userData from local storage
  //   const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];
    
  //   // Find the index of the userData object in the array (assuming each userData object has a unique identifier like 'id')
  //   const index = existingUserData.findIndex(item => item.id === this.userData.id);
    
  //   if (index !== -1) {
  //     // If the userData object exists in the array, update its properties
  //     existingUserData[index] = { ...existingUserData[index], ...this.userData };
  //   } else {
  //     // If the userData object doesn't exist in the array, add it
  //     existingUserData.push(this.userData);
  //   }
  
  //   // Save the modified userData array back to local storage
  //   localStorage.setItem("userData", JSON.stringify(existingUserData));
  // }

  handleUpdateButtonClick() {
    // Retrieve existing userData from local storage
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];
    
    // Find the index of the userData object in the array (assuming each userData object has a unique identifier like 'id')
    const index = existingUserData.findIndex(item => item.id === this.userData.id);
    
    if (index !== -1) {
      // If the userData object exists in the array, update its properties
      existingUserData[index] = { ...existingUserData[index], ...this.userData };
      
      // Save the modified userData array back to local storage
      localStorage.setItem("userData", JSON.stringify(existingUserData));
    }
    
    // Close the end drawer after updating the data
    this.endDrawerOpen = false;
  }
  
  
  

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 4px;
          --omni-app-layout-end-drawer-width: 660px;
          --omni-app-layout-bg: #ffffff;
          --omni-app-layout-header-bg: #ffffff;
          --omni-app-layout-drawer-bg: #ffffff;
          --omni-app-layout-end-drawer-bg: #ffffff;

          /* Variables useful for nesting layouts */
          --omni-app-layout-height: 100vh;
          --omni-app-layout-top: 0px;
          --omni-app-layout-left: 0px;
          --omni-app-layout-drawer-z-index: 32;
          --omni-app-layout-end-drawer-z-index: 34;
          --omni-app-layout-header-z-index: 36;
        }
        
        .topright {
          position: absolute;
          top: 80px;
          right: 50px;
        }
        .topright1 {
          position: absolute;
          top: 315px;
          right: 50px;
        }
        .topright2 {
          position: absolute;
          top: 466px;
          right: 50px;
        }
        .header-separator {
          border-bottom: 1px solid rgb(241, 245, 250) !important;
          height: 43px;
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
        .dropdown-content {
          width: 260px;
          margin-right: 35px !important;

          
    }
    .text{
      text-align: center;
    }
      `,
    ];
  }
  openDropdown() {
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
  }

  handleFirstNameChange(e) {
    this.userData.personal_details.first_name = e.target.value.trim();
    if (!this.userData.personal_details.first_name) {
      this.firstNameError = "First name is required";
    } else {
      this.firstNameError = "";
    }
    this.requestUpdate();
  }

  handleLastNameChange(e) {
    this.userData.personal_details.last_name = e.target.value.trim();
    if (!this.userData.personal_details.last_name) {
      this.lastNameError = "Last name is required";
    } else {
      this.lastNameError = "";
    }
    this.requestUpdate();
  }
  handleDOBChange(e) {
    this.userData.personal_details.dob = e.target.value.trim();
    const inputDate = e.target.value;
    const currentDate = new Date();
    const selectedDate = new Date(inputDate);

    if (selectedDate > currentDate) {
      this.birthDateError = true;
      this.birthDateError = "Date of birth cannot be in the future.";
    } else {
      this.birthDateError = false;
      this.birthDateError = "";
    }
    this.requestUpdate();
  }
  handleMaritalChange(e) {
    this.userData.personal_details.marital = e.target.value;
    this.selectedMaritalError =
      this.userData.personal_details.marital.length === 0
        ? "Marital is required"
        : "";
    this.requestUpdate();
  }
//////////
renderBiographicalData() {
  return html`
      <div class="card-content">
        <header class="modal-card-head header-separator">
          <p class="modal-card-title is-size-1">Edit Biographical</p>
          <div class="buttons are-medium">
            <button class="button is-size-5 is-text" @click="${
              this.closeEndDrawer
            }">Cancel</button>
            <button class="button is-size-5 is-link has-text-white bg-image " @click="${
              this.handleUpdateButtonClick
            }">
              Update
            </button>
          </div>
        </header>
        <div class="content pt-6">
          <div class="columns col-spacing">
              <div class="column is-half">
                <p class="mb-2 ml-2">* First Name</p>
                <input
                  class="${
                    this.firstNameError ? "input error-border" : "input"
                  }"
                  type="text"
                  placeholder="First Name"
                  .value="${this.userData.personal_details.first_name}"
                  @input="${(e) => this.handleFirstNameChange(e)}"
                />
                  <div class=" is-flex">
                    ${
                      this.firstNameError
                        ? html`<omni-icon
                              class="mt-2 ml-2 error-icon "
                              icon-id="omni:informative:error"
                              aria-label="icon"
                              role="img"
                            ></omni-icon>
                            <span class="pt-2 pl-1  has-text-grey is-size-6"
                              >${this.firstNameError}</span
                            >`
                        : ""
                    }
                  </div>
              </div>
              <div class="column is-half ">
                <p class="mb-2 ml-2 ">* Last Name</p>
                <input
                  class="${
                    this.lastNameError ? "input error-border" : "input"
                  }"
                  type="text"
                  placeholder="Last Name"
                  .value="${this.userData.personal_details.last_name}"
                  @input="${(e) => this.handleLastNameChange(e)}"
                />
                <div class=" is-flex">
                  ${
                    this.lastNameError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon"
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon
                          ><span class="pt-2 pl-1 has-text-grey is-size-6"
                            >${this.lastNameError}</span
                          >`
                      : ""
                  }
                </div>
              </div>
          </div>
          <div class="columns col-spacing">
              <div class="column is-half">
              <p class="mb-2 ml-2">* Marital Status</p>
              <omni-dropdown
                class="pr-1"
                placeholder="Marital"
                typeahead
                error="${
                  this.selectedMaritalError ? this.selectedMaritalError : ""
                }"
                searchindropdown
                .options=${this.marital}
                .value="${this.userData.personal_details.marital}"
                @change="${(e) => this.handleMaritalChange(e)}"
              >
              </omni-dropdown>
            </div>
            <div class="column is-half">
              <p class="mb-2 ml-3">* Gender</p>
              <div class="control pt-3 pl-4">
                <label class="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    @change="${(e) => this.handleGenderChange(e)}"
                    ?checked="${this.userData.personal_details.gender === "Male"}"
                  />
                  Male
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    @change="${(e) => this.handleGenderChange(e)}"
                    ?checked="${this.userData.personal_details.gender === "Female"}"
                  />
                  Female
                </label>
              </div>
            </div>
              
          </div>
          <div class="columns col-spacing">
          <div class="column is-half g-2">
                <p class="mb-2 ml-2 ">* Date of birth</p>
                  <input
                    id="dobInput"
                    type="date"
                    slot="invoker"
                    class="${
                      this.birthDateError ? "input error-border" : "input"
                    }"
                    placeholder="yyyy-mm-dd"
                    max="2999-12-31"
                    .value="${this.userData.personal_details.dob}"
                    @input="${(e) => this.handleDOBChange(e)}"
                  />
                  <div class=" is-flex">
                    ${
                      this.birthDateError
                        ? html`<omni-icon
                              class="mt-2 ml-2 error-icon"
                              icon-id="omni:informative:error"
                              aria-label="icon"
                              role="img"
                            ></omni-icon
                            ><span class="pt-2 pl-1 has-text-grey is-size-6"
                              >${this.birthDateError}</span
                            >`
                        : ""
                    }
                  </div>
              </div>
          </div>
        </div>
      </div>
      </div>
    
  `;
}
renderContactData() {
  return html`
      <div class="card-content">
        <header class="modal-card-head header-separator">
          <p class="modal-card-title is-size-1">Edit Contact Details</p>
          <div class="buttons are-medium">
            <button class="button is-size-5 is-text" @click="${
              this.closeEndDrawer
            }">Cancel</button>
            <button class="button is-size-5 is-link has-text-white bg-image " @click="${
              this.closeEndDrawer
            }">
              Update
            </button>
          </div>
        </header>
        <div class="content pt-6">
          <div class="columns col-spacing">
                <div class="column is-half">
                <p class="mb-3 ml-3">* Personal Email ID</p>
                <input
                  class="${
                    this.personalEmailError ? "input error-border" : "input"
                  }"
                  type="text"
                  placeholder="abc@gmail.com"
                  .value="${this.userData.contact_details.personalEmail}"
                  @input="${(e) => this.handlePersonalEmailChange(e)}"
                />
                <div class="is-flex">
                  ${
                    this.personalEmailError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon"
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon
                          ><span class="pt-2 pl-1 has-text-grey is-size-6"
                            >${this.personalEmailError}</span
                          >`
                      : ""
                  }
                </div>
              </div>
              <div class="column is-half">
              <p class="mb-3 ml-3 ">* Personal Mobile No</p>
                <input
                  class="${
                    this.phoneNumberError ? "input error-border" : "input"
                  }"
                  type="tel"
                  maxlength="10"
                  placeholder="Phone Number"
                  .value="${this.userData.contact_details.phoneNumber}"
                  @input="${(e) => this.handlePhoneNumberChange(e)}"
                />
                <div class=" is-flex">
                  ${
                    this.phoneNumberError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon"
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon
                          ><span class="pt-2 pl-1 has-text-grey is-size-6"
                            >${this.phoneNumberError}</span
                          >`
                      : ""
                  }
                </div>
              </div>
          </div>
          <div class="columns col-spacing">
              <div class="column is-half">
                <p class="mb-3 ml-3 ">* Office Mobile No</p>
                <input
                  class="${
                    this.officephoneNumberError
                      ? "input error-border"
                      : "input"
                  }"
                  type="tel"
                  maxlength="10"
                  placeholder="Office Phone Number"
                  .value="${this.userData.contact_details.officephoneNumber}"
                  @input="${(e) => this.handleOfficePhoneNumberChange(e)}"
                />
                <div class=" is-flex">
                  ${
                    this.officephoneNumberError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon"
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon
                          ><span class="pt-2 pl-1 has-text-grey is-size-6"
                            >${this.officephoneNumberError}</span
                          >`
                      : ""
                  }
                </div>
              </div>
          </div>
        </div>
      </div>
      </div>
  `;
}
renderAddresData() {
  return html`
    <div class="card-content pb-6">
      <header class="modal-card-head header-separator">
        <p class="modal-card-title is-size-1">Edit Address</p>
        <div class="buttons are-medium">
          <button
            class="button is-size-5 is-text"
            @click="${this.closeEndDrawer}"
          >
            Cancel
          </button>
          <button
            class="button is-size-5 is-link has-text-white bg-image "
            @click="${this.closeEndDrawer}"
          >
            Update
          </button>
        </div>
      </header>

      <div class="content pt-5 pb-6">
        <div class="columns col-spacing abc ">
          <div class="column is-half pt-6">
            <p class="is-size-4 has-text-weight-bold has-text-dark pt-3">
              Current Address
            </p>
            <p class="mb-2 ml-2">* Flat/House/Wing Number</p>
            <input
              class="${this.currentAddressError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Address Detail"
              .value=""
              @input="${(e) => this.handleCurrentAddressChange(e)}"
            />
            <div class=" is-flex">
              ${this.currentAddressError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.currentAddressError}</span
                    >`
                : ""}
            </div>
            <div>
              <p class="mb-2 ml-2 mt-5">* Street/Locality/Area</p>
              <input
                class="${this.currentStreetError
                  ? "input error-border"
                  : "input"}"
                type="text"
                placeholder="Address Detail"
                .value=""
                @input="${(e) => this.handleCurrentStreetChange(e)}"
              />
              <div class=" is-flex">
                ${this.currentStreetError
                  ? html`<omni-icon
                        class="mt-2 ml-2 error-icon"
                        icon-id="omni:informative:error"
                        aria-label="icon"
                        role="img"
                      ></omni-icon
                      ><span class="pt-2 pl-1 has-text-grey is-size-6"
                        >${this.currentStreetError}</span
                      >`
                  : ""}
              </div>
            </div>

            <p class="mb-2 ml-2 mt-5">* Pincode</p>
            <input
              class="${this.currentPincodeError
                ? "input error-border"
                : "input"}"
              type="text"
              maxlength="6"
              placeholder="Pincode"
              .value=""
              @input="${(e) => this.handleCurrentPincodeChange(e)}"
            />
            <div class=" is-flex">
              ${this.currentPincodeError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.currentPincodeError}</span
                    >`
                : ""}
            </div>

            <p class="mb-2 ml-3 mt-5">* District</p>
            <omni-dropdown
              part="target "
              class="pr-4"
              placeholder="District"
              error="${this.selectedCurrentdistrictError
                ? this.selectedCurrentdistrictError
                : ""}"
              typeahead
              searchindropdown
              .options=${this.districts}
              .value=""
              @change="${(e) => this.handleDistrictChange(e)}"
            >
            </omni-dropdown>

            <p class="mb-3 ml-3 g-4">* State</p>
            <omni-dropdown
              class="pr-4 "
              placeholder="State"
              typeahead
              error="${this.selectedCurrentstateError
                ? this.selectedCurrentstateError
                : ""}"
              searchindropdown
              .options=${this.states}
              .value=""
              @change="${(e) => this.handleStateChange(e)}"
            >
            </omni-dropdown>

            <p class="mb-3 ml-3 g-4">* Country</p>
            <omni-dropdown
              part="target "
              class="pr-4 "
              placeholder="Country"
              error="${this.selectedCurrentcountryError
                ? this.selectedCurrentcountryError
                : ""}"
              typeahead
              searchindropdown
              .options=${this.country}
              .value=""
              @change="${(e) => this.handleCurrentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
          <!-- abcd -->

          <div class="column is-half">
            <label class="checkbox">
              <input
                type="checkbox"
                id="sameAddressCheckbox"
                @change="${this.handleSameAddressChange}"
                .checked="${this.sameAddress}"
              />
              Same as current address
            </label>
            <p class="is-size-4  has-text-weight-bold has-text-dark pt-3">
              Permanent Address Detail
            </p>
            <p class="mb-2 ml-2">* Flat/House/Wing Number</p>
            <input
              class="${this.permanentAddressError
                ? "input error-border"
                : "input"}"
              type="text"
              .value=""
              placeholder="Address Detail"
              @input="${(e) => this.handlePermanentAddressChange(e)}"
            />
            <div class=" is-flex">
              ${this.permanentAddressError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.permanentAddressError}</span
                    >`
                : ""}
            </div>
            <div>
              <p class="mb-2 ml-2 mt-5">* Street/Locality/Area</p>
              <input
                class="${this.permanentStreetError
                  ? "input error-border"
                  : "input"}"
                type="text"
                placeholder="Address"
                .value=""
                @input="${(e) => this.handlePermanentStreetChange(e)}"
              />
              <div class=" is-flex">
                ${this.permanentStreetError
                  ? html`<omni-icon
                        class="mt-2 ml-2 error-icon"
                        icon-id="omni:informative:error"
                        aria-label="icon"
                        role="img"
                      ></omni-icon
                      ><span class="pt-2 pl-1 has-text-grey is-size-6"
                        >${this.permanentStreetError}</span
                      >`
                  : ""}
              </div>
            </div>

            <p class="mb-2 ml-2 mt-5">* Pincode</p>
            <input
              class="${this.permanentPincodeError
                ? "input error-border"
                : "input"}"
              type="text"
              maxlength="6"
              placeholder="Pincode"
              .value=""
              @input="${(e) => this.handlePermanentPincodeChange(e)}"
            />
            <div class=" is-flex">
              ${this.permanentPincodeError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.permanentPincodeError}</span
                    >`
                : ""}
            </div>

            <p class="mb-3 ml-3 mt-5">* District</p>
            <omni-dropdown
              part="target "
              class="pr-4 "
              placeholder="District"
              error="${this.selectedpermanentDistrictError
                ? this.selectedpermanentDistrictError
                : ""}"
              typeahead
              .value=""
              searchindropdown
              .options=${this.districts}
              @change="${(e) => this.handlePermanentDistrictChange(e)}"
            >
            </omni-dropdown>

            <p class="mb-3 ml-3 g-4">* State</p>
            <omni-dropdown
              class="pr-4 "
              placeholder="State"
              typeahead
              .value=""
              error="${this.selectedpermanentStateError
                ? this.selectedpermanentStateError
                : ""}"
              searchindropdown
              .options=${this.states}
              @change="${(e) => this.handlePermanentStateChange(e)}"
            >
            </omni-dropdown>

            <p class="mb-3 ml-3 g-4">* Country</p>
            <omni-dropdown
              part="target "
              class="pr-4 "
              placeholder="Country"
              error="${this.selectedpermanentcountryError
                ? this.selectedpermanentcountryError
                : ""}"
              typeahead
              searchindropdown
              .value=""
              .options=${this.country}
              @change="${(e) => this.handlePermanentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>
      </div>
    </div>
  `;
}
///////////
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
                                        Sachidananda.dhal@annalect.com
                                      </p>
                                    </div>
                                    <hr class="dropdown-divider" />
                                    <div class="dropdown-item">
                                      <p>Contact</p>
                                      <div class="is-flex pt-2">
                                      <omni-icon class="is-size-3" icon-id="omni:informative:mobile"></omni-icon>
                                      <p class="pl-3">8018199406</p>
                                      </div>
                                    </div>
                                    <hr class="dropdown-divider" />
                                    <a tabindex="0">
                                      <div class="dropdown-item">
                                        <omni-icon class="is-size-3" icon-id="omni:interactive:exit" aria-label="icon" role="img"></omni-icon>
                                        <p>Sign Out</p>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                </div>
            </div>
            
          </omni-toolbar>
        </header>

        <div class="pr-4  pt-4">
        <section class="modal-card-body pl-5 ml-4">
            <!-- <h1 class="title is-2 pb-3">Personal Details</h1> -->
            <div class="is-flex ">
            <h1 class="title is-3 pb-2">Biographical</h1>
            <button  class=" is-text topright" @click="${() =>
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

            <div class="is-flex ">
            <h1 class="title is-3 pb-2">Contact Details</h1>
            <button  class=" is-text topright1" @click="${() =>
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

            <div class="is-flex ">
            <h1 class="title is-3 pb-2">Address</h1>
            <button  class=" is-text topright2" @click="${() =>
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
        </ul>
      </nav>
      <aside slot="end-drawer">
          ${this.endDrawerContent === "biographical"? this.renderBiographicalData(): ""}
          ${this.endDrawerContent === "contact" ? this.renderContactData() : ""}
          ${this.endDrawerContent === "address" ? this.renderAddresData() : ""}
        </aside>
      </omni-app-layout>
    </omni-style>
    `;
  }
}
customElements.define("user-nav-bar1", UserNavBar);

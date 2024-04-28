import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();

export default class edit extends OmniElement {
  static get styles() {
    return css`
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
      .error-border {
        border: 1px solid var(--color-melon) !important;
      }
      .error-icon {
        --color-icon-lines: #eb0465 !important;
        fill: var(--color-icon-lines) !important;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.userData = {
      id: "",
      empId: "",
      modified_on: "",
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
    this.states = [
      "Maharashtra",
      "Uttar Pradesh",
      "Karnataka",
      "Tamil Nadu",
      "West Bengal",
      "Gujarat",
      "Rajasthan",
    ];
    this.districts = [
      "Mumbai",
      "Pune",
      "Lucknow",
      "Kanpur",
      "Bangalore Urban",
      "Mysore",
      "Chennai",
      "Coimbatore",
      "Kolkata",
      "Howrah",
      "Ahmedabad",
      "Surat",
      "Jaipur",
      "Kota",
    ];
    this.country = ["India", "USA"];
  }
  closeEndDrawer() {
    this.dispatchEvent(new CustomEvent("close-edit-user"));
    console.log("Cancel button clicked edit ");
  }
  handleUpdate() {
    // Retrieve existing userData from local storage
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    // Find the index of the userData object in the array (assuming each userData object has a unique identifier like 'id')
    const index = existingUserData.findIndex(
      (item) => item.id === this.userData.id
    );

    if (index !== -1) {
      // If the userData object exists in the array, update its properties
      existingUserData[index] = {
        ...existingUserData[index],
        ...this.userData,
      };

      // Save the modified userData array back to local storage
      localStorage.setItem("userData", JSON.stringify(existingUserData));
    }

    // Update currentUser if necessary
    const currentUserData =
      JSON.parse(localStorage.getItem("currentUser")) || {};
    if (currentUserData.id === this.userData.id) {
      localStorage.setItem("currentUser", JSON.stringify(this.userData));
    }

    // Close the end drawer after updating the data
    this.dispatchEvent(new CustomEvent("close-edit-user"));
  }
  handleCurrentAddressChange(e) {
    this.userData.address.current_address.flat_house_no = e.target.value.trim();
    if (!this.userData.address.current_address.flat_house_no) {
      this.currentAddressError = "Current Address is required";
    } else {
      this.currentAddressError = "";
    }
    this.requestUpdate();
  }

  handleCurrentStreetChange(e) {
    this.userData.address.current_address.building_no = e.target.value.trim();
    if (!this.userData.address.current_address.building_no) {
      this.currentStreetError = "Current Street is required";
    } else {
      this.currentStreetError = "";
    }
    this.requestUpdate();
  }

  handleCurrentPincodeChange(e) {
    this.userData.address.current_address.pin = e.target.value.trim();
    if (!this.userData.address.current_address.pin) {
      this.currentPincodeError = "Current pincode is required.";
    } else if (!/^\d{6}$/.test(this.userData.address.current_address.pin)) {
      this.currentPincodeError = "Pincode must be 6 numbers.";
    } else {
      this.currentPincodeError = "";
    }
    this.requestUpdate();
  }
  handleStateChange(e) {
    this.userData.address.current_address.state = e.target.value;
    this.selectedCurrentstateError =
      this.userData.address.current_address.state.length === 0
        ? "State is required"
        : "";
    this.requestUpdate();
  }
  handleDistrictChange(e) {
    this.userData.address.current_address.district = e.target.value;
    this.selectedCurrentdistrictError =
      this.userData.address.current_address.district.length === 0
        ? "District is required"
        : "";
    this.requestUpdate();
  }
  handleCurrentCountryChange(e) {
    this.userData.address.current_address.country = e.target.value;
    this.selectedCurrentcountryError =
      this.userData.address.current_address.country.length === 0
        ? "Current Country is required"
        : "";
    this.requestUpdate();
  }
  ////////////////////////////PERMANENT////////////////////////////

  handlePermanentAddressChange(e) {
    this.userData.address.permanent_address.flat_house_no =
      e.target.value.trim();
    if (!this.userData.address.permanent_address.flat_house_no) {
      this.permanentAddressError = "Permanent Address is required";
    } else {
      this.permanentAddressError = "";
    }
    this.requestUpdate();
  }

  handlePermanentStreetChange(e) {
    this.userData.address.permanent_address.building_no = e.target.value.trim();
    if (!this.userData.address.permanent_address.building_no) {
      this.permanentStreetError = "Permanent Street is required";
    } else {
      this.permanentStreetError = "";
    }
    this.requestUpdate();
  }

  handlePermanentPincodeChange(e) {
    this.userData.address.permanent_address.pin = e.target.value.trim();
    if (!this.userData.address.permanent_address.pin) {
      this.permanentPincodeError = "Permanent pincode is required.";
    } else if (!/^\d{6}$/.test(this.userData.address.permanent_address.pin)) {
      this.permanentPincodeError = "Pincode must be 6 numbers.";
    } else {
      this.permanentPincodeError = "";
    }
    this.requestUpdate();
  }
  handlePermanentStateChange(e) {
    this.userData.address.permanent_address.state = e.target.value;
    this.selectedpermanentStateError =
      this.userData.address.permanent_address.state.length === 0
        ? "Permanent State is required"
        : "";
    this.requestUpdate();
  }
  handlePermanentDistrictChange(e) {
    this.userData.address.permanent_address.district = e.target.value;
    this.selectedpermanentDistrictError =
      this.userData.address.permanent_address.district.length === 0
        ? "Permanent District is required"
        : "";
    this.requestUpdate();
  }
  handlePermanentCountryChange(e) {
    this.userData.address.permanent_address.country = e.target.value;
    this.selectedpermanentcountryError =
      this.userData.address.permanent_address.country.length === 0
        ? "Permanent Country is required"
        : "";
    this.requestUpdate();
  }
  //////////////USERLOGIN////////////////////////////////////////////
  handleuserNameChange(e) {
    const username = e.target.value.trim();
    if (!username) {
      this.useridnameError = "Username is required";
    } else if (username.length < 5) {
      // Check if username has at least 5 characters
      this.useridnameError = "Username must be at least 5 characters long";
    } else if (
      this.users.some((user) => user.user_login_details.username === username
      && user.id !== this.userData.id)
    ) {
      // Check if username already exists
      this.useridnameError = "Username already exists";
    } else {
      this.useridnameError = "";
    }
    this.userData.user_login_details.username = username;
    this.requestUpdate();
  }

  handleRoleChange(e) {
    this.userData.user_login_details.role = e.target.value;
    this.selectedRoleError =
      this.userData.user_login_details.role.length === 0
        ? "Role is required"
        : "";
    this.requestUpdate();
  }

  handleOfficeEmailChange(e) {
    const email = e.target.value.trim();
    const emailRegex = /^[\w-]+(\.[\w-]+)*@annalect\.com$/;
    if (!email) {
      this.officeEmailError = "Office email is required";
    } else if (!emailRegex.test(email)) {
      // Check if email format is valid
      this.officeEmailError = "Office email must end with @annalect.com";
    } else if (
      this.users.some((user) => user.user_login_details.officeEmail === email
      && user.id !== this.userData.id)
    ) {
      // Check if email already exists
      this.officeEmailError = "Office email already exists";
    } else {
      this.officeEmailError = "";
    }

    this.userData.user_login_details.officeEmail = email;
    this.requestUpdate();
  }

  handleSameAddressChange(e) {
    this.sameAddress = e.target.checked;
    if (this.sameAddress) {
      this.userData.address.permanent_address.flat_house_no =
        this.userData.address.current_address.flat_house_no;
      this.userData.address.permanent_address.building_no =
        this.userData.address.current_address.building_no;
      this.userData.address.permanent_address.pin =
        this.userData.address.current_address.pin;
      this.userData.address.permanent_address.state =
        this.userData.address.current_address.state;
      this.userData.address.permanent_address.district =
        this.userData.address.current_address.district;
      this.userData.address.permanent_address.country =
        this.userData.address.current_address.country;
    } else {
      this.userData.address.permanent_address.flat_house_no = "";
      this.userData.address.permanent_address.building_no = "";
      this.userData.address.permanent_address.pin = "";
      this.userData.address.permanent_address.state = "";
      this.userData.address.permanent_address.district = "";
      this.userData.address.permanent_address.country = "";
    }
    this.requestUpdate();
    console.log("checkbox:", this.sameAddress);
    console.log(
      "currentaddresh:",
      this.userData.address.current_address.flat_house_no
    );
    console.log(
      "PermentAddresh:",
      this.userData.address.permanent_address.flat_house_no
    );
  }


  render() {
    return html`
      <omni-style>
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
                @click="${this. handleUpdate}"
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
                  .value="${this.userData.address.current_address.flat_house_no}"
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
                    .value="${this.userData.address.current_address.building_no}"
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
                  .value="${this.userData.address.current_address.pin}"
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
                  .value=${this.userData.address.current_address.district}
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
                  .value=${this.userData.address.current_address.state}
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
                  .value=${this.userData.address.current_address.country}
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
                  .value="${this.userData.address.permanent_address.flat_house_no}"
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
                    .value="${this.userData.address.permanent_address.building_no}"
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
                  .value="${this.userData.address.permanent_address.pin}"
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
                  .value="${this.userData.address.permanent_address.district}"
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
                  .value="${this.userData.address.permanent_address.state}"
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
                  .value="${this.userData.address.permanent_address.country}"
                  .options=${this.country}
                  @change="${(e) => this.handlePermanentCountryChange(e)}"
                >
                </omni-dropdown>
              </div>
            </div>
          </div>
        </div>
      </omni-style>
    `;
  }
}

customElements.define("edit-3", edit);

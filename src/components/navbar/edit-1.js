import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from '@vaadin/router';
import './user-nav-bar.js';
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
    return {

    };
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
    this.marital = [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
        "Common Law",
      ];
    
  }
  closeEndDrawer() {
    this.dispatchEvent(new CustomEvent("close-edit-user"));
    console.log("Cancel button clicked edit ");
  }
  handleUpdate() {
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
    
    // Update currentUser if necessary
    const currentUserData = JSON.parse(localStorage.getItem("currentUser")) || {};
    if (currentUserData.id === this.userData.id) {
        localStorage.setItem("currentUser", JSON.stringify(this.userData));
    }
    
    // Close the end drawer after updating the data
    this.dispatchEvent(new CustomEvent("close-edit-user"));
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
  handleGenderChange(e) {
    this.userData.personal_details.gender = e.target.value; // Update gender state variable
    this.requestUpdate(); // Trigger re-render
  }
  handleMaritalChange(e) {
    this.userData.personal_details.marital = e.target.value;
    this.selectedMaritalError =
      this.userData.personal_details.marital.length === 0
        ? "Marital is required"
        : "";
    this.requestUpdate();
  }

  render() {

    return html`
      <omni-style>
      <div class="card-content">
        <header class="modal-card-head header-separator">
          <p class="modal-card-title is-size-1">Edit Biographical</p>
          <div class="buttons are-medium">
            <button class="button is-size-5 is-text" @click="${
              this.closeEndDrawer
            }">Cancel</button>
            <button class="button is-size-5 is-link has-text-white bg-image " @click="${
              this. handleUpdate
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
      </omni-style>
    `;
  }
}

customElements.define("edit-1", edit);

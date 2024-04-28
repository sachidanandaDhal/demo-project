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
    this.users = [];
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
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];
    const index = existingUserData.findIndex(item => item.id === this.userData.id);
    if (index !== -1) {
        existingUserData[index] = { ...existingUserData[index], ...this.userData };
        localStorage.setItem("userData", JSON.stringify(existingUserData));
    }
    const currentUserData = JSON.parse(localStorage.getItem("currentUser")) || {};
    if (currentUserData.id === this.userData.id) {
        localStorage.setItem("currentUser", JSON.stringify(this.userData));
    }
    this.dispatchEvent(new CustomEvent("close-edit-user"));
  }
  handlePhoneNumberChange(e) {
    const newPhoneNumber = e.target.value.trim();
    if (newPhoneNumber === "") {
        this.phoneNumberError = "Phone number cannot be empty";
    } else if (!/^\d+$/.test(newPhoneNumber)) {
        this.phoneNumberError = "Phone number must contain only digits";
    } else if (newPhoneNumber.length !== 10) {
        this.phoneNumberError = "Phone number must be exactly 10 digits";
    } else if (
        this.users.some(
            (user) =>
                user.contact_details.phoneNumber === newPhoneNumber &&
                user.id !== this.userData.id // Exclude the current user being edited from the check
        )
    ) {
        this.phoneNumberError = "Phone number already exists";
    } else {
        this.userData.contact_details.phoneNumber = newPhoneNumber;
        this.phoneNumberError = "";
    }
    this.requestUpdate();
}

handleOfficePhoneNumberChange(e) {
    const newPhoneNumber = e.target.value.trim();

    if (newPhoneNumber === "") {
        this.officephoneNumberError = "Phone number cannot be empty";
    } else if (!/^\d+$/.test(newPhoneNumber)) {
        this.officephoneNumberError = "Phone number must contain only digits";
    } else if (newPhoneNumber.length !== 10) {
        this.officephoneNumberError = "Phone number must be exactly 10 digits";
    } else if (
        this.users.some(
            (user) =>
                user.contact_details.officephoneNumber === newPhoneNumber &&
                user.id !== this.userData.id // Exclude the current user being edited from the check
        )
    ) {
        this.officephoneNumberError = "Phone number already exists";
    } else {
        this.userData.contact_details.officephoneNumber = newPhoneNumber;
        this.officephoneNumberError = "";
    }
    this.requestUpdate();
}

  handlePersonalEmailChange(e) {
    const email = e.target.value.trim();
    const emailRegex =
      /^[\w-]+(\.[\w-]+)*@(yahoo\.com|outlook\.com|gmail\.com|gmail\.uk|gmail\.us)$/;

    // Check if email is empty
    if (!email) {
      this.personalEmailError = "Personal email is required";
    } else if (!emailRegex.test(email)) {
      // Check if email format is valid
      this.personalEmailError = "Invalid email format";
    } else if (
      this.users.some((user) => user.contact_details.personalEmail === email
      && user.id !== this.userData.id)
    ) {
      // Check if email already exists
      this.personalEmailError = "Personal email already exists";
    } else {
      this.personalEmailError = ""; // Clear error if all validations pass
    }

    this.userData.contact_details.personalEmail = email;
    this.requestUpdate();
  }

  render() {

    return html`
      <omni-style>
      <div class="card-content">
        <header class="modal-card-head header-separator">
          <p class="modal-card-title is-size-1">Edit Contact Details</p>
          <div class="buttons are-medium">
            <button class="button is-size-5 is-text" @click="${
              this.closeEndDrawer
            }">Cancel</button>
            <button class="button is-size-5 is-link has-text-white bg-image " @click="${
              this.handleUpdate
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
      </omni-style>
    `;
  }
}

customElements.define("edit-2", edit);

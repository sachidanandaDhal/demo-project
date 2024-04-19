import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
// import "../alerts/my-alerts.js";
OmniElement.register();
OmniStyleElement.register();

export default class UserForm extends OmniElement {
  static styles = [
    super.styles,
    css`
      .header-separator {
        border-bottom: 1px solid rgb(241, 245, 250) !important;
        height: 43px;
      }
      .pd-4 {
        padding-right: 16px;
      }
      .modal-card-body p {
        font-size: 0.8em !important;
        color: var(--color-shark);
      }
      .omni .footer-container span {
        text-align: left !important ;
      }
      .g-1 {
        margin-block-start: -25px !important;
      }
      .error-border {
        border: 1px solid var(--color-melon) !important;
      }
      .error-icon {
        --color-icon-lines: #eb0465 !important;
        fill: var(--color-icon-lines) !important;
      }
    `,
  ];
  constructor() {
    super();
    this.users = [];
    this.userData = {
      id: 1,
      emp: "",
      modified_on: "",
      personal_details: {
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
      },
      contact_details: {
        contact_no: "",
        personal_email: "",
      },
      address: {
        current_address: {
          flat_house_no: "",
          pin: "",
          street: "",
          district: "",
          state: "",
          country: "",
        },
        permanent_address: {
          flat_house_no: "",
          pin: "",
          street: "",
          district: "",
          state: "",
          country: "",
        },
      },
      user_login_details: {
        username: "",
        official_email: "",
        role: "",
        active: true,
      },
    };
    this.adduserData = this.adduserData.bind(this);
    this.marital=[
              'Single','Married','Divorced','Widowed',"Separated","Common Law"
            ]
  }

  static get properties() {
    return {
      userData: { type: Object },
      users: { type: Array },
    };
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
  handlePhoneNumberChange(e) {
    const input = e.target.value.trim(); 
    if (!input) {
        this.phoneNumberError = "Phone number is required";
    } else if (!/^\d+$/.test(input)) {
        this.phoneNumberError = "Phone number must contain only numbers";
    } else if (input.length !== 10) {
        this.phoneNumberError = "Phone number must be exactly 10 digits";
    } else if (this.isPhoneNumberDuplicate(input)) {
        this.phoneNumberError = "Phone number already exists";
    } else {
        this.userData.contact_details.contact_no = input;
        this.phoneNumberError = "";
    }
    this.requestUpdate();
}

isPhoneNumberDuplicate(phoneNumber) {
    return this.users.some(user => user.contact_details.contact_no === phoneNumber);
}


//    handlePhoneNumberChange(e) {
//     const input = e.target.value.trim(); 
//     console.log("input:", this.users);
//     if (!input) {
//       this.phoneNumberError = "Phone number is required";
//     } else if (!/^\d+$/.test(input)) {
//       this.phoneNumberError = "Phone number must contain only numbers";
//     } else if (input.length !== 10) {
//       this.phoneNumberError = "Phone number must be exactly 10 digits";
//     } else if (this.users.some((user) => user.contact_details.contact_no === input)) {
//         this.phoneNumberError = "Phone number already exists";
//       }
//       else {
//       this.userData.contact_details.contact_no= input;
//       this.phoneNumberError = "";
//     }
//     this.requestUpdate();
//   }

handleMaritalChange(e) {
    this.userData.personal_details.marital = e.target.value;
    this.selectedMaritalError =
    this.userData.personal_details.marital.length === 0 ? "Marital is required" : "";
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

  adduserData() {
    const empId = this.generateUniqueId();
    this.userData.address.permanent_address.empId = empId;
    this.users.push(JSON.parse(JSON.stringify(this.userData)));
    localStorage.setItem("userData", JSON.stringify(this.users));
    this.requestUpdate();
  }
  generateUniqueId() {
    // Generate a random ID (you might need a more robust approach)
    return Math.floor(Math.random() * 1000000);
  }

  render() {
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mt-5 modal-card">
            <header class="modal-card-head header-separator">
              <p class="modal-card-title has-text-black">Create New User</p>
            </header>
            <section class="modal-card-body">
              <div class="columns col-spacing">
                <div class="column is-half">
                  <p class="mb-2 ml-2">* First name</p>
                  <input
                    class="${this.firstNameError
                      ? "input error-border"
                      : "input"}"
                    type="text"
                    placeholder="First Name"
                    .value="${this.userData.personal_details.first_name}"
                    @input="${(e) => this.handleFirstNameChange(e)}"
                  />

                  <div class=" is-flex">
                    ${this.firstNameError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon "
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon>
                          <span class="pt-2 pl-1  has-text-grey is-size-6"
                            >${this.firstNameError}</span
                          >`
                      : ""}
                  </div>
                </div>
                <div class="column is-half ">
                  <p class="mb-2 ml-2 ">* Last name</p>
                  <input
                    class="${this.lastNameError
                      ? "input error-border"
                      : "input"}"
                    type="text"
                    .value="${this.userData.personal_details.last_name}"
                    placeholder="Last Name"
                    @input="${(e) => this.handleLastNameChange(e)}"
                  />
                  <div class=" is-flex">
                    ${this.lastNameError
                      ? html`<omni-icon
                            class="mt-2 ml-2 error-icon"
                            icon-id="omni:informative:error"
                            aria-label="icon"
                            role="img"
                          ></omni-icon
                          ><span class="pt-2 pl-1 has-text-grey is-size-6"
                            >${this.lastNameError}</span
                          >`
                      : ""}
                  </div>
                </div>
              </div>



              <div class="columns col-spacing">
          <div class="column is-half">
            <div class="control mb-3 ">
              <label class="radio">
                <input
                  type="radio"
                  name="phoneType"
                  value="primary"
                  @change="${(e) => (this.phoneType = e.target.value)}"
                  ?checked="${this.phoneType === "primary"}"
                />
                Primary
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="phoneType"
                  value="secondary"
                  @change="${(e) => (this.phoneType = e.target.value)}"
                  ?checked="${this.phoneType === "secondary"}"
                />
                Secondary
              </label>
            </div>
            <input
              class="${this.phoneNumberError ? "input error-border" : "input"}"
              type="tel"
              maxlength="10"
              placeholder="Phone Number"
             
              @input="${(e) => this.handlePhoneNumberChange(e)}"
            />
            <div class=" is-flex">
              ${this.phoneNumberError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon"
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon
                    ><span class="pt-2 pl-1 has-text-grey is-size-6"
                      >${this.phoneNumberError}</span
                    >`
                : ""}
            </div>
          </div>
          <div class="column is-half">
            <p class="mb-2 ml-2">* Gender</p>
            <div class="control pt-4">
              <label class="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  @change="${(e) => (this.userData.personal_details.gender = e.target.value)}"
                />
                Male
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  @change="${(e) => (this.userData.personal_details.gender = e.target.value)}"
                />
                Female
              </label>
            </div>
          </div>
        </div>


            
        <div class="columns col-spacing">
          <div class="column is-half">
            <p class="mb-2 ml-2">* Marital Status</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="Marital"
              typeahead
              error="${this.selectedMaritalError
                ? this.selectedMaritalError
                : ""}"
              searchindropdown
              .options=${this.marital}
              .value="${this.userData.personal_details.marital}"
              @change="${(e) => this.handleMaritalChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-half ">
            <p class="mb-2 ml-2 ">* Date of birth</p>
            <input
              id="dobInput"
              type="date"
              slot="invoker"
              class="${this.birthDateError ? "input error-border" : "input"}"
              placeholder="yyyy-mm-dd"
              max="2999-12-31"
              .value="${this.userData.personal_details.dob}"
              @input="${(e) => this.handleDOBChange(e)}"
            />
            <div class=" is-flex">
              ${this.birthDateError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon"
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon
                    ><span class="pt-2 pl-1 has-text-grey is-size-6"
                      >${this.birthDateError}</span
                    >`
                : ""}
            </div>
          </div>
        </div>




        <div class="columns col-spacing">
          <div class="column is-half">
            <p class="mb-3 ml-3">* Personal email</p>
            <input
              class="${this.personalEmailError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="abc@gmail.com"
              @input="${(e) => this.handlePersonalEmailChange(e)}"
            />
            <div class="is-flex">
              ${this.personalEmailError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon"
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon
                    ><span class="pt-2 pl-1 has-text-grey is-size-6"
                      >${this.personalEmailError}</span
                    >`
                : ""}
            </div>
          </div>
          <div class="column is-half ">
            <p class="mb-3 ml-3 ">* Office email</p>
            <input
              class="${this.officeEmailError ? "input error-border" : "input"}"
              label="Choose One"
              type="text"
              placeholder="abc@annalect.com"
              @input="${(e) => this.handleOfficeEmailChange(e)}"
            />
            <div class=" is-flex">
              ${this.officeEmailError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon"
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon
                    ><span class="pt-2 pl-1 has-text-grey is-size-6"
                      >${this.officeEmailError}</span
                    >`
                : ""}
            </div>
          </div>
        </div>




              <div
                class="columns is-flex is-align-items-center is-justify-content-space-between mt-6 mb-3 mr-1 pt-4"
              >
                <span class="has-text-grey-light is-size-6 pl-3"
                  >* Required fields</span
                >
                <div class="buttons are-medium">
                  <button
                    class="button is-size-5 is-text"
                    @click="${this.closeUserForm}"
                  >
                    Cancel
                  </button>
                  <button
                    class="button is-size-5 is-link has-text-white bg-image "
                    @click="${this.adduserData}"
                  >
                    Create
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </omni-style>
    `;
  }
}

customElements.define("user-form45", UserForm);

import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "../alerts/my-alerts.js";
OmniElement.register();
OmniStyleElement.register();

export default class EditUser extends OmniElement {
  static styles = [
    super.styles,
    css`
      .header-separator {
        border-bottom: 1px solid rgb(241, 245, 250) !important;
        height: 43px;
      }
      .pd-4{
        padding-right : 16px;
      }
      .modal-card-body p {
        font-size: 0.8em !important;
        color: var(--color-shark);
      }
      .omni .footer-container span {
        text-align: left !important ;
      }
      .g-1{
        margin-block-start: -25px !important;
      }
      .error-border {
        border: 1px solid var(--color-melon) !important;
      }
  
    `,
  ];
  static get properties() {
    return {
      userData: { type: Object }, 
      states: { type: Array },
      districts: { type: Array },
      showSuccessMessage: { type: Boolean },
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      empId : { type: String },
      selectedState: { type: String },
      selectedDistrict: { type: String },
      personalEmail: { type: String },
      officeEmail: { type: String },
      gender: { type: String },
      firstNameError: { type: String },
      lastNameError: { type: String },
      phoneNumberError: { type: String },
      personalEmailError: { type: String },
      officeEmailError: { type: String },
    };
  }

  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = "";
    this.empId ="";
    this.birthDate ="";
    this.phoneType = "primary";
    this.gender = "";
    this.personalEmail = "";
    this.officeEmail = "";
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
    this.selectedState = "";
    this.selectedDistrict = "";
    
    this.showSuccessMessage = false;

    this.userData = {}; 
    this.dataArray = [];
  }

 

  handleFirstNameChange(e) {
    this.firstName = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    if (!this.firstName) {
      this.firstNameError = "First name is required";
    } else {
      // const isDuplicate = this.dataArray.some(
      //   (data) => data.firstName === this.firstName
      // );
      // this.firstNameError = isDuplicate ? "First name already exists" : "";
      this.firstNameError = "";
    }
    this.requestUpdate();
  }
  
  handleLastNameChange(e) {
    this.lastName = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    if (!this.lastName) {
      this.lastNameError = "Last name is required";
    } else {
      // const isDuplicate = this.dataArray.some(
      //   (data) => data.lastName === this.lastName
      // );
      // this.lastNameError = isDuplicate ? "Last name already exists" : "";
      this.lastNameError = "";
    }
    this.requestUpdate();
  }
  handlePhoneNumberChange(e) {
    const input = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    if (!input) {
      this.phoneNumberError = "Phone number is required";
    } else if (!/^\d+$/.test(input)) {
      this.phoneNumberError = "Phone number must contain only numbers";
    } else if (input.length !== 10) {
      this.phoneNumberError = "Phone number must be exactly 10 digits";
    } else if (this.dataArray.some((data) => data.phoneNumber === input)) {
      this.phoneNumberError = "Phone number already exists";
    } else {
      this.phoneNumber = input;
      this.phoneNumberError = "";
    }
    this.requestUpdate();
  }
  handleEmployeeIdChange(e) {
    this.empId = e.target.value.trim(); 
    if (!this.empId) {
      this.empIdError = "Employee id is required";
    }else if
      (!/^\d{5}$/.test(this.empId)) {
        this.empIdError = "Employee id must be 5 numbers.";
      }else {
      const isDuplicate = this.dataArray.some(
        (data) => data.empId === this.empId
      );
      this.empIdError = isDuplicate ? "Employee id already exists" : "";
    }
    this.requestUpdate();
  }
  handleDOBChange(e) {
    this.birthDate = e.target.value.trim();
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
  
  handlePersonalEmailChange(e) {
    this.personalEmail = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    if (!this.personalEmail) {
      this.personalEmailError = "Personal email is required";
    } else if (
      !/^(?=.*[@])(?=.*(yahoo\.com|outlook\.com|gmail\.com|gmail\.uk|gmail\.us)).*$/.test(
        this.personalEmail
      )
    ) {
      this.personalEmailError = "Invalid email format";
    } else {
      const isDuplicate = this.dataArray.some(
        (data) => data.personalEmail === this.personalEmail
      );
      this.personalEmailError = isDuplicate
        ? "Personal email already exists"
        : "";
    }
    this.requestUpdate();
  }
  handleOfficeEmailChange(e) {
    this.officeEmail = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    if (!this.officeEmail) {
      this.officeEmailError = "Office email is required";
    } else if (!this.officeEmail.endsWith("@annalect.com")) {
      this.officeEmailError = "Office email must end with @annalect.com";
    } else {
      const isDuplicate = this.dataArray.some(
        (data) => data.officeEmail === this.officeEmail
      );
      this.officeEmailError = isDuplicate ? "Office email already exists" : "";
    }
    this.requestUpdate();
  }
  handleStateChange(e) {
    this.selectedState = e.target.value;
    this.selectedStateError =
      this.selectedState.length === 0 ? "State is required" : "";
    this.requestUpdate();
  }
  handleDistrictChange(e) {
    this.selectedDistrict = e.target.value;
    this.selectedDistrictError =
      this.selectedDistrict.length === 0 ? "District is required" : "";
    this.requestUpdate();
  }

  closeUserForm() {
    this.dispatchEvent(new CustomEvent("close-user-form"));
    window.location.reload();
  }

  renderData() {
    console.log("select:", this.selectedState);
    const isFormValid =
      this.firstName &&
      this.lastName &&
      this.phoneNumber &&
      this.empId &&
      this.gender &&
    //   this.selectedState.length > 0 &&
    //   this.selectedDistrict.length > 0 &&
      this.personalEmail &&
      this.officeEmail &&
      !this.firstNameError &&
      !this.lastNameError &&
      !this.phoneNumberError &&
      !this.birthDateError&&
      !this.personalEmailError &&
      !this.officeEmailError&&
      this.birthDate&&
      !this.birthDateError;
    console.log("disable:", isFormValid);
    return html`
      <header class="modal-card-head header-separator">
        <p class="modal-card-title has-text-black">Edit Form</p>
      </header>

      <section class="modal-card-body">
        <div class="columns col-spacing">
          <div class="column is-half">
            <p class="mb-2 ml-2">* First name</p>
            <input
              class="${this.firstNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="First Name"
              value="${this.userData.firstName}"
              @input="${(e) => this.handleFirstNameChange(e)}"
            />

            <div class=" is-flex">
              ${this.firstNameError
                ? html`<omni-icon
                      class="mt-2 ml-2  "
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
              class="${this.lastNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="Last Name"
              value="${this.userData.lastName}"
              @input="${(e) => this.handleLastNameChange(e)}"
            />
            <div class=" is-flex">
              ${this.lastNameError
                ? html`<omni-icon
                      class="mt-2 ml-2"
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
                  ?checked="${this.userData.phoneType === "primary"}"
                 
                />
                Primary
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="phoneType"
                  value="secondary"
                  @change="${(e) => (this.phoneType = e.target.value)}"
                  ?checked="${this.userData.phoneType === "secondary"}"
                />
                Secondary
              </label>
            </div>
            <input
              class="${this.phoneNumberError ? "input error-border" : "input"}"
              type="tel"
              maxlength="10"
              placeholder="Phone Number"
              value="${this.userData.phoneNumber}"
              @input="${(e) => this.handlePhoneNumberChange(e)}"
            />
            <div class=" is-flex">
              ${this.phoneNumberError
                ? html`<omni-icon
                      class="mt-2 ml-2"
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
                  ?checked="${this.userData.gender === 'Male'}"
                  @change="${(e) => (this.gender = e.target.value)}"
                />
                Male
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  ?checked="${this.userData.gender === 'Female'}"
                  @change="${(e) => (this.gender = e.target.value)}"
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <div class="columns col-spacing">
          <div class="column is-half">
            <p class="mb-2 ml-2">* Employee Id</p>
            <input
              class="${this.empIdError ? "input error-border" : "input"}"
              type="text"
              placeholder="Employee id"
              value="${this.userData.empId}"
              maxlength="5"
              @input="${(e) => this.handleEmployeeIdChange(e)}"
            />

            <div class=" is-flex">
              ${this.empIdError
                ? html`<omni-icon
                      class="mt-2 ml-2  "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.empIdError}</span
                    >`
                : ""}
            </div>
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
              value="${this.userData.birthDate}"
              @input="${(e) => this.handleDOBChange(e)}"
            />
            <div class=" is-flex">
              ${this.birthDateError
                ? html`<omni-icon
                      class="mt-2 ml-2"
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
            <p class="mb-3 ml-3">* State</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="State"
              typeahead
              .value="${this.userData.selectedState}"
              error="${this.selectedStateError ? this.selectedStateError : ''}"
              searchindropdown
              
              .options=${this.states}
              @change="${(e) => this.handleStateChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-half">
            <p class="mb-3 ml-3 ">* District</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="District"
              error="${this.selectedDistrictError ? this.selectedDistrictError : ''}"
              typeahead
              .value="${this.userData.selectedDistrict}"
              searchindropdown
             
              .options=${this.districts}
              @change="${(e) => this.handleDistrictChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>

        <div class="columns col-spacing g-1">
          <div class="column is-half">
            <p class="mb-3 ml-3">* Personal email</p>
            <input
              class="${this.personalEmailError ? "input error-border" : "input"}"
              type="text"
              placeholder="abc@gmail.com"
              value="${this.userData.personalEmail}"
              @input="${(e) => this.handlePersonalEmailChange(e)}"
            />
            <div class="is-flex">
              ${this.personalEmailError
                ? html`<omni-icon
                      class="mt-2 ml-2"
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
              value="${this.userData.officeEmail}"
              placeholder="abc@annalect.com"
              @input="${(e) => this.handleOfficeEmailChange(e)}"
            />
            <div class=" is-flex">
              ${this.officeEmailError
                ? html`<omni-icon
                      class="mt-2 ml-2"
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
              ?disabled="${!isFormValid}"
              @click="${this.handleSave}"
            >
              Create
            </button>
          </div>
        </div>
      </section>
    `;
  }

  renderNotification() {
    return html`
      <article
        class="notification is-success"
        ?hidden=${!this.showSuccessMessage}
      >
        <omni-icon
          icon-id="omni:informative:success"
          aria-label="icon"
          role="img"
        ></omni-icon>
        <button
          class="delete"
          aria-label="delete"
          @click="${this.closeUserForm}"
        ></button>
       Your profile has been successfully created!
      </article>
    `;
  }

  render() {
    console.log(this.showSuccessMessage);
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mt-5 modal-card">
            ${console.log("showSuccessMessage:", this.showSuccessMessage)}
            ${this.showSuccessMessage ? this.renderNotification() : ""}
            ${!this.showSuccessMessage ? this.renderData() : ""}
          </div>
        </div>
      </omni-style>
    `;
  }
}
customElements.define("edit-user", EditUser);

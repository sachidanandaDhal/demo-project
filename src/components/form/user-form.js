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
        padding-right: 22px !important;
      }
      .m-16 {
        margin-block-start: -30px !important;
      }
      .g-1 {
        margin-block-start: -25px !important;
      }
      
      .g-2 {
        margin-block-start: -3px !important;
      }
      .g-3 {
        margin-block-start: -15px !important;
      }
      .modal-card-body p {
        font-size: 0.8em !important;
        color: var(--color-shark);
      }
      .omni .footer-container span {
        text-align: left !important ;
      }

      .error-border {
        border: 1px solid var(--color-melon) !important;
      }
      .error-icon {
        --color-icon-lines: #eb0465 !important;
        fill: var(--color-icon-lines) !important;
      }
      .omni .modal-card,
      .omni .modal-content {
        min-width: 940px !important;
      }
      omni-dropdown .footer-spacer {
        height: 0px !important;
        min-height: 0px !important;
        max-height: 0px !important;
        flex: 0 0 100%;
      }
    `,
  ];
  static properties = {
    showSuccessMessage: { type: Boolean },
    sameAddress: { type: Boolean },
  };
  constructor() {
    super();
    const storedData = localStorage.getItem("userData");
    this.dataArray = storedData ? JSON.parse(storedData) : [];
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = "";
    this.officephoneNumber = "";
    this.empId = "";
    this.birthDate = "";
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
    this.country = ["India", "USA"];
    this.marital = [
      "Single",
      "Married",
      "Divorced",
      "Widowed",
      "Separated",
      "Common Law",
    ];
    this.roles = ["User", "Super Admin", "Admin"];
    this.selectedCurrentstate = "";
    this.selectedCurrentdistrict = "";
    this.selectedCurrentcountry = "";
    this.selectedpermanentcountry = "";
    this.selectedpermanentDistrict = "";
    this.selectedpermanentState = "";
    this.currentAddress = "";
    this.currentStreet = "";
    this.currentPincode = "";
    this.permanentAddress = "";
    this.permanentStreet = "";
    this.permanentPincode = "";
    this.selectedMarital = "";
    this.sameAddress = false;
    this.selectedState = "";
    this.selectedDistrict = "";
    this.userid = "",
    this.showSuccessMessage = false;
    this.generateEmpId();
  }
  // generateEmpId() {
  //   const maxEmpId = this.dataArray.reduce((max, data) => {
  //     const idNumber = parseInt(data.empId);
  //     return idNumber > max ? idNumber : max;
  //   }, 0);
  //   const newEmpId = "OMNI_" + (maxEmpId + 1).toString().padStart(4, "0");
  //   this.empId = newEmpId;
  // }
  generateEmpId() {
    const maxEmpId = this.dataArray.reduce((max, data) => {
        const idNumber = parseInt(data.empId.substring(5)); 
        return idNumber > max ? idNumber : max;
    }, 0);
    let newEmpId;
    let isDuplicate = true;
    while (isDuplicate) {
        const candidateId = maxEmpId + 1;
        newEmpId = "OMNI_" + candidateId.toString().padStart(4, "0");
        isDuplicate = this.dataArray.some(data => data.empId === newEmpId);
        if (isDuplicate) {
            maxEmpId++;
        }
    }
    this.empId = newEmpId;
  }

  handleSave() {
    const newId = Date.now();
    const creationDate = new Date();

    this.dataArray.push({
      id: newId,
      empId: this.empId,
      modified_on: creationDate,
      personal_details: {
        first_name: this.firstName,
        last_name: this.lastName,
        dob: this.birthDate,
        gender: this.gender,
        Marital: this.selectedMarital,
      },
      contact_details: {
        phoneNumber: this.phoneNumber,
        officephoneNumber: this.officephoneNumber,
        personalEmail: this.personalEmail,
      },
      address: {
        current_address: {
          flat_house_no: this.currentAddress,
          building_no: this.currentStreet,
          pin: this.currentPincode,
          state: this.selectedCurrentstate,
          district: this.selectedCurrentdistrict,
          country: this.selectedCurrentcountry,
        },
        permanent_address: {
          flat_house_no: this.permanentAddress,
          building_no: this.permanentStreet,
          pin: this.permanentPincode,
          state: this.selectedpermanentState,
          district: this.selectedpermanentDistrict,
          country: this.selectedpermanentcountry,
        },
      },
      user_login_details: {
        username: this.userid,
        password: "OMNI.user",
        officeEmail: this.officeEmail,
        role: this.selectedRole,
        active: true,
      },
    });
    localStorage.setItem("userData", JSON.stringify(this.dataArray));
    console.log("Data Array:", this.dataArray);
    console.log("New entry ID:", newId);
    this.showSuccessMessage = true;
    this.requestUpdate();
    console.log(this.showSuccessMessage);
  }
  //////////////////////
  handleuseridChange(e) {
    this.userid = e.target.value.trim();
    if (!this.userid) {
      this.useridError = "User name is required";
    } else {
      this.useridError = "";
    }
    this.requestUpdate();
  }
  ////////////////////////////////////////////////
  handleFirstNameChange(e) {
    this.firstName = e.target.value.trim();
    if (!this.firstName) {
      this.firstNameError = "First name is required";
    } else {
      this.firstNameError = "";
    }
    this.requestUpdate();
  }

  handleLastNameChange(e) {
    this.lastName = e.target.value.trim();
    if (!this.lastName) {
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
    } else if (this.dataArray.some((data) => data.phoneNumber === input)) {
      this.phoneNumberError = "Phone number already exists";
    } else {
      this.phoneNumber = input;
      this.phoneNumberError = "";
    }
    this.requestUpdate();
  }

  handleOfficePhoneNumberChange(e) {
    const input = e.target.value.trim();
    if (!input) {
      this.officephoneNumberError = "Phone number is required";
    } else if (!/^\d+$/.test(input)) {
      this.officephoneNumberError = "Phone number must contain only numbers";
    } else if (input.length !== 10) {
      this.officephoneNumberError = "Phone number must be exactly 10 digits";
    } else if (
      this.dataArray.some((data) => data.officephoneNumber === input)
    ) {
      this.officephoneNumberError = "Phone number already exists";
    } else {
      this.officephoneNumber = input;
      this.officephoneNumberError = "";
    }
    this.requestUpdate();
  }

  handleMaritalChange(e) {
    this.selectedMarital = e.target.value;
    this.selectedMaritalError =
      this.selectedMarital.length === 0 ? "Marital is required" : "";
    this.requestUpdate();
  }
  handleRoleChange(e) {
    this.selectedRole = e.target.value;
    this.selectedRoleError =
      this.selectedRole.length === 0 ? "Role is required" : "";
    this.requestUpdate();
  }
  handleEmployeeIdChange(e) {
    this.empId = e.target.value.trim();
    if (!this.empId) {
      this.empIdError = "Employee id is required";
    } else if (!/^\d{5}$/.test(this.empId)) {
      this.empIdError = "Employee id must be 5 numbers.";
    } else {
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
    this.personalEmail = e.target.value.trim();
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
    this.officeEmail = e.target.value.trim();
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
  //
  handleCurrentAddressChange(e) {
    this.currentAddress = e.target.value.trim();
    if (!this.currentAddress) {
      this.currentAddressError = "Current Address is required";
    } else {
      this.currentAddressError = "";
    }
    this.requestUpdate();
  }

  handleCurrentStreetChange(e) {
    this.currentStreet = e.target.value.trim();
    if (!this.currentStreet) {
      this.currentStreetError = "Current Street is required";
    } else {
      this.currentStreetError = "";
    }
    this.requestUpdate();
  }

  handleCurrentPincodeChange(e) {
    this.currentPincode = e.target.value.trim();
    if (!this.currentPincode) {
      this.currentPincodeError = "Current pincode is required.";
    } else if (!/^\d{6}$/.test(this.currentPincode)) {
      this.currentPincodeError = "Pincode must be 6 numbers.";
    } else {
      this.currentPincodeError = "";
    }
    this.requestUpdate();
  }
  handleStateChange(e) {
    this.selectedCurrentstate = e.target.value;
    this.selectedCurrentstateError =
      this.selectedCurrentstate.length === 0 ? "State is required" : "";
    this.requestUpdate();
  }
  handleDistrictChange(e) {
    this.selectedCurrentdistrict = e.target.value;
    this.selectedCurrentdistrictError =
      this.selectedCurrentdistrict.length === 0 ? "District is required" : "";
    this.requestUpdate();
  }
  handleCurrentCountryChange(e) {
    this.selectedCurrentcountry = e.target.value;
    this.selectedCurrentcountryError =
      this.selectedCurrentcountry.length === 0
        ? "Current Country is required"
        : "";
    this.requestUpdate();
  }
  ///

  handlePermanentAddressChange(e) {
    this.permanentAddress = e.target.value.trim();
    if (!this.permanentAddress) {
      this.permanentAddressError = "Permanent Address is required";
    } else {
      this.permanentAddressError = "";
    }
    this.requestUpdate();
  }

  handlePermanentStreetChange(e) {
    this.permanentStreet = e.target.value.trim();
    if (!this.permanentStreet) {
      this.permanentStreetError = "Permanent Street is required";
    } else {
      this.permanentStreetError = "";
    }
    this.requestUpdate();
  }

  handlePermanentPincodeChange(e) {
    this.permanentPincode = e.target.value.trim();
    if (!this.permanentPincode) {
      this.permanentPincodeError = "Permanent pincode is required.";
    } else if (!/^\d{6}$/.test(this.permanentPincode)) {
      this.permanentPincodeError = "Pincode must be 6 numbers.";
    } else {
      this.permanentPincodeError = "";
    }
    this.requestUpdate();
  }
  handlePermanentStateChange(e) {
    this.selectedpermanentState = e.target.value;
    this.selectedpermanentStateError =
      this.selectedpermanentState.length === 0
        ? "Permanent State is required"
        : "";
    this.requestUpdate();
  }
  handlePermanentDistrictChange(e) {
    this.selectedpermanentDistrict = e.target.value;
    this.selectedpermanentDistrictError =
      this.selectedpermanentDistrict.length === 0
        ? "Permanent District is required"
        : "";
    this.requestUpdate();
  }
  handlePermanentCountryChange(e) {
    this.selectedpermanentcountry = e.target.value;
    this.selectedpermanentcountryError =
      this.selectedpermanentcountry.length === 0
        ? "Permanent Country is required"
        : "";
    this.requestUpdate();
  }

  handleSameAddressChange(e) {
    this.sameAddress = e.target.checked;
    if (this.sameAddress) {
      this.permanentAddress = this.currentAddress;
      this.permanentStreet = this.currentStreet;
      this.permanentPincode = this.currentPincode;
      this.selectedpermanentState = this.selectedCurrentstate;
      this.selectedpermanentDistrict = this.selectedCurrentdistrict;
      this.selectedpermanentcountry = this.selectedCurrentcountry;
    } else {
      this.permanentAddress = "";
      this.permanentStreet = "";
      this.permanentPincode = "";
      this.selectedpermanentState = "";
      this.selectedpermanentDistrict = "";
      this.selectedpermanentcountry = "";
    }
    this.requestUpdate();
    console.log("checkbox:", this.sameAddress);
    console.log("currentaddresh:", this.currentAddress);
    console.log("PermentAddresh:", this.permanentAddress);
  }

  closeUserForm() {
    this.dispatchEvent(new CustomEvent("close-user-form"));
  }

  handleGenderChange(e) {
    this.gender = e.target.value; // Update gender state variable
    this.requestUpdate(); // Trigger re-render
  }

  renderData() {
    console.log("select:", this.selectedState);
    const isFormValid = !this.birthDateError;
    console.log("disable:", isFormValid);
    return html`
      <header class="modal-card-head header-separator">
        <p class="modal-card-title has-text-black">Create New User</p>
      </header>
      <section class="modal-card-body">
        <p class="is-size-4  has-text-weight-bold has-text-dark pb-4">
          Personal Details
        </p>

        <div class="columns col-spacing">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* First name</p>
            <input
              class="${this.firstNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="First Name"
              .value="${this.firstName}"
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
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Last name</p>
            <input
              class="${this.lastNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="Last Name"
              .value="${this.lastName}"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Marital Status</p>
            <omni-dropdown
              class="pd-4"
              placeholder="Marital"
              typeahead
              error="${this.selectedMaritalError
                ? this.selectedMaritalError
                : ""}"
              searchindropdown
              .options=${this.marital}
              .value="${this.selectedMarital}"
              @change="${(e) => this.handleMaritalChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>

        <div class="columns col-spacing pr-2 pb-4 m-16">
          <div class="column is-one-third">
            <p class="mb-2 ml-3">* Gender</p>
            <div class="control pt-3 pl-4">
              <label class="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  @change="${(e) => this.handleGenderChange(e)}"
                  ?checked="${this.gender === "Male"}"
                />
                Male
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  @change="${(e) => this.handleGenderChange(e)}"
                  ?checked="${this.gender === "Female"}"
                />
                Female
              </label>
            </div>
          </div>
          <div class="column is-one-third pl-4">
            <p class="mb-2 ml-2 ">* Date of birth</p>
            <input
              id="dobInput"
              type="date"
              slot="invoker"
              class="${this.birthDateError ? "input error-border" : "input"}"
              placeholder="yyyy-mm-dd"
              max="2999-12-31"
              .value="${this.birthDate}"
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

        <hr class="g-2"/>
        <p class="is-size-4 has-text-weight-bold has-text-dark ">
          Contact Details
        </p>
        <div class="columns col-spacing pt-3 ">
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Personal Mobile No</p>
            <input
              class="${this.phoneNumberError ? "input error-border" : "input"}"
              type="tel"
              maxlength="10"
              placeholder="Phone Number"
              .value="${this.phoneNumber}"
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
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Office Mobile No</p>
            <input
              class="${this.officephoneNumberError
                ? "input error-border"
                : "input"}"
              type="tel"
              maxlength="10"
              placeholder="Office Phone Number"
              .value="${this.officephoneNumber}"
              @input="${(e) => this.handleOfficePhoneNumberChange(e)}"
            />
            <div class=" is-flex">
              ${this.officephoneNumberError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon"
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon
                    ><span class="pt-2 pl-1 has-text-grey is-size-6"
                      >${this.officephoneNumberError}</span
                    >`
                : ""}
            </div>
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3">* Personal Email ID</p>
            <input
              class="${this.personalEmailError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="abc@gmail.com"
              .value="${this.personalEmail}"
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
        </div>
        <hr />

        <p class="is-size-4  pt-4 has-text-weight-bold has-text-dark g-3">
          Current Address Detail
        </p>
        <div class="columns col-spacing pt-3">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Flat/House/Wing Number</p>
            <input
              class="${this.currentAddressError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Address Detail"
              .value="${this.currentAddress}"
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
          </div>
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Street/Locality/Area</p>
            <input
              class="${this.currentStreetError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Address Detail"
              .value="${this.currentStreet}"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Pincode</p>
            <input
              class="${this.currentPincodeError
                ? "input error-border"
                : "input"}"
              type="text"
              maxlength="6"
              placeholder="Pincode"
              .value="${this.currentPincode}"
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
          </div>
        </div>

        <div class="columns col-spacing ">
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* District</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="District"
              error="${this.selectedCurrentdistrictError
                ? this.selectedCurrentdistrictError
                : ""}"
              typeahead
              searchindropdown
              .options=${this.districts}
              .value=${this.selectedCurrentdistrict}
              @change="${(e) => this.handleDistrictChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3">* State</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="State"
              typeahead
              error="${this.selectedCurrentstateError
                ? this.selectedCurrentstateError
                : ""}"
              searchindropdown
              .options=${this.states}
              .value=${this.selectedCurrentstate}
              @change="${(e) => this.handleStateChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Country</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="Country"
              error="${this.selectedCurrentcountryError
                ? this.selectedCurrentcountryError
                : ""}"
              typeahead
              searchindropdown
              .options=${this.country}
              .value=${this.selectedCurrentcountry}
              @change="${(e) => this.handleCurrentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>
        <hr class="g-3"/>
        <div class="pb-3">
          <label class="checkbox gp-12">
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
        </div>

        <div class="columns col-spacing pt-2">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Flat/House/Wing Number</p>
            <input
              class="${this.permanentAddressError
                ? "input error-border"
                : "input"}"
              type="text"
              .value="${this.permanentAddress}"
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
          </div>
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Street/Locality/Area</p>
            <input
              class="${this.permanentStreetError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Address"
              .value="${this.permanentStreet}"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Pincode</p>
            <input
              class="${this.permanentPincodeError
                ? "input error-border"
                : "input"}"
              type="text"
              maxlength="6"
              placeholder="Pincode"
              .value="${this.permanentPincode}"
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
          </div>
        </div>
        <div class="columns col-spacing pt-2 ">
          <div class="column is-one-third ">
            <p class="mb-3 ml-3 ">* District</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="District"
              error="${this.selectedpermanentDistrictError
                ? this.selectedpermanentDistrictError
                : ""}"
              typeahead
              .value="${this.selectedpermanentDistrict}"
              searchindropdown
              .options=${this.districts}
              @change="${(e) => this.handlePermanentDistrictChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3">* State</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="State"
              typeahead
              .value="${this.selectedpermanentState}"
              error="${this.selectedpermanentStateError
                ? this.selectedpermanentStateError
                : ""}"
              searchindropdown
              .options=${this.states}
              @change="${(e) => this.handlePermanentStateChange(e)}"
            >
            </omni-dropdown>
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Country</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="Country"
              error="${this.selectedpermanentcountryError
                ? this.selectedpermanentcountryError
                : ""}"
              typeahead
              searchindropdown
              .value="${this.selectedpermanentcountry}"
              .options=${this.country}
              @change="${(e) => this.handlePermanentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>

        <hr class="g-3"/>
        <p class="is-size-4  has-text-weight-bold has-text-dark pb-4">
          Account Access Details
        </p>
        <div class="columns col-spacing">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* User Name</p>
            <input
              class="${this.useridError ? "input error-border" : "input"}"
              type="text"
              placeholder="Enter a username..."
              .value="${this.userid}"
              @input="${(e) => this.handleuseridChange(e)}"
            />
            <div class=" is-flex">
              ${this.useridError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.useridError}</span
                    >`
                : ""}
            </div>
          </div>
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Office Email ID</p>
            <input
              class="${this.officeEmailError ? "input error-border" : "input"}"
              label="Choose One"
              type="text"
              placeholder="abc@annalect.com"
              .value="${this.officeEmail}"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Role</p>
            <omni-dropdown
              class="pd-4"
              placeholder="Role"
              error="${this.selectedRoleError ? this.selectedRoleError : ""}"
              .options=${this.roles}
              .value="${this.selectedRole}"
              @change="${(e) => this.handleRoleChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>

        <div
          class="columns is-flex is-align-items-center is-justify-content-space-between  pt-6 "
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
          <div class="modal-background">
          <div class="mt-5 modal-card">
            ${this.showSuccessMessage ? this.renderNotification() : ""}
            ${!this.showSuccessMessage ? this.renderData() : ""}
          </div>
          </div>
        </div>
      </omni-style>
    `;
  }
}
customElements.define("user-form", UserForm);

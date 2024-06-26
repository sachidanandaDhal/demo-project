import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from '@vaadin/router';
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
      .wt-1 {
        width: 550px !important;
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
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
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
    sameAddress: { type: Boolean },
    userData: { type: Object },
    users: { type: Array },
    user_role: { type: String },
  };
  constructor() {
    super();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    this.users = [];
    this.userData = {
      id: "",
      empId: "",
      registered_on: formattedDate,
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
          state: "",
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
    this.adduserData = this.adduserData.bind(this);

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
    this.roles = ["User", "Admin"];
    this.loadUserData();
    this.sameAddress = false;
    this.generateUniqueId();
    this.generateUniqueempId();
  }

  connectedCallback() {
    super.connectedCallback();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    this.user_role = this.currentUser.user_login_details.role[0];
    console.log(this.user_role);
    const params = new URLSearchParams(window.location.search);
    this.userId = params.get('userId');
    if (this.userId) {
        const users = JSON.parse(localStorage.getItem("userData")) || [];
        this.userData = users.find(user => user.id === this.userId) || {};
    } 
}

  
  generateUniqueempId() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    // Find the maximum ID currently in use
    let maxId = 0;
    userData.forEach((user) => {
      const id = parseInt(user.empId.split("_")[1]);
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
    });

    // Generate the new ID
    const newId = (maxId + 1).toString().padStart(4, "0");

    return `OMNI_${newId}`;
  }
  generateUniqueId() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    let maxId = 0;
    userData.forEach((user) => {
      const id = parseInt(user.id);
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
    });
    const newId = maxId + 1;
    return newId.toString();
  }

  loadUserData() {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      this.users = JSON.parse(storedData);
    }
  }
  adduserData() {
    if (this.userData.id) {
      const currentTime= new Date();
  
      // If userData contains an ID, it means we're updating an existing user
      const index = this.users.findIndex(user => user.id === this.userData.id);
      if (index !== -1) {
        const modifiedDate = `${currentTime.getDate().toString().padStart(2, '0')}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getFullYear()}`;
        this.userData.modified_on = modifiedDate;
        this.users[index] = JSON.parse(JSON.stringify(this.userData));
      }
    } else {
      // If userData does not contain an ID, it means we're creating a new user
      const empId = this.generateUniqueempId();
      const Id = this.generateUniqueId();
      const currentTime= new Date();
      const modifiedDate = `${currentTime.getDate().toString().padStart(2, '0')}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getFullYear()}`;
        this.userData.modified_on = modifiedDate;
      this.userData.id = Id;
      this.userData.empId = empId;
      this.users.push(JSON.parse(JSON.stringify(this.userData)));
    }
    
    localStorage.setItem("userData", JSON.stringify(this.users));
    this.openOmniToastElModal();
    this.requestUpdate();
  }

  ///////////////PERSONAL////////////////
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

  ////////////Contact////////////////////
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
        user.contact_details.officephoneNumber === newPhoneNumber 
        && user.id !== this.userData.id // Exclude the current user being edited from the check
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
  ////////////////////////////////////////ADDRESS-CURRENT/////////////
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

  openOmniToastElModal(){
    const toast = this.shadowRoot.querySelector('#toast');
    toast.openModal();
    setTimeout(() => {
      this.closeUserForm();
    }, 1500);
    this.requestUpdate();
  }
  
  closeUserForm() {
    Router.go('/home');
  }

  handleGenderChange(e) {
    this.userData.personal_details.gender = e.target.value; // Update gender state variable
    this.requestUpdate(); // Trigger re-render
  }
  handleActiveChange(e) {
    const newValue = e.target.value === 'true'; // Convert the string value to a boolean
    // Update your userData object with the new active state
    this.userData.user_login_details.active = newValue;
    // Dispatch a custom event to notify any listeners about the change
    this.dispatchEvent(new CustomEvent('active-changed', {
      detail: {
        active: newValue
      }
    }));
  }

  renderData() {
    const title = this.userId ? 'Edit User Details' : 'Create New User';
    const buttonText = this.userId ? 'Update' : 'Create';
    const isFormValid =
      this.userData.personal_details.first_name && this.userData.personal_details.last_name &&
      this.userData.personal_details.dob && this.userData.personal_details.gender &&
      this.userData.personal_details.marital.length >  0 && this.userData.contact_details.phoneNumber &&
      this.userData.contact_details.officephoneNumber && this.userData.contact_details.personalEmail &&
      this.userData.address.current_address.flat_house_no && this.userData.address.current_address.building_no &&
      this.userData.address.current_address.pin && this.userData.address.current_address.state.length > 0 &&
      this.userData.address.current_address.district.length > 0 && this.userData.address.current_address.country.length > 0 &&
      this.userData.address.permanent_address.flat_house_no && this.userData.address.permanent_address.building_no &&
      this.userData.address.permanent_address.pin && this.userData.address.permanent_address.state.length > 0 &&
      this.userData.address.permanent_address.district.length > 0 && this.userData.address.permanent_address.country.length > 0 &&
      this.userData.user_login_details.username && this.userData.user_login_details.officeEmail && this.userData.user_login_details.role.length > 0 &&
      !this.firstNameError && !this.lastNameError && !this.birthDateError && !this.phoneNumberError && !this.officephoneNumberError &&
      !this.personalEmailError && !this.currentAddressError && ! this.currentStreetError && !this.currentPincodeError &&
      !this.permanentAddressError && !this.permanentStreetError && !this.permanentPincodeError && !this.useridnameError &&
      !this.officeEmailError;


      let accountRender = html``; // Default to rendering nothing
      if (
        (this.user_role === "Admin" || this.user_role === "Super Admin") &&
        !this.userId
      ) {
        accountRender = this.renderAccount(); // Render when user_role is "Admin" or "Super Admin" and userId is not present
      } else if (this.user_role === "Super Admin" && this.userId) {
        accountRender = this.renderAccount(); // Render when user_role is "Super Admin" and userId is present
      }
    return html`
      <header class="modal-card-head header-separator">
      <p class="modal-card-title has-text-black">${title}</p>
      </header>
      <section class="modal-card-body">
        <p class="is-size-4  has-text-weight-bold has-text-dark pb-4">
          Personal Details
        </p>

        <div class="columns col-spacing">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* First Name</p>
            <input
              class="${this.firstNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="Enter First Name"
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
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Last Name</p>
            <input
              class="${this.lastNameError ? "input error-border" : "input"}"
              type="text"
              placeholder="Enter Last Name"
              .value="${this.userData.personal_details.last_name}"
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
              placeholder="Select Marital"
              
              error="${this.selectedMaritalError
                ? this.selectedMaritalError
                : ""}"
              .options=${this.marital}
              .value="${this.userData.personal_details.marital}"
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
                  ?checked="${this.userData.personal_details.gender ===
                  "Female"}"
                />
                Female
              </label>
            </div>
          </div>
          <div class="column is-one-third pl-4">
            <p class="mb-2 ml-2 ">* Date of Birth</p>
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

        <hr class="g-2" />
        <p class="is-size-4 has-text-weight-bold has-text-dark ">
          Contact Details
        </p>
        <div class="columns col-spacing pt-3 ">
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Personal Mobile No</p>
            <input
              class="${this.phoneNumberError ? "input error-border" : "input"}"
              type="number"
              placeholder="Personal Mobile Number"
              oninput="this.value = this.value.slice(0, 10);"
              .value="${this.userData.contact_details.phoneNumber}"
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
              type="number"
              placeholder="Office Mobile Number"
              oninput="this.value = this.value.slice(0, 10);"
              .value="${this.userData.contact_details.officephoneNumber}"
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
              .value="${this.userData.contact_details.personalEmail}"
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
          Current Address Details
        </p>
        <div class="columns col-spacing pt-3">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Flat/House/Wing Number</p>
            <input
              class="${this.currentAddressError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Enter Flat/House"
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
          </div>
          <div class="column is-one-third ">
            <p class="mb-2 ml-2 ">* Street/Locality/Area</p>
            <input
              class="${this.currentStreetError
                ? "input error-border"
                : "input"}"
              type="text"
              placeholder="Enter Street/Locality"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Pincode</p>
            <input
              class="${this.currentPincodeError
                ? "input error-border"
                : "input"}"
              type="number"
              placeholder="Enter Pincode"
              oninput="this.value = this.value.slice(0, 6);"
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
          </div>
        </div>

        <div class="columns col-spacing ">
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* District</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="Select District"
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
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3">* State</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="Select State"
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
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Country</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="Select Country"
              error="${this.selectedCurrentcountryError
                ? this.selectedCurrentcountryError
                : ""}"
              .options=${this.country}
              .value=${this.userData.address.current_address.country}
              @change="${(e) => this.handleCurrentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>
        <hr class="g-3" />
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
            Permanent Address Details
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
              .value="${this.userData.address.permanent_address.flat_house_no}"
              placeholder="Enter Flat/House"
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
              placeholder="Enter Street/Locality"
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
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* Pincode</p>
            <input
              class="${this.permanentPincodeError
                ? "input error-border"
                : "input"}"
              type="number"
              placeholder="Enter Pincode"
              .value="${this.userData.address.permanent_address.pin}"
              @input="${(e) => this.handlePermanentPincodeChange(e)}"
              oninput="this.value = this.value.slice(0, 6);"
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
              placeholder="Select District"
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
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3">* State</p>
            <omni-dropdown
              class="pd-4 "
              placeholder="Select State"
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
          </div>
          <div class="column is-one-third">
            <p class="mb-3 ml-3 ">* Country</p>
            <omni-dropdown
              part="target "
              class="pd-4 "
              placeholder="Select Country"
              error="${this.selectedpermanentcountryError
                ? this.selectedpermanentcountryError
                : ""}"
              .value="${this.userData.address.permanent_address.country}"
              .options=${this.country}
              @change="${(e) => this.handlePermanentCountryChange(e)}"
            >
            </omni-dropdown>
          </div>
        </div>
        
        ${accountRender}
        
        ${this.userId && this.user_role === "Super Admin" ? html`
        <div class="columns col-spacing">
          <div class="column is-one-third">
            <p class="mb-2 ml-3">* Status</p>
            <div class="control pt-3 pl-4">
              <label class="radio">
                <input
                  type="radio"
                  name="status"
                  value=true
                  @change="${(e) => this.handleActiveChange(e)}"
                  ?checked="${this.userData.user_login_details.active === true}"
                />
                Active
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="status"
                  value=false
                  @change="${(e) => this.handleActiveChange(e)}"
                  ?checked="${this.userData.user_login_details.active === false}"
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
        ` : html``}
        

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
              @click="${this.adduserData}"
            >
            ${buttonText}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  renderAccount() {
    return html`
    <hr class="g-3" />
        <p class="is-size-4  has-text-weight-bold has-text-dark pb-4">
          Account Access Details
        </p>
        <div class="columns col-spacing">
          <div class="column is-one-third">
            <p class="mb-2 ml-2">* User Name</p>
            <input
              class="${this.useridnameError ? "input error-border" : "input"}"
              type="text"
              placeholder="Enter username"
              .value="${this.userData.user_login_details.username}"
              @input="${(e) => this.handleuserNameChange(e)}"
            />
            <div class=" is-flex">
              ${this.useridnameError
                ? html`<omni-icon
                      class="mt-2 ml-2 error-icon "
                      icon-id="omni:informative:error"
                      aria-label="icon"
                      role="img"
                    ></omni-icon>
                    <span class="pt-2 pl-1  has-text-grey is-size-6"
                      >${this.useridnameError}</span
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
              .value="${this.userData.user_login_details.officeEmail}"
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
              .value="${this.userData.user_login_details.role}"
              @change="${(e) => this.handleRoleChange(e)}"
            >
            </omni-dropdown>
          </div>
          
        </div>


    `;
  }
  

  render() {
    const Message = this.userId ? 'User profile has been successfully updated!' : 'User profile has been successfully created!';
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background">
            <div class="mt-5 modal-card">
              ${this.renderData()}
            </div>
            </div>
        </div>
        <omni-dialog
        id="toast"
        modalType="toast"
        modalStyle="success"
        toastTimeOut="2000">
        <p slot="content">${Message}</p>
      </omni-dialog>
      </omni-style>
    `;
  }
}
customElements.define("user-form", UserForm);


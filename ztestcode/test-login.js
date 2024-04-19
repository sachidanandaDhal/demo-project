import { html, css, LitElement } from "lit";
import './u-4.js';
import './u-2.js';

class MyApp extends LitElement {
  static styles = css`
    .validity-styles sl-input,
    .validity-styles sl-select,
    .validity-styles sl-checkbox {
      display: block;
      margin-bottom: var(--sl-spacing-medium);
    }

    /* user invalid styles */
    .validity-styles sl-input[data-user-invalid]::part(base),
    .validity-styles sl-select[data-user-invalid]::part(combobox),
    .validity-styles sl-checkbox[data-user-invalid]::part(control) {
      border-color: var(--sl-color-danger-600);
    }

    .validity-styles [data-user-invalid]::part(form-control-label),
    .validity-styles [data-user-invalid]::part(form-control-help-text),
    .validity-styles sl-checkbox[data-user-invalid]::part(label) {
      color: var(--sl-color-danger-700);
    }

    .validity-styles sl-checkbox[data-user-invalid]::part(control) {
      outline: none;
    }

    .validity-styles sl-input:focus-within[data-user-invalid]::part(base),
    .validity-styles sl-select:focus-within[data-user-invalid]::part(combobox),
    .validity-styles
      sl-checkbox:focus-within[data-user-invalid]::part(control) {
      border-color: var(--sl-color-danger-600);
      box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-400);
    }

    /* User valid styles */
    .validity-styles sl-input[data-user-valid]::part(base),
    .validity-styles sl-select[data-user-valid]::part(combobox),
    .validity-styles sl-checkbox[data-user-valid]::part(control) {
      border-color: var(--sl-color-success-600);
    }

    .validity-styles [data-user-valid]::part(form-control-label),
    .validity-styles [data-user-valid]::part(form-control-help-text),
    .validity-styles sl-checkbox[data-user-valid]::part(label) {
      color: var(--sl-color-success-700);
    }

    .validity-styles sl-checkbox[data-user-valid]::part(control) {
      background-color: var(--sl-color-success-600);
      outline: none;
    }

    .validity-styles sl-input:focus-within[data-user-valid]::part(base),
    .validity-styles sl-select:focus-within[data-user-valid]::part(combobox),
    .validity-styles sl-checkbox:focus-within[data-user-valid]::part(control) {
      border-color: var(--sl-color-success-600);
      box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
    }
    /* Add your custom styles here */
    .error {
      color: red;
    }
    sl-input {
      width: 300px;
    }
    .u1 {
      display: flex;
    }
    .img {
      margin-top: 20px;
    }
    #p1 {
      margin-top: 100px;
    }

    .validity-styles {
      margin-left: 50px;
      line-height: 20px;
    }
    .login {
      display: flex;
      justify-content: space-between;
    }
    .login2 {
      margin-top: 20px;
      margin-right: 30px;
    }
  `;

  static properties = {
  
    isRegister: { type: Boolean },
    isForgotPassword: { type: Boolean },
    isPremiumEnabled: { type: Boolean },
    username: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    errorMessage: { type: String },
    successMessage: { type: String },
    users: { type: Array },
    currentUser: { type: Object },
    usernameError: { type: String },
    passwordError: { type: String },
    isAdminLoggedIn: { type: Boolean },
  };

  constructor() {
    super();
    
    this.isRegister = true;
    this.isForgotPassword = false;
    this.isPremiumEnabled = false; // New property to track premium status
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.successMessage = "";
    this.usernameError = "";
    this.passwordError = "";
    this.users = this.getStoredUsers() || [];
    this.currentUser = null;
    this.isAdminLoggedIn = false; // New property to track admin login status
  }

  render() {
    return html`
      <div>
        <div id="all-f">
          ${this.isRegister
            ? html`
                <div class="u1">
                  <div class="img">
                    <img src="u2.gif" width="700px" alt="" />
                  </div>
                  <form
                    @submit=${this.handleRegister}
                    class="validity-styles"
                    id="p1"
                  >
                    <h2>Register</h2>
                    <sl-input
                      type="text"
                      pill
                      placeholder="Username"
                      .value=${this.username}
                      required
                      @input=${this.updateUsername}
                    >
                      <sl-icon name="person-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.usernameError}</span>
                    <br />
                    <sl-input
                      type="password"
                      pill
                      password-toggle
                      placeholder="Password"
                      .value=${this.password}
                      required
                      help-text="Ex- Abcd@123"
                      @input=${this.updatePassword}
                      ><sl-icon name="lock-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.passwordError}</span>
                    <br />
                    <sl-input
                      type="password"
                      pill
                      password-toggle
                      placeholder="Confirm Password"
                      .value=${this.confirmPassword}
                      required
                      @input=${this.updateConfirmPassword}
                      ><sl-icon name="lock-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.passwordError}</span>

                    <br />
                    <sl-button pill variant="primary" type="submit"
                      >Register</sl-button
                    >
                    <sl-button
                      pill
                      variant="primary"
                      outline
                      @click=${this.toggleLogin}
                      >Login</sl-button
                    >
                  </form>
                </div>
              `
            : this.isForgotPassword
            ? html`
                <div class="u1">
                  <div class="img">
                    <img src="u2.gif" width="700px" alt="" />
                  </div>
                  <form
                    @submit=${this.handleForgotPassword}
                    class="validity-styles"
                    id="p1"
                  >
                    <h2>Forgot Password</h2>
                    <sl-input
                      pill
                      type="text"
                      placeholder="Username"
                      required
                      .value=${this.username}
                      @input=${this.updateUsername}
                      ><sl-icon name="person-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.usernameError}</span>

                    <br />
                    <sl-input
                      pill
                      type="password"
                      placeholder="New Password"
                      password-toggle
                      .value=${this.password}
                      required
                      @input=${this.updatePassword}
                      ><sl-icon name="shield-lock-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.passwordError}</span>

                    <br />
                    <sl-input
                      pill
                      type="password"
                      password-toggle
                      required
                      placeholder="Confirm New Password"
                      .value=${this.confirmPassword}
                      @input=${this.updateConfirmPassword}
                      ><sl-icon name="shield-lock-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.passwordError}</span>
                    <span class="error">${this.errorMessage}</span>
                    <br />
                    <sl-button pill variant="danger" type="submit"
                      >Change Password</sl-button
                    >
                    <sl-button
                      pill
                      variant="primary"
                      outline
                      @click=${this.toggleLogin}
                      >Back to Login</sl-button
                    >
                  </form>
                </div>
              `
            : this.currentUser
            ? html`
                <div class="login">
                  <div class="login1">
                    <h2>Welcome, ${this.currentUser.username}!</h2>
                  </div>

                  <div class="login2">
                    <sl-tooltip content="Settings">
                      <sl-icon-button style="font-size: 1.5rem;"
                        @click=${this.openDialog}
                        name="gear"
                        label="Settings"
                      ></sl-icon-button>
                    </sl-tooltip>
                    <sl-dialog id="dialog" label="Update User Id And Password">
                      <form
                        @submit=${this.handleUpdateUser}
                        class="validity-styles"
                      >
                        <sl-input
                          type="text"
                          pill
                          required
                          placeholder="New Username"
                          .value=${this.username}
                          @input=${this.updateUsername}
                          ><sl-icon name="person-fill" slot="prefix"></sl-icon
                        ></sl-input>

                        <sl-input
                          type="password"
                          password-toggle
                          pill
                          required
                          placeholder="New Password"
                          .value=${this.password}
                          @input=${this.updatePassword}
                          ><sl-icon
                            name="shield-lock-fill"
                            slot="prefix"
                          ></sl-icon
                        ></sl-input>

                        <sl-button pill variant="primary" outline type="submit"
                          >Update</sl-button
                        >
                        <p>${this.errorMessage}</p>
                        <p>${this.successMessage}</p>
                      </form>
                      <sl-button
                        slot="footer"
                        variant="primary"
                        @click=${this.closeDialog}
                        >Close</sl-button
                      >
                    </sl-dialog>
                      <sl-tooltip content="Log Out">
                      <sl-icon-button @click=${this.handleLogout} style="font-size: 1.5rem;" name="box-arrow-right" label="Log Out"></sl-icon-button>
                      </sl-tooltip>
                  </div>
                </div>

                
                ${this.currentUser.isPremium
                  ? html`
                      <u-2></u-2>
                    `
                  : html`
                      <u-4></u-4>
                    `}
              `
            : html`
                <div class="u1">
                  <div class="img">
                    <img src="u2.gif" width="700px" alt="" />
                  </div>
                  <form
                    @submit=${this.handleLogin}
                    class="validity-styles"
                    id="p1"
                  >
                    <h2>Login</h2>
                    <sl-input
                      pill
                      type="text"
                      required
                      placeholder="Username"
                      .value=${this.username}
                      @input=${this.updateUsername}
                      ><sl-icon name="person-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.usernameError}</span>
                    <span class="error">${this.errorMessage}</span>
                    <br />

                    <sl-input
                      pill
                      type="password"
                      required
                      password-toggle
                      placeholder="Password"
                      .value=${this.password}
                      @input=${this.updatePassword}
                      ><sl-icon name="key-fill" slot="prefix"></sl-icon
                    ></sl-input>
                    <span class="error">${this.passwordError}</span>
                    <span class="error">${this.errorMessage}</span>

                    <br />
                    <sl-button pill variant="primary" type="submit"
                      >Login</sl-button
                    >
                    <sl-button
                      pill
                      variant="primary"
                      outline
                      @click=${this.toggleRegister}
                      >Register</sl-button
                    ><br />
                    <sl-button
                      
                      variant="text"
                      @click=${this.toggleForgotPassword}
                      >Forgot Password?</sl-button
                    >
                  </form>
                </div>
              `}
        </div>
      </div>
    `;
  }

  openDialog() {
    const dialog = this.shadowRoot.getElementById("dialog");
    dialog.show();
  }

  closeDialog() {
    const dialog = this.shadowRoot.getElementById("dialog");
    dialog.hide();
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updateConfirmPassword(e) {
    this.confirmPassword = e.target.value;
  }

  handleRegister(e) {
    e.preventDefault();

    // Validate username and password
    if (!this.username || this.username.length >= 10) {
      this.usernameError = "Invalid username.";
    } else if (this.isUsernameTaken(this.username)) {
      this.usernameError = "Username already exists.";
    } else {
      this.usernameError = "";
    }

    if (!this.password) {
      this.passwordError = "Password is required.";
    } else if (
      this.password !== this.confirmPassword ||
      !this.isPasswordValid()
    ) {
      this.passwordError = "Passwords do not match or invalid password.";
    } else {
      this.passwordError = "";
    }

    // Only proceed with registration if there are no errors
    if (!this.usernameError && !this.passwordError) {
      // Registration logic
      // Save user data to local storage or perform API call
      this.users.push({ username: this.username, password: this.password });
      this.storeUsers();
      this.errorMessage = "";
      this.successMessage = "Registration successful!";
      this.toggleLogin();

      // Show alert message
      alert("Registration successful!");
    }
  }

  isUsernameTaken(username) {
    // Check if the username already exists in the user database
    return this.users.some((user) => user.username === username);
  }

  handleForgotPassword(e) {
    e.preventDefault();
    if (!this.username || this.username.length >= 10) {
      this.usernameError = "Invalid username.";
    } else if (this.isUsernameTaken(this.username)) {
      this.usernameError = "Username already exists.";
    } else {
      this.usernameError = "";
    }

    if (!this.password) {
      this.passwordError = "Password is required.";
    } else if (
      this.password !== this.confirmPassword ||
      !this.isPasswordValid()
    ) {
      this.passwordError = "Passwords do not match or invalid password.";
    } else {
      this.passwordError = "";
    }

    // If there are no errors, proceed with the forgot password logic
    if (!this.usernameError && !this.passwordError) {
      const user = this.users.find((user) => user.username === this.username);
      if (user) {
        user.password = this.password;
        this.storeUsers();
        this.errorMessage = "";
        this.successMessage = "Password changed successfully!";
        this.toggleLogin();
      } else {
        this.errorMessage = "User not found.";
        this.successMessage = "";
      }
    }
  }

  handleUpdateUser(e) {
    e.preventDefault();
    if (!this.username && !this.password) {
      this.errorMessage = "Nothing to update.";
      this.successMessage = "";
    } else if (this.username && this.username.length >= 10) {
      this.errorMessage = "Invalid username.";
      this.successMessage = "";
    } else if (this.password && !this.isPasswordValid()) {
      this.errorMessage = "Invalid password.";
      this.successMessage = "";
    } else {
      // Check for duplicate username
      const existingUser = this.users.find(
        (user) => user.username === this.username && user !== this.currentUser
      );
      if (existingUser) {
        this.errorMessage = "Username already exists.";
        this.successMessage = "";
      } else {
        // Update user information logic
        // Update user data in local storage or perform API call
        if (this.username) {
          this.currentUser.username = this.username;
        }
        if (this.password) {
          this.currentUser.password = this.password;
        }
        this.storeUsers();
        this.errorMessage = "";
        this.successMessage = "User information updated!";
      }
    }
  }

  handleLogin(e) {
    e.preventDefault();

    if (!this.username) {
      this.usernameError = "Username can't be empty.";
    } else if (!this.password) {
      this.passwordError = "Password can't be empty.";
    } else if (!this.isPasswordValid()) {
      this.passwordError = "Invalid password.";
    } else {
      // Login logic
      // Validate credentials against local storage or perform API call
      const user = this.users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );

      if (user) {
        this.currentUser = user;
        this.errorMessage = "";
        this.successMessage = "Successfully logged in.";
        // Additional logic or actions after successful login
      } else {
        this.errorMessage = "Invalid username or password.";
        this.successMessage = "";
      }
    }
  }

  handleLogout() {
    this.currentUser = null;
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.successMessage = "";
    window.location.reload();
  }

  toggleRegister() {
    this.isRegister = !this.isRegister;
    this.isForgotPassword = false;
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.successMessage = "";
  }

  toggleLogin() {
    this.isRegister = false;
    this.isForgotPassword = false;
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.successMessage = "";
  }

  toggleForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
    this.isRegister = false;
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.errorMessage = "";
    this.successMessage = "";
  }

  getStoredUsers() {
    const usersData = localStorage.getItem("users");
    return usersData ? JSON.parse(usersData) : [];
  }

  storeUsers() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  isPasswordValid() {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(this.password);
  }
}

customElements.define("u-1", MyApp);


import { OmniElement, OmniStyleElement, css, html } from "omni-ui";

OmniElement.register();
OmniStyleElement.register();

export default class LogIn extends OmniElement {
  static get properties() {
    return {
      username: { type: String },
      password: { type: String },
      rePassword: { type: String },
      usernameError: { type: String },
      passwordError: { type: String },
      rePasswordError: { type: String }
    };
  }

  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.rePassword = '';
    this.usernameError = '';
    this.passwordError = '';
    this.rePasswordError = '';
  }

  static get styles() {
    return [
      super.styles,
      css`
        .error-border {
          border-color: red;
        }
      `,
    ];
  }

  handleUsernameChange(e) {
    this.username = e.target.value.trim();
    if (!this.username) {
      this.usernameError = "Username is required";
    } else {
      // Check for duplicate username
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const isDuplicate = existingUsers.some(user => user.username === this.username);
      this.usernameError = isDuplicate ? "Username already exists" : "";
    }
    this.requestUpdate();
  }

  handlePasswordChange(e) {
    this.password = e.target.value.trim();
    if (this.password.length < 5) {
      this.passwordError = "Password must be at least 5 characters long";
    } else {
      this.passwordError = "";
    }
    this.requestUpdate();
  }

  handleRePasswordChange(e) {
    this.rePassword = e.target.value.trim();
    if (this.rePassword !== this.password) {
      this.rePasswordError = "Passwords do not match";
    } else {
      this.rePasswordError = "";
    }
    this.requestUpdate();
  }

  doSignUp() {
    // Perform other validations if needed
    if (this.passwordError || this.rePasswordError || this.usernameError) {
      alert("Please fix the errors before signing up");
      return;
    }

    const user = {
      username: this.username,
      password: this.password
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    this.username = '';
    this.password = '';
    this.rePassword = '';

    alert("Sign up successful!");
  }

  toggleSignIn() {
    const signupForm = this.shadowRoot.getElementById('signup-form');
    const signinForm = this.shadowRoot.getElementById('signin-form');
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
  }

  toggleSignUp() {
    const signupForm = this.shadowRoot.getElementById('signup-form');
    const signinForm = this.shadowRoot.getElementById('signin-form');
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
  }

  render() {
    return html`
      <omni-style>
        <div class="columns is-centered is-vcentered" style="height:100vh">
          <div class="column is-narrow">
            <div class="box has-text-centered">
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="${this.usernameError ? "input error-border" : "input"}"
                    type="text"
                    placeholder="Username"
                    value="${this.username}"
                    @input="${(e) => this.handleUsernameChange(e)}"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
                ${this.usernameError
                  ? html`
                      <div class="is-flex">
                        <omni-icon
                          class="mt-2 ml-2"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6">${this.usernameError}</span>
                      </div>`
                  : ""}
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="${this.passwordError ? "input error-border" : "input"}"
                    type="password"
                    placeholder="Password"
                    value="${this.password}"
                    @input="${(e) => this.handlePasswordChange(e)}"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                ${this.passwordError
                  ? html`
                      <div class="is-flex">
                        <omni-icon
                          class="mt-2 ml-2"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6">${this.passwordError}</span>
                      </div>`
                  : ""}
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="${this.rePasswordError ? "input error-border" : "input"}"
                    type="password"
                    placeholder="Re-enter Password"
                    value="${this.rePassword}"
                    @input="${(e) => this.handleRePasswordChange(e)}"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                ${this.rePasswordError
                  ? html`
                      <div class="is-flex">
                        <omni-icon
                          class="mt-2 ml-2"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6">${this.rePasswordError}</span>
                      </div>`
                  : ""}
              </div>
              <button
                class="button is-link"
                @click=${this.doSignUp}
              >
                Sign Up
              </button>
              <br>
            <button
              id="signin-button"
              class="button is-text"
              @click=${this.toggleSignIn}
            >
              Sign In
            </button>
            </div>
            <div class="box has-text-centered" id="signin-form" style="display: none;">
            <!-- Sign-in form -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  id="signin-username"
                  class="input"
                  name="signin-username"
                  type="text"
                  placeholder="Username"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  id="signin-password"
                  class="input"
                  name="signin-password"
                  type="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <button
              id="signin-submit"
              class="button is-link"
              @click=${this.doSignIn}
            >
              Sign In
            </button>
            <br>
            <button
              id="signup-button"
              class="button is-text"
              @click=${this.toggleSignUp}
            >
              Sign Up
            </button>
          </div>
          </div>
        </div>
      </omni-style>
    `;
  }
}

customElements.define("log-in", LogIn);
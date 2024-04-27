import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "../navbar/admin-nav-bar.js";
import "../navbar/user-nav-bar.js";
import "../navbar/user-nav-bar1.js";
import "../navbar/test-test-user-nav.js";
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
      rePasswordError: { type: String },
      showSuccessMessage: { type: Boolean },
      showloginErrorMessage: { type: Boolean },
      openNav: { type: Boolean },
      userRole: { type: Array },
      isSwitchOn: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.password = "";
    this.rePassword = "";
    this.usernameError = "";
    this.passwordError = "";
    this.rePasswordError = "";
    this.showSuccessMessage = false;
    this.openNav = false;
    this.userRole = [];
    this.isSwitchOn = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
      .omni {
        background-color: #80b0ff;
        overflow: hidden !important; 
    }
        
        .error-border {
          border: 1px solid var(--color-melon) !important;
        }
        .pd-7 {
          padding: 64px !important;
          border-radius: 20px;
          height: 400px !important;
          width: 400px !important;
        }
        .wt-1 {
          width: 550px !important;
        }
        omni-switch {
          margin-bottom: 1.5rem;
        }
        omni-tile {
          height: 250px;
          margin: 0 25px;
          width: 100%;
        }
        omni-loading-indicator::part(svg) {
          /* apply styles to the loading graphic */
        }
        omni-loading-indicator::part(info) {
          /* apply styles to the informative text */
        }
      `,
    ];
  }

  doSignIn() {
    // Get input values
    const usernameInput = this.shadowRoot.getElementById("signin-username");
    const passwordInput = this.shadowRoot.getElementById("signin-password");
    const inputUsername = usernameInput.value.trim();
    const inputPassword = passwordInput.value.trim();
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    const matchedUser = users.find(
      (user) =>
        (user.user_login_details.username === inputUsername ||
          user.user_login_details.officeEmail === inputPassword) &&
        user.user_login_details.password === inputPassword
    );
    if (matchedUser) {
      this.openSuccesstoast();
      this.userRole = matchedUser.user_login_details.role || [];
      // this.loggedInUserName = matchedUser.personal_details.first_name;
      this.loggedInUserName =
        matchedUser.personal_details.first_name +
        " " +
        matchedUser.personal_details.last_name;

      this.loggedInUserdata = matchedUser;
    } else {
      this.openErrortoast();
    }
    usernameInput.value = "";
    passwordInput.value = "";
  }

  handlelogUsernameChange(e) {
    this.username = e.target.value.trim();
    if (!this.username) {
      this.logusernameError = "Username is required";
    } else {
      this.logusernameError = "";
    }
    this.requestUpdate();
  }

  handlelogPasswordChange(e) {
    this.password = e.target.value.trim();
    if (!this.password) {
      this.logpasswordError = "Password is required";
    } else {
      this.logpasswordError = "";
    }
    this.requestUpdate();
  }

  resetSignInForm() {
    const usernameInput = this.shadowRoot.getElementById("signin-username");
    const passwordInput = this.shadowRoot.getElementById("signin-password");
    usernameInput.value = "";
    passwordInput.value = "";
    this.logusernameError = "";
    this.logpasswordError = "";
  }
  _onSwitchChange(e) {
    this.isSwitchOn = e.detail.checked;
  }
  openErrortoast() {
    const toast = this.shadowRoot.querySelector("#toast");
    toast.openModal();
  }
  openSuccesstoast() {
    const toast = this.shadowRoot.querySelector("#toast-success");
    this.isSwitchOn = true;
    toast.openModal();
    setTimeout(() => {
      this.openNav = true;
      this.isSwitchOn = false;
    }, 3000);
  }
  renderlogin() {
    return html`
      <omni-style>
        <div class="columns is-centered is-vcentered" style="height:103vh;">
          <div class="column is-narrow">
            <div class="box has-text-centered pd-7">
              

              ${this.isSwitchOn
                ? html` <omni-loading-indicator altText="Sample Example Text">
                    <p>Please wait while the content loads.</p>
                  </omni-loading-indicator>`
                : ""}
              ${!this.isSwitchOn
                ? html` 
                <header class="title">
                <p class="title is-1">User Management System</p>
              </header>
                <div class="field pt-4">
                      <p class="control has-icons-left">
                        <input
                          id="signin-username"
                          class="${this.logusernameError
                            ? "input error-border"
                            : "input"}"
                          name="signin-username"
                          type="text"
                          placeholder="Username"
                          @input="${(e) => this.handlelogUsernameChange(e)}"
                        />
                        <span class="icon is-small is-left">
                          <omni-icon
                            class="is-size-1"
                            style="fill:var(--color-shark)"
                            icon-id="omni:informative:user"
                          ></omni-icon>
                        </span>
                      </p>
                      ${this.logusernameError
                        ? html` <div class="is-flex">
                            <omni-icon
                              class="mt-2 ml-2"
                              icon-id="omni:informative:error"
                              aria-label="icon"
                              role="img"
                            ></omni-icon>
                            <span class="pt-2 pl-1 has-text-grey is-size-6"
                              >${this.logusernameError}</span
                            >
                          </div>`
                        : ""}
                    </div>
                    <div class="field pt-3">
                      <p class="control has-icons-left">
                        <input
                          id="signin-password"
                          class="${this.logpasswordError
                            ? "input error-border"
                            : "input"}"
                          name="signin-password"
                          type="password"
                          placeholder="Password"
                          @input="${(e) => this.handlelogPasswordChange(e)}"
                        />
                        <span class="icon is-small is-left">
                          <omni-icon
                            class="is-size-1"
                            style="fill:var(--color-shark)"
                            icon-id="omni:interactive:lock"
                          ></omni-icon>
                        </span>
                      </p>
                      ${this.logpasswordError
                        ? html` <div class="is-flex">
                            <omni-icon
                              class="mt-2 ml-2"
                              icon-id="omni:informative:error"
                              aria-label="icon"
                              role="img"
                            ></omni-icon>
                            <span class="pt-2 pl-1 has-text-grey is-size-6"
                              >${this.logpasswordError}</span
                            >
                          </div>`
                        : ""}
                    </div>
                    <div class="pt-5">
                      <button
                        id="signin-submit"
                        class="button is-link"
                        @click=${this.doSignIn}
                      >
                        LogIn
                      </button>
                    </div>`
                : ""}
            </div>
          </div>
        </div>
      </omni-style>
    `;
  }

  rendernav() {
    if (this.userRole.includes("Admin")) {
      return html`<admin-nav-bar
        .userName=${this.loggedInUserName}
      ></admin-nav-bar>`;
    } else if (this.userRole.includes("User")) {
      return html`<user-nav-bar1
        .userData=${this.loggedInUserdata}
      ></user-nav-bar1>`;
    } else {
      return html``;
    }
  }

  render() {
    console.log("render:", this.openNav);
    return html`
      <omni-style>
        ${!this.openNav ? this.renderlogin() : ""}
        ${this.openNav ? this.rendernav() : ""}
        <omni-dialog
          id="toast"
          modalType="toast"
          modalStyle="error"
          toastTimeOut="5000"
        >
          <p slot="content">
            Invalid username or password. Please check your credentials and try
            again.
          </p>
        </omni-dialog>
        <omni-dialog
          id="toast-success"
          modalType="toast"
          modalStyle="success"
          toastTimeOut="3000"
        >
          <p slot="content">Welcome back! You have successfully logged in.</p>
        </omni-dialog>
      </omni-style>
    `;
  }
}
customElements.define("test-login", LogIn);

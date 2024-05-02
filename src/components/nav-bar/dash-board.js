import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import "../home/home-tab.js";
import "../home/user-nav-bar.js";
import { Router } from "@vaadin/router";
OmniElement.register();
OmniStyleElement.register();

export default class Dashboard extends OmniElement {
  static get styles() {
    return css`
       
        .hg{
            height: 38rem;

        }
    
        }
        `;
  }

  static get properties() {
    return {
        userData: { type: Array },
        activeUsers: { type: Number },
        inactiveUsers: { type: Number },
        userCount: { type: Number },
        adminCount: { type: Number },
        maleCount: { type: Number },
        femaleCount: { type: Number }
    };
  }

  constructor() {
    super();
    this.userData = [];
    this.activeUsers = 0;
    this.inactiveUsers = 0;
    this.userCount = 0;
    this.adminCount = 0;
    this.maleCount = 0;
    this.femaleCount = 0;
  }

connectedCallback() {
    super.connectedCallback();
    this.updateData();
  }

  updateData() {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.userCount = this.userData.length;
      this.activeUsers = this.userData.filter(user => user.user_login_details.active).length;
      this.inactiveUsers = this.userCount - this.activeUsers;
      this.adminCount = this.userData.filter(user => user.user_login_details.role[0] === "Admin").length;
      this.maleCount = this.userData.filter(user => user.personal_details.gender === "Male").length;
      this.femaleCount = this.userData.filter(user => user.personal_details.gender === "Female").length;
    }
  }

  renderData() {
    return html`
        <div class="container pt-6 hg">
            
            <div class="columns is-centered">
              <div class="column is-one-quarter">
                <div class="notification is-primary">
                  <p class="title">${this.userCount}</p>
                  <p class="subtitle">Total Users</p>
                </div>
              </div>
              <div class="column is-one-quarter">
                <div class="notification is-info">
                  <p class="title">${this.adminCount}</p>
                  <p class="subtitle">Admins</p>
                </div>
              </div>
              <div class="column is-one-quarter">
                <div class="notification is-success">
                  <p class="title">${this.activeUsers}</p>
                  <p class="subtitle">Active Users</p>
                </div>
              </div>
              <div class="column is-one-quarter">
                <div class="notification is-danger">
                  <p class="title">${this.inactiveUsers}</p>
                  <p class="subtitle">Inactive Users</p>
                </div>
              </div>
            </div>
            <div class="columns is-centered">
          <div class="column is-one-half">
            <div class="notification is-warning">
              <p class="title">${this.maleCount}</p>
              <p class="subtitle">Male Users</p>
            </div>
          </div>
          <div class="column is-one-half">
            <div class="notification is-link">
              <p class="title">${this.femaleCount}</p>
              <p class="subtitle">Female Users</p>
            </div>
          </div>
        </div>


      </div>
          </div>
        
        `;
  }

  render() {
    return html`
      <omni-style>
        <div class="card m-5">
          <header class="card-header">
            <div class="card-header-title">
              <div
                class="is-flex is-justify-content-space-between"
                style="width:100%;"
              >
                <div
                  class="is-flex is-justify-content-flex-start is-align-items-center"
                >
                  <h3
                    slot="start"
                    class="title is-3 has-text-weight-normal is-block"
                  >
                    Dashboard
                  </h3>
                </div>
                <div slot="center-end" class="pr-4 is-flex"></div>
              </div>
            </div>
          </header>
          <div
            class="card-content pb-1 pt-1 pl-0 pr-0"
            style="background-color: rgb(245, 248, 251) !important;"
          >
            ${this.renderData()}
          </div>
        </div>
      </omni-style>
    `;
  }
}
customElements.define("dash-board", Dashboard);

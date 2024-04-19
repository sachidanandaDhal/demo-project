import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";

OmniElement.register();
OmniStyleElement.register();
export default class UserData extends OmniElement {
  static get styles() {
    return css`
    .header-seperator {
        border-bottom: 1px solid rgb(241, 245, 250) !important;
        height: 50px;
      }`;
  }
  static get properties() {
    return {
      userData: { type: Object }, 
    };
  }

  constructor() {
    super();

    this.userData = {}; 
  }

  closeUserData() {
    this.dispatchEvent(new CustomEvent("close-user-data"));
  }
  render() {
    return html`
    <omni-style>
        <div class="modal is-active">
        <div class="modal-background"></div>
            <div class="modal-card ">
                <header class="modal-card-head header-seperator">
                <p class="modal-card-title">User Details</p>
                </header>
                <section class="modal-card-body">
                    <table class="table table is-hoverable is-fullwidth is-size-5 col-spacing ">
                        <tbody>
                        <tr>
                            <th class="is-uppercase is-size-6"> Name</th>
                            <td class="is-uppercase is-size-6">${this.userData.personal_details.first_name} ${this.userData.personal_details.last_name}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6">Gender</th>
                            <td>${this.userData.personal_details.gender}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6"> Employee ID</th>
                            <td>${this.userData.empId}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6"> Birth Date</th>
                            <td>${this.userData.personal_details.dob}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6">Phone Number</th>
                            <td>${this.userData.contact_details.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6"> Personal Email</th>
                            <td>${this.userData.personalEmail}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6">Office Email</th>
                            <td>${this.userData.officeEmail}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6">State</th>
                            <td>${this.userData.selectedState}</td>
                        </tr>
                        <tr>
                            <th class="is-uppercase is-size-6">District </th>
                            <td>${this.userData.selectedDistrict}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="buttons are-medium is-right pt-5 pr-4">
                        <button class="button is-size-5 is-link"  @click="${this.closeUserData}">Close</button>
                    </div>
                </section>
            </div>
        </div>
    </omni-style>
    `;
  }
}

customElements.define("user-data", UserData);

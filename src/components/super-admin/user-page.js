import { OmniStyleElement, html, css } from 'omni-ui';

export default class UserPage extends OmniStyleElement {
  static get styles() {
    return [
      super.styles,
      css`
        omni-table::part(table-body-cell) {
          transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
        }
        omni-table::part(table-header-actions) {
          padding-left: 60px !important;
        }
      `,
    ];
  }

  static get properties() {
    return {
      selectedUser: { type: Object },
      editdUser: { type: Object },
      users: { type: Array },
      columns: { type: Array },
      data: { type: Array },
      isSwitchOn: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.users = JSON.parse(localStorage.getItem("userData")) || [];
    this.columns = [
      { label: "User Name", key: "username", isSortable: true },
      { label: "Name", key: "fullName", isSortable: true },
      // { label: "Contact Number", key: "phoneNumber", isSortable: true },
      { label: "Gender", key: "gender", isSortable: true },
      // { label: "Personal Email", key: "personalEmail", isSortable: false },
      
      { label: "Join Date", key: "joinDate" },
      { label: "Role", key: "role", isSortable: false },
      { label: "Status", key: "status" },
      { label: "Actions", key: "actions" },
    ];
    this.refreshData();
  }

  refreshData() {
    this.data = this.users.map((user) => ({
      id: user.id,
      username: `${user.user_login_details.username}`,
      fullName: `${user.personal_details.first_name} ${user.personal_details.last_name}`,
      phoneNumber: `${user.contact_details.phoneNumber}`,
      gender: `${user.personal_details.gender}`,
      personalEmail: `${user.contact_details.personalEmail}`,
      role: `${user.user_login_details.role}`,
      // status: user.user_login_details.active ? "Active" : "Inactive",
      joinDate: `${user.modified_on}`,

      status: html`
        ${user.user_login_details.active
          ? html`
              <omni-switch
              .checked=${this.isSwitchOn}
              @change=${this.__onSwitchChange}
              >
              <span>${user.user_login_details.active ? "Active" : "Inactive"}</span>
              </omni-switch>
            `
          : user.user_login_details.active
          ? "Active"
          : "Inactive"}
      `,

      actions: html`
        <omni-style>
          <td part="table-body-cell">
            <omni-tooltip>
              <button
                class="button is-size-5 is-text"
                @click="${() => this.deleteUser(user)}"
              >
                <omni-icon
                  class="is-size-2"
                  icon-id="omni:interactive:delete"
                ></omni-icon>
              </button>
              <div slot="content">Delete</div>
            </omni-tooltip>
            <omni-tooltip>
              <button
                class="button is-size-5 is-text"
                @click="${() => this.viewUser(user)}"
              >
                <omni-icon
                  class="is-size-2"
                  icon-id="omni:interactive:launch"
                ></omni-icon>
              </button>
              <div slot="content">View Data</div>
            </omni-tooltip>
            <omni-tooltip>
              <button
                class="button is-size-5 is-text"
                @click="${() => this.editUser(user)}"
              >
                <omni-icon
                  class="is-size-2 "
                  icon-id="omni:interactive:edit"
                ></omni-icon>
              </button>
              <div slot="content">Edit Data</div>
            </omni-tooltip>
          </td>
        </omni-style>
      `,
    }));
  }
  deleteUser(user) {
    this.openOmniDialogElModal();
    this.userToDelete = user;
  }
  openOmniDialogElModal(){
    const modal = this.shadowRoot.querySelector('#modal');
    modal.openModal();
  }
  // __onSwitchChange(user) {
  //   if (!user.user_login_details.active) {
  //     // If the user is being activated, deactivate all other active users
  //     this.users.forEach(u => {
  //       if (u.id !== user.id && u.user_login_details.active) {
  //         u.user_login_details.active = false;
  //       }
  //     });
  //   }
  //   // Toggle the active status of the current user
  //   user.user_login_details.active = !user.user_login_details.active;
  //   localStorage.setItem("userData", JSON.stringify(this.users)); // Update local storage
  //   this.refreshData(); // Refresh data
  // }
  __onSwitchChange(e) {
    this.isSwitchOn = e.detail.checked;
    console.log('<omni-switch> change fired', e.detail);
  }
  
  
  onSubmit() {
    const modal = this.shadowRoot.querySelector('#modal');
    modal.closeModal();
    // Delete the user
    if (this.userToDelete) {
      const index = this.users.findIndex(u => u.id === this.userToDelete.id);
      if (index !== -1) {
        this.users.splice(index, 1);
        localStorage.setItem("userData", JSON.stringify(this.users));
        this.refreshData();
        this.requestUpdate();
      }
      this.userToDelete = null; // Reset the userToDelete property
    }
  }
  
  viewUser(user) {
    this.selectedUser = user;
    Router.go(`/admin-home/view?userId=${user.id}`);
  }

  closeUserData() {
    this.selectedUser = null; 
  }

  editUser(user) {
    this.editdUser = user;
    Router.go(`/admin-home/edit?userId=${user.id}`);
  }

  closeEditUser() {
    this.editdUser = null; 
    this.refreshData();
    this.requestUpdate();
  }

  render() {
    return html`
      <omni-style>
        <omni-table
          .columns="${this.columns}"
          .data="${this.data}"
          @sort="${(e) => this.sortData(e.detail.key)}"
        ></omni-table>
        <omni-dialog
        id="modal"
        modalType="modal"
        modalStyle="alert"
        modalTitle="Delete User Confirmation">
        <p slot="content">Are you sure you want to delete this user?</p>
        <button
          class="button is-outlined is-medium is-danger"
          slot="button"
          @click=${this.onSubmit}>
          Delete
        </button>
      </omni-dialog>
      </omni-style>
    `;
  }

  sortData(columnKey) {
    const column = this.columns.find(col => col.key === columnKey);
    if (!column || !column.isSortable) return;
    if (this.sort && this.sort.key === columnKey) {
      this.sort.dir = this.sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = { key: columnKey, dir: 'asc' };
    }
    this.data = this.sortDataByKey(this.data, this.sort.key, this.sort.dir);
    this.requestUpdate();
  }
  
  sortDataByKey(data, key, direction) {
    return data.sort((a, b) => {
      const valueA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const valueB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}


customElements.define("user-page", UserPage);
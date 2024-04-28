
import { OmniStyleElement, html, css } from 'omni-ui';
import './user-data.js';
import './edit-user.js'; 
import '../form/user-form.js';
import { Router } from '@vaadin/router';
export default class UserDetails extends OmniStyleElement {
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
      data: { type: Array }
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
      { label: "Status", key: "status" },
      { label: "Join Date", key: "joinDate" },
      { label: "Role", key: "role", isSortable: false },
      { label: "Actions", key: "actions" },
    ];
    this.refreshData();
  }

  refreshData() {
    this.data = this.users.map(user => ({
      id: user.id,
      username: `${user.user_login_details.username}`,
      fullName: `${user.personal_details.first_name} ${user.personal_details.last_name}`,
      phoneNumber: `${user.contact_details.phoneNumber}`,
      gender: `${user.personal_details.gender}`,
      personalEmail: `${user.contact_details.personalEmail}`,
      role: `${user.user_login_details.role}`,
      status: user.user_login_details.active ? "Active" : "Inactive",
      joinDate: `${user.modified_on}`,
      actions: html`
        <omni-style>
          <td part="table-body-cell">
            <omni-tooltip>
              <button class="button is-size-5 is-text" @click="${() => this.deleteUser(user)}">
                <omni-icon class="is-size-2" icon-id="omni:interactive:delete"></omni-icon>
              </button>
              <div slot="content">Delete</div>
            </omni-tooltip>
            <omni-tooltip>
              <button class="button is-size-5 is-text" @click="${() => this.viewUser(user)}">
                <omni-icon class="is-size-2" icon-id="omni:interactive:launch"></omni-icon>
              </button>
              <div slot="content">View Data</div>
            </omni-tooltip>
            <omni-tooltip>
              <button  class="button is-size-5 is-text" @click="${() => this.editUser(user)}">
                <omni-icon class="is-size-2 " icon-id="omni:interactive:edit"></omni-icon>
              </button>
              <div slot="content">Edit Data</div>
            </omni-tooltip>
          </td>
        </omni-style>
      `
    }));
  }

  deleteUser(user) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
      localStorage.setItem("userData", JSON.stringify(this.users));
      this.refreshData();
      this.requestUpdate();
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

customElements.define("user-details", UserDetails);

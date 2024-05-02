import { OmniElement, OmniStyleElement, css, html, nothing } from 'omni-ui';
import { Router } from '@vaadin/router';
OmniElement.register();
OmniStyleElement.register();
export default class Hometab extends (OmniElement) {
  static get styles() {
    return css`
    omni-table::part(table-body-cell) {
      transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    }
    omni-table::part(table-header-actions) {
      padding-left: 60px !important;
    }
    `;
  }
  constructor() {
    super();
    
    this.userData = JSON.parse(localStorage.getItem("currentUser")) || {};
    this.users = JSON.parse(localStorage.getItem("userData")) || [];
    this.columns = [
      { label: "User Name", key: "username", isSortable: true },
      { label: "Full Name", key: "fullName", isSortable: true ,template: (val) => html` <td part="table-body-cell" class="has-text-black">${val}</td> ` },
      // { label: "Gender", key: "gender", isSortable: true },
      { label: "Role", key: "role", isSortable: false },
      { label: "Registered on", key: "joinDate" ,isSortable: true },
      { label: "Modified on", key: "modified_on" ,isSortable: true },
      
      { label: "Status", key: "status",template: (val) => html` <td part="table-body-cell" class="${val === 'Active' ? 'has-text-success' : val === 'Inactive' ? 'has-text-danger' : ''}">${val}</td> ` },
      { label: "Actions", key: "actions" },
    ];
    this.refreshData();
  }

  static get properties() {
    return {
      selectedUser: { type: Object },
      editdUser: { type: Object },
      users: { type: Array },
      columns: { type: Array },
      data: { type: Array },
    };
  }
  refreshData() {
    if (!this.searchTerm) {
      this.data = this.users.map(user => ({
        id: user.id,
        username: `${user.user_login_details?.username || ''}`,
        fullName: `${user.personal_details?.first_name || ''} ${user.personal_details?.last_name || ''}`,
        gender: `${user.personal_details?.gender || ''}`,
        status: `${user.user_login_details.active ? "Active" : "Inactive"|| ''}`,
        role: `${user.user_login_details?.role || ''}`,
        joinDate: `${user.registered_on|| ''}`,
        modified_on : `${user.modified_on|| ''}`,
        actions: this.Actions(user)
      }));
    } else {
      this.data = this.users.filter(user => {
        return (
          (user.user_login_details?.username && user.user_login_details.username.includes(this.searchTerm)) ||
          ((user.personal_details?.first_name || '') + ' ' + (user.personal_details?.last_name || '')).includes(this.searchTerm)
          
        );
      }).map(user => ({
        id: user.id,
        username: `${user.user_login_details?.username || ''}`,
        fullName: `${user.personal_details?.first_name || ''} ${user.personal_details?.last_name || ''}`,
        gender: `${user.personal_details?.gender || ''}`,
        role: `${user.user_login_details?.role || ''}`,
        joinDate: `${user.registered_on|| ''}`,
        modified_on : `${user.modified_on|| ''}`,
        status: `${user.user_login_details?.active ? "Active" : "Inactive"|| ''}`,
        actions: this.Actions(user)
      }));
    }
  }
  
  Actions(user) {
    return html`
        <omni-style>
            <td part="table-body-cell">
                ${this.userData.user_login_details.role.includes("Super Admin")
                ? html` <omni-tooltip>
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
                </omni-tooltip>`
                : this.userData.user_login_details.role.includes("Admin")
                ? html` <omni-tooltip>
                    <button class="button is-size-5 is-text" disabled>
                        <omni-icon
                            class="is-size-2"
                            icon-id="omni:interactive:delete"
                        ></omni-icon>
                    </button>
                    <div slot="content">Delete</div>
                </omni-tooltip>`
                : ""}
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
                    <div slot="content">View User</div>
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
                    <div slot="content">Edit User</div>
                </omni-tooltip>
            </td>
        </omni-style>
    `;
}
deleteUser(user) {
  this.openOmniDialogElModal();
  this.userToDelete = user;
}
openOmniDialogElModal(){
  const modal = this.shadowRoot.querySelector('#modal');
  modal.openModal();
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
  Router.go(`/home/view?userId=${user.id}`);
}

closeUserData() {
  this.selectedUser = null; 
}

editUser(user) {
  this.editdUser = user;
  Router.go(`/home/edit?userId=${user.id}`);
}

closeEditUser() {
  this.editdUser = null; 
  this.refreshData();
  this.requestUpdate();
}


  openUserForm() {
    Router.go('/home/create');
  }
  sortData(columnKey) {
    const column = this.columns.find((col) => col.key === columnKey);
    if (!column || !column.isSortable) return;
    if (this.sort && this.sort.key === columnKey) {
      this.sort.dir = this.sort.dir === "asc" ? "desc" : "asc";
    } else {
      this.sort = { key: columnKey, dir: "asc" };
    }
    this.data = this.sortDataByKey(this.data, this.sort.key, this.sort.dir);
    this.requestUpdate();
  }

  sortDataByKey(data, key, direction) {
    return data.sort((a, b) => {
      const valueA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const valueB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  handleSearchUpdate(event) {
    this.searchTerm = event.target.value;
    this.refreshData();
  }

  renderuserdata() {
    return html`
      <omni-style>
        ${this.data && this.data.length > 0
          ? html` <omni-table
              .columns="${this.columns}"
              .data="${this.data}"
              @sort="${(e) => this.sortData(e.detail.key)}"
            ></omni-table>`
          : html` <p class="is-flex is-justify-content-center py-5">
                    No user data available${this.searchTerm ? " for the current search term" : ""}
                  </p>`}
      </omni-style>
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
    `;
  }
  
  render() {
    return html`
      <omni-style >
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
                  <h3 slot="start" class="title is-3 has-text-weight-normal is-block">
                    Users
                  </h3>
                </div>
                <div slot="center-end" class="pr-4 is-flex">
                <omni-search
                    class="pr-5 pt-1"
                    @search-update="${this.handleSearchUpdate}"
                    slot="end"
                    ph="Search"
                  ></omni-search>
                  <button
                    class="button is-outlined is-medium"
                    @click="${this.openUserForm}"
                  >
                    Create new
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div
            class="card-content pb-1 pt-1 pl-0 pr-0"
            style="background-color: rgb(245, 248, 251) !important;"
          >
          ${this.renderuserdata()}
          </div>
        </div>
      </omni-style>
    `;
  }

  
}

customElements.define('home-tab', Hometab);

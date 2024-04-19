// import { OmniStyleElement, OmniTableElement, html, css } from 'omni-ui';
// import './user-data.js';
// import './edit-user.js'; 
// class UserDetails extends OmniStyleElement {
//   constructor() {
//     super();
//     this.columns = [
//       // {
//       //   label: "ID",
//       //   key: "id", // Assuming your user object has an 'id' property
//       //   isSortable: true,
//       // },
//        {
//         label: "Name",
//         key: "fullName", 
//         isSortable: true,
//       },
//       {
//         label: "Contact Number",
//         key: "phoneNumber",
//         isSortable: true,
//       },
//       {
//         label: "Sex",
//         key: "gender",
//         isSortable: false,
//       },
//       {
//         label: "Office Email",
//         key: "officeEmail",
//         isSortable: false,
//       },
//       {
//         label: "Action",
//         key: "action",
//         isSortable: false,
//         template: (val, index, user) => html`
//           <td part="table-body-cell">
//             <omni-tooltip>
//               <button slot="invoker" @click="${() => this.deleteUser(index)}">
//                 <omni-icon
//                   class="is-size-2"
//                   icon-id="omni:interactive:delete"
//                 ></omni-icon>
//               </button>
//               <div slot="content">Delete</div>
//             </omni-tooltip>
//             <omni-tooltip>
//               <button slot="invoker" @click="${() => this.viewUser(index)}">
//                 <omni-icon
//                   class="is-size-2"
//                   icon-id="omni:interactive:launch"
//                 ></omni-icon>
//               </button>
//               <div slot="content">View Data</div>
//             </omni-tooltip>
//             <omni-tooltip>
//               <button slot="invoker" @click="${() => this.editUser(index)}">
//                 <omni-icon
//                   class="is-size-2"
//                   icon-id="omni:interactive:edit"
//                 ></omni-icon>
//               </button>
//               <div slot="content">Edit Data</div>
//             </omni-tooltip>
//           </td>
//         `,
//       },
//     ];
//     this.data = this.loadUserData();
//     this.selectedUser = null;
//     this.editdUser = null;
   
//   }
//   // loadUserData() {
//   //   try {
//   //     const userData = JSON.parse(localStorage.getItem("userData")) || [];
//   //     return userData;
//   //   } catch (error) {
//   //     console.error("Error loading user data:", error);
//   //     return [];
//   //   }
//   // }
//   loadUserData() {
//     try {
//         const userData = JSON.parse(localStorage.getItem("userData")) || [];
//         return userData.map(user => ({
//             ...user,
//             fullName: `${user.firstName} ${user.lastName}`
//         }));
//     } catch (error) {
//         console.error("Error loading user data:", error);
//         return [];
//     }
// }

  

//   static get styles() {
//     return [
//       super.styles,
//       css`
//         omni-table::part(table-body-cell) {
//           transition: color 0.25s ease-in-out,
//             background-color 0.25s ease-in-out;
//         }
//       `,
//     ];
//   }
//   static properties = {
//     selectedUser: { type: Object },
//     editdUser: { type: Object },
//   };

//   deleteUser(index) {
//     let userData = JSON.parse(localStorage.getItem("userData")) || [];
//     userData.splice(index, 1);
//     localStorage.setItem("userData", JSON.stringify(userData));
//     this.data = userData.map(user => ({
//       ...user,
//       fullName: `${user.firstName} ${user.lastName}`
//   }));
  
//     this.requestUpdate(); 
// }

//   viewUser(index) {
//     this.selectedUser = this.data[index];
//     console.log(this.selectedUser);
//   }
//   closeUserData() {
//     this.selectedUser = null; // Reset selectedUser
//   }
//   editUser(index) {
//     this.editdUser = this.data[index];
//     console.log(this.editdUser);
//   }
//   closeEditUser() {
//     this.editdUser = null; 
//     this.data = this.loadUserData();
   
//   }
//   sortData(columnKey) {
//     const column = this.columns.find(col => col.key === columnKey);
//     if (!column || !column.isSortable) return;
//     if (this.sort && this.sort.key === columnKey) {
//       this.sort.dir = this.sort.dir === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sort = { key: columnKey, dir: 'asc' };
//     }
//     this.data = this.sortDataByKey(this.data, this.sort.key, this.sort.dir);
//     this.requestUpdate();
//   }
  
//   sortDataByKey(data, key, direction) {
//     return data.sort((a, b) => {
//       const valueA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
//       const valueB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
//       if (valueA < valueB) return direction === 'asc' ? -1 : 1;
//       if (valueA > valueB) return direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }
//   handleUpdate = () => {
//     // Find the index of the edited user in dataArray
//     const index = this.dataArray.findIndex(user => user.id === this.editdUser.id);
  
//     if (index !== -1) {
//       this.dataArray[index] = {
//         ...this.editdUser, 
//         firstName: this.firstName,
//         lastName: this.lastName,
//         phoneNumber: this.phoneNumber,
//         empId: this.empId,
//         birthDate: this.birthDate,
//         phoneType: this.phoneType,
//         gender: this.gender,
//         personalEmail: this.personalEmail,
//         officeEmail: this.officeEmail,
//         selectedState: this.selectedState,
//         selectedDistrict: this.selectedDistrict,
//       };
  
//       // Save the updated dataArray to local storage
//       localStorage.setItem("userData", JSON.stringify(this.dataArray));

//       this.showSuccessMessage = true;
//       this.requestUpdate();
//       console.log(this.showSuccessMessage);
//     } else {
//       console.error("User not found in dataArray");
//     }
//   }
  

//   render() {
//     console.log("useralldata:",this.data);
//     return html`
//       <omni-style>
//         <omni-table
//           .columns="${this.columns}"
//           .data="${this.data}"
//           @sort="${(e) => this.sortData(e.detail.key)}"
//         ></omni-table>
//         ${this.selectedUser
//           ? html`<user-data
//               .userData="${this.selectedUser}"
//               @close-user-data="${this.closeUserData}"
//             ></user-data>`
//           : ""}
//           ${this.editdUser
//         ? html`
//             <edit-user
//               .userData="${ this.editdUser }"
//               @close-edit-user="${this.closeEditUser}"
//               @save-edited-data="${this.handleUpdate}"
//             ></edit-user>
//           `
//         : ""}
//       </omni-style>
//     `;
//   }
// }

// customElements.define("user-details", UserDetails);

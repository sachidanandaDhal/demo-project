// import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
// import './nav-bar.js';
// OmniElement.register();
// OmniStyleElement.register();

// export default class NavBar extends OmniElement{
//   static get properties() {
//     return {
//     //   drawerOpen: { type: Boolean },
//     //   endDrawerOpen: { type: Boolean },
//     };
//   }

//   constructor() {
//     super();
//     // this.drawerOpen = false;
//     // this.endDrawerOpen = false;
    
//   }

// //   toggleDrawer() {
// //     this.drawerOpen = !this.drawerOpen;
// //   }

// //   toggleEndDrawer() {
// //     this.endDrawerOpen = !this.endDrawerOpen;
// //   }
 

//   static get styles() {
//     return [
//       super.styles,
//       css`
       
        
//       `,
//     ];
//   }

//   render() {
//     return html`
//       <omni-style>
//       <div class="dropdown is-right is-active">
//           <div class="dropdown-trigger">
//           <!-- <portal-user-button aria-haspopup="menu" class="  "></portal-user-button> -->
//           </div>
//           <div class="dropdown-menu" role="menu">
//             <div class="dropdown-content" tabindex="-1">
//               <div class="dropdown-item">
//                 <figure class="image is-64x64">
//                   <img class="is-rounded" alt="User's profile img" src="static/i/user_account_icon.svg">
//                 </figure>
//                 <div id="user-details">
//                   <p>Sachidananda Dhal</p>
//                   <div id="user-address">
//                     <p>sachidananda.dhal</p>
//                     <p>@annalect.com</p>
//                    <div class="tooltip">sachidananda.dhal@annalect.com</div>
//                   </div>
//                 </div>
//               </div>
//              <div id="profile-actions">
 
//               <omni-tooltip place="top" relateby="label">
//                 <button slot="invoker" class="button is-text" aria-labelledby="_tooltip2_">
//                   <omni-icon icon-id="omni:interactive:edit" aria-label="icon" role="img"></omni-icon>
//                 </button>
//                 <span slot="content" role="tooltip" id="_tooltip2_">Edit Profile</span>
//               </omni-tooltip>
             
            
//       </div>
//       <hr class="dropdown-divider">
//       <a tabindex="0" href="/449203c6-7ed3-11e8-8b6b-0a35455287ac/customize">
//         <div class="dropdown-item">
//           <omni-icon class="is-size-3" icon-id="omni:informative:theme" aria-label="icon" role="img"></omni-icon>
//           <span>Client Customization</span>
//         </div>
//       </a>
//       <hr class="dropdown-divider">
//       <a tabindex="0">
//         <div class="dropdown-item">
//           <omni-icon class="is-size-3" icon-id="omni:interactive:refresh" aria-label="icon" role="img"></omni-icon>
//           <p>Reset Profile Cache</p>
//         </div>
//       </a>
//       <!--?lit$06050735$-->
//             <hr class="dropdown-divider">
//             <a href="http://omnisupport.annalect.com" target="omniSupport" rel="noopener noreferrer" tabindex="0">
//               <div class="dropdown-item">
//                 <omni-icon class="is-size-3" icon-id="omni:informative:help" aria-label="icon" role="img"></omni-icon>
//                 <p>Support</p>
//               </div>
//             </a>
          
//       <hr class="dropdown-divider">
//       <a tabindex="0">
//         <div class="dropdown-item">
//           <omni-icon class="is-size-3" icon-id="omni:interactive:exit" aria-label="icon" role="img"></omni-icon>
//           <p>Sign Out</p>
//         </div>
//       </a>
//             </div>
//           </div>
//         </div>
//       </omni-style>
//     `;
//   }
// }
// customElements.define("user-profile", NavBar);

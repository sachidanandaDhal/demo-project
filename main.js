import { Router } from "@vaadin/router";
import "./src/components/navbar/admin-nav-bar.js";
import "./src/components/navbar/user-nav-bar.js";
import "./src/components/navbar/user-nav-bar1.js";
import "./src/components/form/user-form.js";
import "./src/components/home/user-data.js";
import "./src/components/login/log-in.js";
import "./src/components/login/test-login.js";
import "./src/components/navbar/test-test-user-nav.js";


///navbar/////////

import "./src/components/nav-bar/nav-bar.js";


////////


import "./src/components/super-admin/super-admin-nav.js";
import './src/components/super-admin/user-page.js';
import './src/components/super-admin/dashboard-page.js';
import './src/components/super-admin/admin-page.js';
import { OmniElement, html } from "omni-ui";
export default class Main extends OmniElement {
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    super.firstUpdated();

    const routes = [
      {
        path: "/",
        redirect: "/log-in",
      },
      {
        path: "/log-in",
        component: "log-in",
      },
      {
        path: "/home",
        component: "nav-bar",
      },
      // {
      //   path: "/admin-home",
      //   component: "admin-nav-bar",
      // },
      {
        path: "/home/create",
        component: "user-form",
      },
      {
        path: "/home/edit",
        component: "user-form",
      },
      {
        path: "/home/view",
        component: "user-data",
      },

      /////////////////////
      {
        path: "/user-home",
        component: "user-nav-bar",
      },
      {
        path: "/user-home/edit",
        component: "edit-1",
      },
      {
        path: "/super-admin",
        component: "super-admin-nav",
        children: [
          {
            path: "/dashboard",
            component: "dashboard-page",
          },
          {
            path: "/user",
            component: "user-page",
          },
          {
            path: "/admin",
            component: "admin-page",
          },
        ],
      },
    ];

    const outlet = this.shadowRoot.getElementById("outlet");
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html`
      <omni-style>
        <!-- Main router outlet -->
        <div id="outlet"></div>
      </omni-style>
    `;
  }
}
OmniElement.register("main-app", Main);

import { Router } from "@vaadin/router";

import "./src/components/login/log-in.js";
import "./src/components/nav-bar/nav-bar.js";
import "./src/components/home/user-home.js";
import "./src/components/form/user-form.js";
import "./src/components/home/view-user-data.js";
import "./src/components/nav-bar/dash-board.js";

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
        component: "view-user-data",
      },
      {
        path: "/user-home",
        component: "user-home",
      },
      {
        path: "/home",
        component: "nav-bar",
        children: [
          {
            path: "/dashboard",
            component: "dash-board",
          },
          {
            path: "/",
            component: "home-tab",
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

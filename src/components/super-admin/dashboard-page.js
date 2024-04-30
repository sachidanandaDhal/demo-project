import { OmniElement, html } from "omni-ui";

export default class DashboardPage extends OmniElement {
  render() {
    return html`
      <div>
        <!-- Dashboard page content goes here -->
        <h1>Dashboard Page</h1>
        <p>Welcome to the Dashboard!</p>
      </div>
    `;
  }
}
customElements.define("dashboard-page", DashboardPage);
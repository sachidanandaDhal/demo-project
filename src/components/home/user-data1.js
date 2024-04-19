import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";

OmniElement.register();
OmniStyleElement.register();
export default class UserData extends OmniElement {
  render() {
    return html`
    <omni-style>
       <h1>BUBU</h1>
    </omni-style>
    `;
  }
}

customElements.define("user-data1", UserData);

import { OmniElement, OmniStyleElement, css, html, nothing } from 'omni-ui';
import '../home/home-tab.js';
OmniElement.register();
OmniStyleElement.register();
export default class Navbar1 extends (OmniElement) {
  static get styles() {
    return css`
      :host {
        --omni-toolbar-gap: 14px;
        --omni-app-layout-header-height: 60px;
        --omni-app-layout-header-bg: #fff;
        --omni-app-layout-drawer-closed-width: 0px;
      }
      header {
        margin: 10px 15px;
      }
   
      
        /* Defaults for overridable config */
        omni-toolbar::part(center) {
            flex-basis: 60%; /* suggest inital size before shrinking */
            flex-shrink: 50; /* change shrink priority */
          }
          omni-toolbar::part(center-end) {
            flex-shrink: 500; /* change shrink priority */
          }
        

          
    `;
  }

  render() {
    return html`
       <omni-style>
        <omni-app-layout>
        <header slot="header">
          <omni-toolbar>
          <button class="button is-text">
              <omni-icon class="is-size-1" icon-id="omni:brand:apple"></omni-icon>
            </button>
            <button class="button is-text is-shadowless is-warning is-small">Item 1</button>
            <omni-tooltip>
            <button class="button is-text is-shadowless is-warning is-small">Item 2</button>
            <div slot="content">Hello World!</div>
            </omni-tooltip>
          <div slot="center-end">
            
            <button class="button is-text">
              <omni-icon class="is-size-1" icon-id="omni:interactive:launch"></omni-icon>
            </button>
            <button slot="end" class="button is-text">
            <omni-icon class="is-size-1" icon-id="omni:interactive:actions"></omni-icon>
          </button>
          </div>
          <div slot="end" class="toolbar-divider"></div>
          <button slot="end" class="button is-text">
            <omni-icon class="is-size-1" icon-id="omni:interactive:actions"></omni-icon>
          </button>
          </omni-toolbar>
          </header>
          <main>
            <home-tab></home-tab>
          </main>
          </omni-app-layout>
       </omni-style>

    `;
  }
}

customElements.define('nav-bar1', Navbar1);

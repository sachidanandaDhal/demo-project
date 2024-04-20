import { Router } from '@vaadin/router';
import { OmniIconElement, OmniStyleElement } from 'omni-ui';
import '../navbar/nav-bar.js';
import './src/components/navbar/test-nab.js';
import './src/components/form/user-form1.js';
import './src/components/form/user-form45.js';
import './src/components/home/user-data.js';
import '../login/log-in.js';
import '../home/user-data1.js';
OmniStyleElement.register();
OmniIconElement.register();



const outlet = document.getElementById('outlet');

const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'log-in' },
  { path: '/home', component: '' },
]);
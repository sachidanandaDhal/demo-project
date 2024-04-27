import { Router } from '@vaadin/router';
import './src/components/navbar/admin-nav-bar.js';
import './src/components/navbar/user-nav-bar.js';
import './src/components/navbar/user-nav-bar1.js';
import './src/components/form/user-form.js';
import './src/components/home/user-data.js';
import './src/components/login/log-in.js';
import './src/components/login/test-login.js';
import './src/components/navbar/test-test-user-nav.js';

const outlet = document.getElementById('outlet');

const routes = [
  {
    path: '/',
    component: 'log-in',
    action: () => {}
  },
  {
    path: '/admin-home',
    component: 'admin-nav-bar',
    action: () => {}
  },
  {
    path: '/admin-home/create',
    component: 'user-form',
    action: () => {}
  },
  {
    path: '/admin-home/edit',
    component: 'edit-user',
    action: () => {}
  },
  {
    path: '/admin-home/view',
    component: 'user-data',
    action: () => {}
  },
  {
    path: '/user-home',
    component: 'user-nav-bar',
    action: () => {}
  },
  {
    path: '/user-home/edit',
    component: 'edit-1',
    action: () => {}
  },
];

const router = new Router(outlet);
router.setRoutes(routes);

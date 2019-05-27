import './index.css';
import {
  sidedrawerBtn, backDrobBtn,
} from './assets/js/buttons';
import {
  sidenav, backdrop,
} from './assets/js/UI';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';

import { showTab } from './assets/js/events/tabMenu';
import openTab from './assets/js/events/tab';
import toggler from './assets/js/events/toggler';
import signup from './actions/signup/signup';
import signin from './actions/signin/signin';

window.openTab = openTab;
window.showTab = showTab;
window.toggler = toggler;
window.signup = signup;
window.signin = signin;

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}


if (backDrobBtn) {
  backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

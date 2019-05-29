import './index.css';
import {
  sidedrawerBtn, backDrobBtn, closeModal,
} from './assets/js/buttons';
import {
  sidenav, backdrop,
} from './assets/js/UI';
import { loanApplication, profile } from './route/index';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';

import { showTab } from './assets/js/events/tabMenu';
import openTab from './assets/js/events/tab';
import toggler from './assets/js/events/toggler';
import signup from './actions/signup/signup';
import signin from './actions/signin/signin';
import userDashboard from './actions/pageLoaders/userDashboard';
import dashboard from './actions/pageLoaders/dashboard';
import displayLoan from './actions/loan/loanCalculator';
import setSlider from './actions/loan/setSlider';
import logout from './actions/logout/logout';
import apply from './actions/loan/apply/apply';
import close from './assets/js/events/close';
import open from './assets/js/events/open';
import createHomeAddress from './actions/address/createHomeAddress';
import { amountScreen, tenorScreen } from './actions/loan/loanScreen';


window.openTab = openTab;
window.showTab = showTab;
window.toggler = toggler;
window.signup = signup;
window.signin = signin;
window.displayLoan = displayLoan;
window.setSlider = setSlider;
window.logout = logout;
window.apply = apply;
window.close = close;
window.open = open;
window.amountScreen = amountScreen;
window.tenorScreen = tenorScreen;
window.createHomeAddress = createHomeAddress;

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}

if (closeModal) {
  closeModal.addEventListener('click', () => close('backdrop2', 'loanFeedback'));
  closeModal.addEventListener('click', () => close('backdrop2', 'addressFeedback'));
  closeModal.addEventListener('click', () => close('backdrop2', 'errorBox'));
}
if (backDrobBtn) {
  backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

// user dashboard loader
if (window.location.pathname === '/user.html') {
  window.addEventListener('load', userDashboard);
  window.addEventListener('load', displayLoan);
}

if (window.location.pathname === '/admin.html') {
  window.addEventListener('load', dashboard);
}

console.log(loanApplication);
if (window.location.pathname === loanApplication || window.location.pathname === profile) {
  window.addEventListener('load', dashboard);
}

if (window.location.pathname === '/index.html' || window.location.pathname === '/Quick-Credit/dist/') {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      document.getElementById('header').style.backgroundColor = 'rgb(3, 75, 75)';
    } else if (window.scrollY < 150) {
      document.getElementById('header').style.backgroundColor = '';
    }
  });
}

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
import userDashboard from './actions/pageLoaders/userDashboard';
import displayLoan from './actions/loan/loanCalculator';
import setSlider from './actions/loan/setSlider';
import logout from './actions/logout/logout';

window.openTab = openTab;
window.showTab = showTab;
window.toggler = toggler;
window.signup = signup;
window.signin = signin;
window.displayLoan = displayLoan;
window.setSlider = setSlider;
window.logout = logout;

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}


if (backDrobBtn) {
  backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

// user dashboard loader
if (window.location.pathname === '/user.html') {
  window.addEventListener('load', userDashboard);
  window.addEventListener('load', displayLoan);
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

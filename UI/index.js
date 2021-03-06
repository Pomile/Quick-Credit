import './index.css';
import {
  sidedrawerBtn, backDrobBtn, backDrobBtn1, backDrobBtn2, signupBtn, signinBtn, tabMenu, tabMenu2,
} from './assets/js/buttons';
import {
  sidenav, backdrop, tabCon, tabMenuNavigation, email, password, loanDetailsNode,
} from './assets/js/UI';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';
import {
  openLoanDetails, closeLoanDetails, closeLoanMsg,
} from './assets/js/events/loanDetails';
import { openTabMenuNav, hideTabMenuNav, showTab } from './assets/js/events/tabMenu';
import signup from './assets/js/events/signup';
import signin from './assets/js/events/signin';
import openTab from './assets/js/events/tab';
import toggleStatus from './assets/js/events/statusEvt';
import toggler from './assets/js/events/toggler';

window.toggleStatus = toggleStatus;
window.openTab = openTab;
window.showTab = showTab;
window.openLoanDetails = openLoanDetails;
window.toggler = toggler;
window.tabNavLink = document.getElementsByClassName('tabMenu-navigation__link')[0];

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}

if (backDrobBtn1) {
  backDrobBtn1.addEventListener('click', closeLoanDetails);
}
if (backDrobBtn2) {
  backDrobBtn2.addEventListener('click', closeLoanMsg);
}

if (backDrobBtn) {
  backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}


if (signupBtn) {
  signupBtn.onclick = event => signup(event);
}

if (signinBtn) {
  signinBtn.onclick = event => signin(event, email.value.trim(), password.value.trim());
}

if (tabCon && window.location.pathname === '/Quick-Credit/dist/profile.html') {
  window.addEventListener('load', () => openTab(event, 'account'));
}

if (tabCon && window.location.pathname === '/Quick-Credit/dist/manageloan.html') {
  window.addEventListener('load', () => openTab(event, 'allLoans'));
}

if (tabMenu) {
  tabMenu.addEventListener('click', () => openTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2));
}

if (tabMenu2) {
  tabMenu2.addEventListener('click', () => hideTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2));
}

if (window.location.pathname === '/index.hmtl') {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      document.getElementById('header').style.backgroundColor = 'rgb(3, 75, 75)';
    } else if (window.scrollY < 150) {
      document.getElementById('header').style.backgroundColor = '';
    }
  });
}

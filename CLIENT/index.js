import './index.css';
import {
  sidedrawerBtn, backDrobBtn, closeModal, backDrobBtn1, backDrobBtn2,
} from './assets/js/buttons';
import {
  sidenav, backdrop,
} from './assets/js/UI';
import {
  loanApplication, profile, verifyUser, loan, makePayment,
} from './route/index';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';

import { showLoanContent } from './assets/js/events/tabMenu';
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
import toggleStatus from './assets/js/events/statusEvt';
import { openUserDetails, closeUserDetails, closeLoanMsg } from './assets/js/events/userDetailsControl';
import loadUserStatusWithAddressAndLoan from './actions/userStatus/loadUserStatus';
import modifyUserStatus from './actions/userStatus/modifyUserStatus';
import displayUserDetails from './actions/userStatus/displayMsg';
import getAllLoans from './actions/loan/getAllLoans/getAllLoans';
import getPendingLoans from './actions/loan/pendingLoans/getPendingLoans';
import modifyLoanStatus from './actions/loan/modifyLoanStatus/modifyLoanStatus';
import toggleTabMenu from './assets/js/events/toggleTab';
import getALoan from './actions/loan/getAllLoans/getALoan/getALoan';
import payment from './actions/repayment/makePayment/makePayment';


window.openTab = openTab;
window.showLoanContent = showLoanContent;
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
window.loadUserStatusWithAddressAndLoan = loadUserStatusWithAddressAndLoan;
window.toggleStatus = toggleStatus;
window.openUserDetails = openUserDetails;
window.closeUserDetails = closeUserDetails;
window.modifyUserStatus = modifyUserStatus;
window.displayUserDetails = displayUserDetails;
window.getAllLoans = getAllLoans;
window.getPendingLoans = getPendingLoans;
window.modifyLoanStatus = modifyLoanStatus;
window.toggleTabMenu = toggleTabMenu;
window.getALoan = getALoan;
window.payment = payment;

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}

if (closeModal) {
  if (window.location.pathname === loan) {
    closeModal.addEventListener('click', () => close('backdrop1', 'errorBox'));
  } else if (window.location.pathname === makePayment) {
    closeModal.addEventListener('click', () => close('backdrop1', 'paymentFeedback'));
    closeModal.addEventListener('click', () => close('backdrop1', 'errorBox'));
  } else {
    closeModal.addEventListener('click', () => close('backdrop2', 'loanFeedback'));
    closeModal.addEventListener('click', () => close('backdrop2', 'addressFeedback'));
    closeModal.addEventListener('click', () => close('backdrop2', 'errorBox'));
  }
}
if (backDrobBtn) {
  backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

if (backDrobBtn1) {
  backDrobBtn1.addEventListener('click', closeUserDetails);
}
if (backDrobBtn2 && window.location.pathname === loan) {
  backDrobBtn2.addEventListener('click', closeLoanMsg);
}

// user dashboard loader
if (window.location.pathname === '/user.html') {
  window.addEventListener('load', userDashboard);
  window.addEventListener('load', displayLoan);
}

if (window.location.pathname === '/admin.html') {
  window.addEventListener('load', dashboard);
}

if (window.location.pathname === loanApplication || window.location.pathname === profile || window.location.pathname === verifyUser || window.location.pathname === loan || window.location.pathname === makePayment) {
  console.log(window.location.pathname);
  window.addEventListener('load', dashboard);
  if (window.location.pathname === verifyUser) {
    window.addEventListener('load', () => loadUserStatusWithAddressAndLoan('unverified'));
  }

  if (window.location.pathname === loan) {
    window.addEventListener('load', () => getAllLoans());
  }
}


if (window.location.pathname === '/index.html' || window.location.pathname === '/Quick-Credit/dist/' || window.location.pathname === '/') {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      document.getElementById('header').style.backgroundColor = 'rgb(3, 75, 75)';
    } else if (window.scrollY < 150) {
      document.getElementById('header').style.backgroundColor = '';
    }
  });
}

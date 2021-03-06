import './index.css';
import {
  sidedrawerBtn, backDrobBtn, closeModal, backDrobBtn1, backDrobBtn2,
} from './assets/js/buttons';
import {
  sidenav, backdrop,
} from './assets/js/UI';
import {
  loanApplication, profile, verifyUser, loan, makePayment, repayment, userDashboardPath,
  adminDashboardPath,
} from './route/pagePath';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';

import { showLoanContent, showProfileSection } from './assets/js/events/tabMenu';
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
import { amountScreen, tenorScreen } from './actions/loan/loanScreen';
import toggleStatus from './assets/js/events/statusEvt';
import { openDetails, closeDetails, closeLoanMsg } from './assets/js/events/userDetailsControl';
import loadUserStatusWithAddressAndLoan from './actions/userStatus/loadUserStatus';
import modifyUserStatus from './actions/userStatus/modifyUserStatus';
import userDetails from './actions/userStatus/displayMsg';
import getAllLoans from './actions/loan/getAllLoans/getAllLoans';
import getPendingLoans from './actions/loan/pendingLoans/getPendingLoans';
import modifyLoanStatus from './actions/loan/modifyLoanStatus/modifyLoanStatus';
import toggleTabMenu from './assets/js/events/toggleTab';
import getALoan from './actions/loan/getAllLoans/getALoan/getALoan';
import payment from './actions/repayment/makePayment/makePayment';
import getAllRepayments from './actions/repayment/history/getRepayments';
import getALoanRepayments from './actions/repayment/history/getALoanRepayments';
import imgUpload from './actions/upload/imgUpload';
import userDashboardBuilder from './actions/dashboard/user';
import summary from './actions/loan/summary/summary';
import navigator from './actions/tools/navigator';
import renderPaymentOptions from './actions/repayment/makePayment/paymentOptions';
import formatCardNumber from './actions/repayment/makePayment/cardNumberFormater';
import securedHomePage from './actions/tools/SecureNavigator';
import gtLoan from './actions/loan/getALoan/getALoan';
import getRepaidLoans from './actions/loan/getRepaidLoans/getRepaidLoans';
import getNotFullyRepaidLoans from './actions/loan/getRepaidLoans/getNotFullyRepaidLoans/getNotFullyRepaidLoans';
import showPersonal from './actions/profile/personal/showPersonal';
import showEmployment from './actions/profile/employment/showEmployment';
import showBank from './actions/profile/bank/showBank';
import savePersonalData from './actions/profile/personal/savePersonalData';
import saveEmploymentDetails from './actions/profile/employment/saveUserEmployment';
import saveBankDetails from './actions/profile/bank/saveUserBankDetails';
import loadImage from './actions/profile/image/loadImage';
import showImageUploader from './actions/profile/image/showImageUploadModal';
import closeUploader from './actions/profile/image/closeUploader';
import saveImage from './actions/profile/image/saveImage';
import getLoanDetails from './actions/loan/getLoanDetails/getLoanDetails';

window.gtLoan = gtLoan;
window.securedHomePage = securedHomePage;
window.formatCardNumber = formatCardNumber;
window.navigate = navigator;
window.renderPaymentOptions = renderPaymentOptions;
window.savePersonalData = savePersonalData;
window.navigate = navigator;
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
window.loadUserStatusWithAddressAndLoan = loadUserStatusWithAddressAndLoan;
window.toggleStatus = toggleStatus;
window.openUserDetails = openDetails;
window.closeUserDetails = closeDetails;
window.modifyUserStatus = modifyUserStatus;
window.userDetails = userDetails;
window.getAllLoans = getAllLoans;
window.getPendingLoans = getPendingLoans;
window.modifyLoanStatus = modifyLoanStatus;
window.toggleTabMenu = toggleTabMenu;
window.getALoan = getALoan;
window.payment = payment;
window.getAllRepayments = getAllRepayments;
window.getALoanRepayments = getALoanRepayments;
window.imgUpload = imgUpload;
window.showProfileSection = showProfileSection;
window.getRepaidLoans = getRepaidLoans;
window.getNotFullyRepaidLoans = getNotFullyRepaidLoans;
window.showPersonal = showPersonal;
window.showEmployment = showEmployment;
window.showBank = showBank;
window.saveEmploymentDetails = saveEmploymentDetails;
window.saveBankDetails = saveBankDetails;
window.loadImage = loadImage;
window.showImageUploader = showImageUploader;
window.closeUploader = closeUploader;
window.saveImage = saveImage;
window.closeUploader = closeUploader;
window.getLoanDetails = getLoanDetails;

if (sidedrawerBtn) {
  sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}

if (closeModal) {
  if (window.location.pathname === loan) {
    closeModal.addEventListener('click', () => close('backdrop1', 'errorBox'));
  } else if (window.location.pathname === makePayment) {
    closeModal.addEventListener('click', () => close('backdrop1', 'paymentFeedback'));
    closeModal.addEventListener('click', () => close('backdrop1', 'errorBox'));
  } else if (window.location.pathname === repayment) {
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
  backDrobBtn1.addEventListener('click', closeDetails);
}
if (backDrobBtn2 && window.location.pathname === loan) {
  backDrobBtn2.addEventListener('click', closeLoanMsg);
}

// user dashboard loader
if (window.location.pathname === userDashboardPath) {
  window.addEventListener('load', dashboard);
  window.addEventListener('load', userDashboardBuilder);
  window.addEventListener('load', displayLoan);
}

if (window.location.pathname === adminDashboardPath) {
  window.addEventListener('load', dashboard);
  window.addEventListener('load', summary);
}

if (window.location.pathname === loanApplication || window.location.pathname === profile || window.location.pathname === verifyUser || window.location.pathname === loan || window.location.pathname === makePayment || window.location.pathname === repayment) {
  window.addEventListener('load', dashboard);
  if (window.location.pathname === verifyUser) {
    window.addEventListener('load', () => loadUserStatusWithAddressAndLoan('unverified'));
  }

  if (window.location.pathname === loan) {
    window.addEventListener('load', () => getAllLoans());
  }

  if (window.location.pathname === repayment) {
    window.addEventListener('load', () => getAllRepayments());
  }
  if (window.location.pathname === profile) {
    window.addEventListener('load', () => showPersonal());
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

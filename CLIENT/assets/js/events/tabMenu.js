import getAllLoans from '../../../actions/loan/getAllLoans/getAllLoans';
import getPendingLoans from '../../../actions/loan/pendingLoans/getPendingLoans';

export const openTabMenuNav = (tabMenuNavigation, tabMenu, tabMenu2) => {
  window.tabMenuStatus = 0;

  tabMenu.classList.remove('show');
  tabMenu.classList.add('hide');
  tabMenu2.classList.remove('hide');
  tabMenu2.classList.add('show');
  tabMenuNavigation.classList.remove('hide');
  tabMenuNavigation.classList.add('show');
};

export const hideTabMenuNav = (tabMenuNavigation, tabMenu, tabMenu2) => {
  window.tabMenuStatus = 1;

  tabMenu.classList.remove('hide');
  tabMenu.classList.add('show');
  tabMenu2.classList.remove('show');
  tabMenu2.classList.add('hide');
  tabMenuNavigation.classList.remove('show');
  tabMenuNavigation.classList.add('hide');
};

export const showLoanContent = (evt) => {
  // Declare all variables
  let tabNav;
  const tabBtn = evt.currentTarget.id;
  console.log('tab btn', tabBtn);

  tabNav = document.getElementById('tabMenuNavigation');
  tabNav.classList.remove('show');
  tabNav.classList.add('hide');
  // close tab navigation
  if (tabBtn === 'allLoansBtn2') {
    getAllLoans();
  } else if (tabBtn === 'pendingLoansBtn2') {
    getPendingLoans('pending', 'false');
  }
  // remove active from previous tab link

  const tabMenu = document.querySelectorAll('.tabMenu-navigation__link');
  for (let counter = 0; counter < tabMenu.length; counter++) {
    tabMenu[counter].classList.remove('active');
  }
  evt.currentTarget.classList.add('active');
};

export const showProfileSection = (evt, section) => {
  const tabNav = document.getElementById('tabMenuNavigation');
  tabNav.classList.remove('show');
  tabNav.classList.add('hide');

  const tabMenu = document.querySelectorAll('.tabMenu-navigation__link');
  for (let counter = 0; counter < tabMenu.length; counter++) {
    tabMenu[counter].classList.remove('active');
  }
  evt.currentTarget.classList.add('active');
  const tabContent = document.querySelectorAll('.tabcontent');
  for (let counter2 = 0; counter2 < tabContent.length; counter2++) {
    tabContent[counter2].classList.add('hide');
  }
  console.log(section);
  const currentTabContent = document.querySelector(`#${section}`);
  currentTabContent.classList.remove('hide');
  currentTabContent.classList.add('show');
};

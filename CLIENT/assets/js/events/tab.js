import { profile, manageloan } from '../../../route/pagePath';

function openTab(tabBtn, tableContainer, tabName) {
  let i; let tabcontent;
  let tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  if (tabBtn === 'accountTabBtn' && window.location.pathname === profile) {
    // nothing
  } else if (window.location.pathname === profile && tabBtn !== 'accountTabBtn') {
    // do nothing
  }
  if (window.location.pathname === manageloan) {
    if (tabName === 'allLoans') {
      document.getElementById('tabHeader').innerHTML = 'Loans';
    } else if (tabName === 'repaid') {
      document.getElementById('tabHeader').innerHTML = 'Repaid';
    } else if (tabName === 'notFullyRepaid') {
      document.getElementById('tabHeader').innerHTML = ' Not Fully Repaid';
    } else if (tabName === 'pendingLoans') {
      document.getElementById('tabHeader').innerHTML = 'Pending Approvals';
    }
  }
  document.getElementById(tableContainer).style.display = 'block';
  document.getElementById(tabBtn).classList.add('active');
}

export default openTab;

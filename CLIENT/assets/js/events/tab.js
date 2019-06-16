import { profile } from '../../../route/index';
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
    document.querySelector('#picture-box').classList.remove('hide');
    document.querySelector('#picture-box').classList.add('show');
    document.querySelector('#tab').classList.remove('-top-margin');
  } else if (window.location.pathname === profile && tabBtn !== 'accountTabBtn') {
    document.querySelector('#picture-box').classList.remove('show');
    document.querySelector('#picture-box').classList.add('hide');
    document.querySelector('#tab').classList.add('-top-margin');
  }

  document.getElementById('tabHeader').innerHTML = `${tabName}`;
  document.getElementById(tableContainer).style.display = 'block';
  document.getElementById(tabBtn).classList.add('active');
}

export default openTab;

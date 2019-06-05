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

  document.getElementById('tabHeader').innerHTML = `${tabName}`;
  document.getElementById(tableContainer).style.display = 'block';
  document.getElementById(tabBtn).classList.add('active');
}

export default openTab;

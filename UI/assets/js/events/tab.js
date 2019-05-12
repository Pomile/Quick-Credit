function openTab(evt, tabName) {
  // Declare all variables
  let i; let tabcontent; let
    tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  if (evt.currentTarget.innerHTML === undefined) {
    document.getElementById('tabHeader').innerHTML = `${'Loans'}`;
  } else {
    document.getElementById('tabHeader').innerHTML = `${evt.currentTarget.innerHTML}`;
  }


  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

export default openTab;

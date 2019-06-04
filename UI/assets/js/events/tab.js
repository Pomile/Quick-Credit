import capFirstLetter from './capFirstLetter';

function openTab(tabName) {
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
  let name;
  if (evt.currentTarget.innerHTML === undefined) {
    name = capFirstLetter(tabName);
    document.getElementById('tabHeader').innerHTML = `${name}`;
  } else {
    name = capFirstLetter(evt.currentTarget.innerHTML);
    document.getElementById('tabHeader').innerHTML = `${name}`;
  }


  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  document.getElementById(tabBtn).currentTarget.className += ' active';
}

export default openTab;

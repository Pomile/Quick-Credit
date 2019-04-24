import './index.css'
import { sidedrawerBtn, backDrobBtn, signupBtn, signinBtn, tabMenu, tabMenu2 } from './assets/js/buttons'
import { sidenav, backdrop, tabCon, tabMenuNavigation } from './assets/js/UI';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';
import { openTabMenuNav, hideTabMenuNav, showTab } from './assets/js/events/tabMenu';
import signup  from './assets/js/events/signup';
import signin  from './assets/js/events/signin';
import openTab from './assets/js/events/tab';

window.openTab = openTab;
window.showTab = showTab;
window.tabNavLink = document.getElementsByClassName('tabMenu-navigation__link')[0];

if(sidedrawerBtn){
    sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}
if(backDrobBtn){
    backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

if(signupBtn){
    signupBtn.onclick = (event) => signup(event);
}

if(signinBtn){
    signinBtn.onclick = (event) => signin(event);
}

if(tabCon){
    window.addEventListener('load', () => openTab(event, 'address' ))
}

if(tabMenu){
    
    tabMenu.addEventListener('click', () => openTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2))
}

if(tabMenu2){
    
    tabMenu2.addEventListener('click', () => hideTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2))
}
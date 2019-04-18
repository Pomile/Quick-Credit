import './index.css'
import { sidedrawerBtn, backDrobBtn, signupBtn } from './assets/js/buttons'
import { sidenav, backdrop } from './assets/js/UI';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';
import signup  from './assets/js/events/signup';


if(sidedrawerBtn){
    sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}
if(backDrobBtn){
    backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

if(signupBtn){
    signupBtn.onclick = (event) => signup(event);
}
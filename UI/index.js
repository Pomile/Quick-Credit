import './index.css'
import { sidedrawerBtn, backDrobBtn } from './assets/js/buttons'
import { sidenav, backdrop } from './assets/js/UI';
import { openSideNav, hideSideNav } from './assets/js/events/sidedrawer';


if(sidedrawerBtn){
    sidedrawerBtn.addEventListener('click', () => openSideNav(sidenav, backdrop));
}
if(backDrobBtn){
    backDrobBtn.addEventListener('click', () => hideSideNav(sidenav, backdrop));
}

export const openTabMenuNav = (tabMenuNavigation, tabMenu, tabMenu2) => {
    window.tabMenuStatus = 0;
    
    tabMenu.classList.remove('show');
    tabMenu.classList.add('hide');
    tabMenu2.classList.remove('hide');
    tabMenu2.classList.add('show');
    tabMenuNavigation.classList.remove('hide');
    tabMenuNavigation.classList.add('show');
}

export const hideTabMenuNav = (tabMenuNavigation, tabMenu, tabMenu2) => {
    window.tabMenuStatus = 1;
    
    tabMenu.classList.remove('hide');
    tabMenu.classList.add('show');
    tabMenu2.classList.remove('show');
    tabMenu2.classList.add('hide');
    tabMenuNavigation.classList.remove('show');
    tabMenuNavigation.classList.add('hide');
    
}

export const showTab = (evt, tabName) => {
    // Declare all variables
    let tabNav;
    openTab(evt, tabName);

    // close tab navigation
    tabNav =  document.getElementById("tabMenuNavigation");
    tabNav.classList.remove('show');
    tabNav.classList.add('hide');
    // remove active from previous tab link
    if(window.tabNavLinkInnerHTML !== evt.currentTarget.innerHTML ){
        window.tabNavLink.classList.remove('active');
    } else {
        evt.currentTarget.classList.add('active');
    }
    console.log('previous',window.tabNavLink)
    window.tabNavLinkInnerHTML = evt.currentTarget.innerHTML;
    window.tabNavLink = evt.currentTarget;
    console.log('new',tabNavLink);
    
  }
  
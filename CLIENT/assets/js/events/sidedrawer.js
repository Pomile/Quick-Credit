export const openSideNav = (sidenav, backdrop) => {
  backdrop.classList.remove('hide');
  sidenav.classList.remove('hideSideNav');
  backdrop.classList.add('show');
  sidenav.classList.add('showSideNav');
};

export const hideSideNav = (sidenav, backdrop) => {
  backdrop.classList.remove('show');
  sidenav.classList.remove('showSideNav');
  backdrop.classList.add('hide');
  sidenav.classList.add('hideSideNav');
};

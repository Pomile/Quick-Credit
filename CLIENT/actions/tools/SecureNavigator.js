import getAllLoans from '../loan/getAllLoans/getAllLoans';
import getPendingLoans from '../loan/pendingLoans/getPendingLoans';

const securedHomePage = (event, page) => {
  event.preventDefault();
  const isAdmin = localStorage.getItem('isadmin');
  if (isAdmin === 'true' && page === 'dashboard') {
    window.location.href = './admin.html';
  } else {
    window.location.href = './user.html';
  }
};

export default securedHomePage;

import getAllLoans from '../loan/getAllLoans/getAllLoans';
import getPendingLoans from '../loan/pendingLoans/getPendingLoans';

const navigator = (event, path, view) => {
  event.preventDefault();
  window.location.href = `.${path}`;
};

export default navigator;

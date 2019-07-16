import loanCardsContainer from '../../dashboard/admin';

const summary = () => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:8000/api/v1/loans/summary',
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      loanCardsContainer(data.data);
    }
  });
};

export default summary;

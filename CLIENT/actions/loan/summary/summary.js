import loanCardsContainer from '../../dashboard/admin';
import baseUrl from '../../../route/endpointPath';

const summary = () => {
  const token = localStorage.getItem('token');
  fetch(`${baseUrl}/loans/summary`,
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

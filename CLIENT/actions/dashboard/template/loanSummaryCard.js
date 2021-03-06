const loanSummaryCardTemplate = (data) => {
  let color = '-armor-6';
  let view = 'getAllLoans';
  const path = '/manageloan.html';
  if (data.title === 'Approved') {
    color = '-green-1';
  } else if (data.title === 'Pending') {
    color = '-amber-1';
    view = 'Pending';
  } else if (data.title === 'Rejected') {
    color = '-red';
  } else if (data.title === 'Repaid') {
    color = '-green';
  } else if (data.title === 'Not Fully Repaid') {
    color = '-amber-2';
  }

  return ` 
<div class="card -card-width">
    <div class="card__header">
        <div class="card__icon ${color}">
                <i class="fas fa-calculator -fc-white -fs-res-l-2 -fs-res-m-3 -fs-res-sm-8"></i>
        </div>
        <div class="card__category -text-align-right -fs-res-l-0x -fs-res-m-2 -fs-res-sm-4">${data.title}</div>
        <h2 class="card__title -text-align-right -fs-res-l-0x -fs-res-m-2 -fs-res-sm-4" id="totalLoan">${data.value}</h2>
    </div>
    <div class="card__footer">
        <div card="card__stats">
            <i class="material-icons card__stats-icon -fc-gray -fc-white -fs-res-l-0x -fs-res-m-2 -fs-res-sm-4">local_offer</i>
            <a href="#" onclick= "navigate(event, '${path}', '${view}')" class="card__link -fc-gray -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 "><strong>View all</strong></a>
        </div>
    </div>
</div>
`;
};


export default loanSummaryCardTemplate;

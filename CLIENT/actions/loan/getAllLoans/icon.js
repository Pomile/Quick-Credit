import imgIco from '../../../assets/images/70.png';

const allLoansIcon = (loan) => {
  let loanStatusIconColor;
  let iconname;
  if (loan.status === 'pending') {
    loanStatusIconColor = '-fc-amber-1';
    iconname = 'lens';
  } else if (loan.status === 'approved') {
    loanStatusIconColor = '-fc-green-1';
    iconname = 'check_circle';
  } else { loanStatusIconColor = '-fc-red'; iconname = 'cancel'; }

  return ` <td class="res-td icon-td"><i
class="material-icons ${loanStatusIconColor} -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4">${iconname}</i>
</td>
<td class="res-td icon-td"><span onclick="getUserDetail('${loan.client}')"
class="picture-icon"><img src=${imgIco} /></span>
</td>`;
};

export default allLoansIcon;

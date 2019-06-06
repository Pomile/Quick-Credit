import imgIco from '../../../assets/images/70.png';

const pendingLoansIcon = id => `
    <td class="res-td-3"><span class="tooltip"><i
        onclick="modifyLoanStatus(${id}, 'pending')" id="pending-${id}" class="material-icons pending -fc-amber-1 -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">lens</i><span class="tooltiptext">Pend Approval</span></span>
    </td>
    <td class="res-td-3"><span class="tooltip"><i
    onclick="modifyLoanStatus(${id},'approved')"
    id="approve-${id}"
    class="material-icons approve -fc-gray -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">check_circle</i><span class="tooltiptext">Approve</span></span>
</td>
<td class="res-td-3"><span class="tooltip"><i
    onclick="modifyLoanStatus(${id}, 'rejected')"
    id="cancel-${id}"
    class="material-icons cancel -fc-gray -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">cancel  </i><span class="tooltiptext">Reject</span></span>
</td>
<td class="res-td-5 "><span class="tooltip"><span onclick="openLoanDetails()" class="picture-icon"><img
        src= '${imgIco}' /></span><span class="tooltiptext">Details</span></span></td>
    `;

export default pendingLoansIcon;

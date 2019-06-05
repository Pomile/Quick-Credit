import imgIco from '../../../assets/images/70.png';

const pendingLoansIcon = id => `
    <td class="res-td-3"><i
        onclick="toggleLoanStatus(${id}, 'pending')" id="pending-${id}" class="material-icons pending -fc-amber-1 -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">lens</i>
    </td>
    <td class="res-td-3"><i
    onclick="toggleLoanStatus(${id}, 'approved')"
    id="approve-${id}"
    class="material-icons approve -fc-gray -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">check_circle</i>
</td>
<td class="res-td-3"><i
    onclick="toggleLoanStatus(${id}, 'rejected')"
    id="cancel-${id}"
    class="material-icons cancel -fc-gray -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4 btn-pointer">cancel</i>
</td>
<td class="res-td-5"><span onclick="openLoanDetails()" class="picture-icon"><img
        src= '${imgIco}' /></span></td>
    `;

export default pendingLoansIcon;

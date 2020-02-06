const loanDetailTemplate = (user) => {
  const color = user.status === 'unverified' ? '-fc-green-1' : '-fc-amber-1';
  return `<div class="-text-align-right -position-fixed close" onclick="closeUserDetails()"><i class="fas fa-window-close -fs-res-l-2 font-btn -fc-gray"></i></div>
<center><div class="modalBox-details__header">
    <div class="modalBox-details__image-holder"><img src='${user.image}' /></div>
    <div class="modalBox-details-user-status -fs-res-l-0 ${color} -text-align-center"><i class="material-icons -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4">verified_user</i></div>
    <div class="modalBox-details__basic">
        <h1 class="loan__details-name -fs-res-l-2" id="name">${user.firstname} ${user.lastname}</h1>
        <h3 class="loan__details-id"><span id= "loanId">Loan ID: ${user.id}</span><span id="loanStatus" class="-fc-amber-1"><i
            class="material-icons -fs-res-l-1 -fs-res-m-2 -fs-res-sm-3 -fc-gray-2">lens</i></span></span></h3>
        <p class="loan__details-email" id="clientEmail">${user.email}</p>   
    </div>
    
</div></center>
<div class="modalBox-details__body">
        <details open>
                <summary class="-android-lollipop-4">Contact</summary>
                <div class="contact" ><p id="homeaddress">
                ${user.homeaddress}, 
                ${user.state}
                </p>
                <p id="phone">${user.phone}</p>
                
            </div>
                        
        </details>
        <details>
                <summary class="-android-lollipop-4">Loan</summary>
                <div class="employment">

                      <p><span class="-fw-bold">Amount: </span>${user.amount === null ? 'Amount: ?' : user.amount}</p>  
                        <p class="-fs-res-l-0"><span class="-fw-bold">Balance: </span>${user.balance === null ? 'Balance: NA' : user.balance}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">Due date: </span>${user.duedate === null ? 'Due date: NA' : user.duedate}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">Interest: </span>${user.interest === null ? 'NA' : user.interest}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">Installment: </span>${user.monthlyinstallment === null ? 'NA' : user.monthlyinstallment}</p>
                </div>
        </details>
        

</div>`;
};

export default loanDetailTemplate;

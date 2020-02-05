const userDetailTemplate = (img, color, user, state, loan) => `<div class="-text-align-right -position-fixed close" onclick="closeUserDetails()"><i class="fas fa-window-close -fs-res-l-2 font-btn -fc-gray"></i></div>
<center><div class="modalBox-details__header">
    <div class="modalBox-details__image-holder"><img src='${img}' /></div>
    <div class="modalBox-details-user-status -fs-res-l-0 ${color} -text-align-center"><i class="material-icons -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4">verified_user</i></div>
    <div class="modalBox-details__basic">
        <h1 class="loan__details-name -fs-res-l-2" id="name">${user.firstname} ${user.lastname}</h1>
        <h3 class="loan__details-id"><span id= "loanId">Loan ID: ${loan.id}</span><span id="loanStatus" class="-fc-amber-1"><i
            class="material-icons -fs-res-l-1 -fs-res-m-2 -fs-res-sm-3 -fc-gray-2">lens</i></span></span></h3>
        <p class="loan__details-email" id="clientEmail">${user.email}</p>   
    </div>
    
</div></center>
<div class="modalBox-details__body">
        <details open>
                <summary class="-android-lollipop-4">Contact</summary>
                <div class="contact" ><p id="homeaddress">
                ${user.homeaddress}, 
                ${state}
                </p>
                <p id="phone">${user.phone}</p>
                
            </div>
                        
        </details>
        <details>
                <summary class="-android-lollipop-4">Company/Employment Details</summary>
                <div class="employment">

                      <p><h3>${user.companyname === null ? 'Company Name: ?' : user.companyname}</h3></p>  
                        <p class="-fs-res-l-0">${user.officeaddress === null ? 'Office address: NA' : user.companywebsite}, ${user.state === null ? '' : user.state}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">Monthly Income: </span>${user.monthlyincome === null ? 'NA' : user.monthlyincome}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">Gross Income: </span>${user.grossincome === null ? 'NA' : user.grossincome}</p>
                </div>
        </details>
        <details>
                <summary class="-android-lollipop-4">Bank Details</summary>
                <div class="bank -col-l-5 -col-m-6 -col-sm-11 ">
                        <p class="-fs-res-l-0">${user.name === null ? 'Bank: NA' : user.name}</p>
                        <p class="-fs-res-l-0">${user.acctype === null ? 'Account type: NA' : user.accname}</p>
                        <p class="-fs-res-l-0">${user.accnumber === null ? 'Account Number: NA' : user.accnumber}</p>
                        <p class="-fs-res-l-0"><span class="-fw-bold">BVN: </span>${user.bvn === null ? 'NA' : user.bvn}</p>
                    </div>
                
        </details>

</div>`;

export default userDetailTemplate;

import { openUserDetails } from "../../assets/js/events/userDetailsControl";

const displayUserDetails = (userId) => {
  const user = JSON.parse(document.getElementById(userId).dataset.user);
  const loan =  JSON.parse(document.getElementById(userId).dataset.loan);

  if (user.status === 'unverified') {
    document.querySelector(".loan-details-user-status").classList.remove("-fc-green-1");
    document.querySelector(".loan-details-user-status").classList.add("-fc-amber-1")
  } else if(user.status === 'verified') {
    document.querySelector(".loan-details-user-status").classList.add("-fc-green-1");
    document.querySelector(".loan-details-user-status").classList.remove("-fc-amber-1")
  }
  console.log(user, loan);
  document.querySelector('#name').innerHTML = `${user.firstname} ${user.lastname}`;
  document.querySelector('#loanId').innerHTML = `Loan ID: ${loan.id}`;
  document.querySelector('#clientEmail').innerHTML = `${user.email}`;
  document.querySelector('#homeaddress').innerHTML = `${user.homeaddress}, ${user.state}`;
  document.querySelector('#phone').innerHTML = `${user.phone}`;
  openUserDetails();
};

export default displayUserDetails;

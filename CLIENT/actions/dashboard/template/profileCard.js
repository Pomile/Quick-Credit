const profileCardTemp = (data) => {
  let completion = 0;
  let accountColor = '-fc-amber-1';
  let bankColor = '-fc-amber-1';
  let addressColor = '-fc-amber-1';
  let empColor = '-fc-amber-1';
  const {
    firstname, lastname, email, status, homeaddress, state, grossincome, monthlyincome, companyname, companywebsite, position, name, accnumber, accname, bvn,
  } = data;
  console.log(data);
  const empDetails = grossincome && monthlyincome && companyname && companywebsite && position;
  const bankDetails = name && accnumber && accname && bvn;
  if (firstname && lastname && email && status) {
    completion += 25;
    accountColor = '-fc-green-1';
  }

  if (homeaddress && state) {
    completion += 25;
    addressColor = '-fc-green-1';
  }

  if (empDetails) {
    completion += 25;
    empColor = '-fc-green-1';
  }

  if (bankDetails) {
    completion += 25;
    bankColor = '-fc-green-1';
  }


  return `
    <div class="-col-sm-12 row -center">
            <div class="c100 p${completion} big green">
                    <span id="p-completion%">${completion}%</span>
                    <div class="slice">
                        <div class="bar2"></div>
                      <div class="bar"></div>
                     
                      <div class="fill"></div>
                    </div>
              </div>
    </div>
    <div>
    <p class="-text-align-center profile-completion__label">Profile completion analysis</p>
    </div>
    <div class="breakdown row -center -row-wrap ">
        <div class="-col-sm-6 breakdown__label">Account</div><div class="-col-sm-6 -text-align-center"><i class="material-icons ${accountColor} breakdown__icon">lens</i></div>
        <div class="-col-sm-6  breakdown__label">Address</div><div class="-col-sm-6 -text-align-center"><i class="material-icons ${addressColor} breakdown__icon">lens</i></div>
        <div class="-col-sm-6 breakdown__label">Employement</div><div class="-col-sm-6 -text-align-center"><i class="material-icons ${empColor} breakdown__icon">lens</i></div>
        <div class="-col-sm-6 breakdown__label">Bank Details</div><div class="-col-sm-6 -text-align-center"><i class="material-icons ${bankColor} breakdown__icon">lens</i></div>
        
    </div>
    <a href="profile.html" class="profile-completion__link -text-align-right">Update profile</a>
    `;
};

export default profileCardTemp;

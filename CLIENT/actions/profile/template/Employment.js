const Employment = () => `<div class="profile__container -col-l-7 -col-m-8 -col-sm-11">
                                <div class="profile__header -android-lollipop-2"></div>
                                <div class="profile__picture-holder">
                                    <div class="profile__icon"><i class="material-icons">work</i></div>
                                </div>
                                <div class="profile__body" id="profile-body">
                                    
                                    <input type="text" class="profile__inputText"  name="employeeMonthlyIncome" id="employeeMonthlyIncome"  placeholder="Monthly Income" />
                                    <input type="text" class="profile__inputText" name="employeeGrossAnnualIncome" id="employeeGrossAnnualIncome" placeholder="Gross Annual Income" />
                                    <input type="text" class="profile__inputText" name="employeeJobPosition" id="employeeJobPosition"  placeholder="Position" />
                                    <input type="number" class="profile__inputText" name="employeeYears" id="employeeYears" placeholder="Years in your current company" />
                                    <input type="text" class="profile__inputText" name="employeeCompany" id="employeeCompany" placeholder="Company Name" />
                                    <input type="text" class="profile__inputText" name="employeeWebsite" id="employeeWebsite" placeholder="Company Website" />
                                        <button id="" class="postpayment__button btn-small-3 -android-lollipop-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-white" onclick="">Save</button>
                                        <button id="" class="postpayment__button btn-small-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4" onclick="showBank()">Next</button>
                                        </div>
                                        <div class="profile__footer"></div>
                            </div>`;

export default Employment;

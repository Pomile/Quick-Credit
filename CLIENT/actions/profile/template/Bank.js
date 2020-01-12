const Bank = () => `<div class="profile__container -col-l-6 -col-m-8 -col-sm-11">
                                <div class="profile__header -android-lollipop-2"></div>
                                <div class="profile__picture-holder">
                                    <div class="profile__icon"><i class="material-icons -fc-white">account_balance</i></div>
                                </div>
                                <div class="profile__body" id="profile-body">
                                     <input list="bankId" name="bankName" id="bankName" class="profile__inputText -col-sm-10"
                                            placeholder="Bank" />
                                        <datalist id="bankId">
                                            <option value="First Bank of Nigeria">
                                                <option value="Guarantee Trust Bank">
                                                    <option value="Zenith Bank">
                                                        <option value="Fidelity Bank">
                                                            <option value="Diamond Bank">
                                        </datalist>
                                    <input type="text" class="profile__inputText"  name="accountName" id="accountName"  placeholder="Account Name" />
                                    <input type="text" class="profile__inputText" name="accountNum" id="accountNum" placeholder="Account No" />
                                    <input type="text" class="profile__inputText"  name="bvn" id="bvn"  placeholder="Bank Verification Number" />
                                   
                                        <button id="" class="profile__button btn-small-3 -android-lollipop-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-white" onclick="">Save</button>
                                        <div class="profile__footer"></div>
                            </div>`;

export default Bank;

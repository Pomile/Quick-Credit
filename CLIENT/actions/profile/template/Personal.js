import image from '../../../assets/images/image-placeholder-350x350.png';

const Personal = () => `<div class="profile__container -col-l-7 -col-m-8 -col-sm-11">
                                <div class="profile__header -android-lollipop-2"></div>
                                <div class="profile__picture-holder">
                                    <img class="profile__picture" src=${image}></img>
                                </div>
                                <div class="profile__body" id="profile-body">
                                    
                                    <input type="text" class="profile__inputText" id="firstname" name="firstname" placeholder="Firstname" />
                                    <input type="text" class="profile__inputText" id="lastname" name="lastname" placeholder="Lastname" />
                                    <input type="tel" class="profile__inputText" id="phone" name="phone" placeholder="Phone" />
                                    <input type="email" class="profile__inputText" id="mail" name="email" placeholder="Email" />
                                    <input type="text" class="profile__inputText" id="street" name="street" placeholder="Street" />
                                     <input list="stateId" name="state" id="state" class="profile__inputText -col-sm-10"
                                            placeholder="State" />
                                        <datalist id="stateId">
                                            <option value="Lagos">
                                                <option value="Abuja">
                                                    <option value="Portharcourt">
                                                        <option value="Kano">
                                                            <option value="Kaduna">
                                        </datalist>
                                        <button id="" class="postpayment__button btn-small-3 -android-lollipop-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-white" onclick="">Save</button>
                                         <button id="" class="postpayment__button btn-small-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-teal" onclick="showEmployment()">Next</button>
                                        </div>
                                        <div class="profile__footer"></div>
                            </div>`;

export default Personal;

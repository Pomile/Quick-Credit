const cardTemplate = () => `
<div id="errorMsg"></div>
<div class="row  -space-btw">
    <div class="-col-sm-7">
        <input type="text" class="postpayment__inputText" id="loanId" placeholder="Loan Id" />
    </div>
    <div class="-col-sm-4">
        <select class="postpayment__select">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="USD">EUR</option>
        <select>
    </div>
</div>
<div class="row">
<input type="text" class="postpayment__inputText" id="amountPaid" placeholder="Amount" />
</div>

<div class="row">
<input type="text" class="postpayment__inputText" id="cardnumber"  oninput="formatCardNumber()" placeholder="Card Number" />
</div>

<div class="row padding-top-bottom">
<label class="-fc-gray">Month</label>
<label class="-fc-gray  postpayment__label-margin-left">Year</label>
</div>

    <div class="row">
        <select id="month" class="-white">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
        </select>
        <div class="-col-sm-3">
        <select id="year" class="-white postpayment__select-margin-left">
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
        </select>
        </div>
    </div>
</div>
<div class="row">
<input type="text" class="postpayment__inputText" id="cardsecret" placeholder="Secret" />
</div>
<button id="postPayment" class="postpayment__button btn-small-3 -android-lollipop-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-white" onclick="payment('card')">Make payment</button>
`;

export default cardTemplate;

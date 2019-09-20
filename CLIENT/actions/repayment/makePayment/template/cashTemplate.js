const cashTemplate = () => `<div id="errorMsg"></div>
<input type="text" class="postpayment__inputText" id="loanId" placeholder="Loan Id" />
<input type="text" class="postpayment__inputText" id="amountPaid" placeholder="Amount" />
<button id="postPayment" class="postpayment__button btn-small-3 -android-lollipop-3 -fs-res-l-0 -fs-res-m-2 -fs-res-sm-4 -fc-white" onclick="payment('cash')">Make payment</button>
</div>
<div class="postpayment__footer">

</div>`;

export default cashTemplate;

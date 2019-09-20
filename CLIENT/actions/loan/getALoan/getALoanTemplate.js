const getLoanDetailTemp = data => `<div class="loan">
<div class="loan__header -text-align-center -fs-res-l-1">Loan</div>
<div class="loan__display loan-shadow -text-align-center -fs-res-l-1">${data.id}</div>
<div class="row">
        <div class="loan__label">Amount</div>
        <div class="loan__output -text-align-center">${data.client}</div>
</div>
<div class="row -border-top">
        <div class="loan__label">Amount</div>
        <div class="loan__output -text-align-center">${data.amount}</div>
</div>
<div class="row -border-top">
    <div class="loan__label">Status</div>
    <div class="loan__output -text-align-center">${data.status}</div>
</div>

<div class="row -border-top">
        <div class="loan__label">Installment</div>
        <div class="loan__output -text-align-center">${data.monthlyinstallment}</div>
    </div>
    <div class="row -border-top">
            <div class="loan__label">Duration</div>
            <div class="loan__output -text-align-center">${data.tenor} month(s)</div>
        </div>
<div class="row -border-top">
        <div class="loan__label">Repaid</div>
        <div class="loan__output -text-align-center">${data.repaid}</div>
    </div>
<div class="row -border-top">
        <div class="loan__label">Due date</div>
        <div class="loan__output -text-align-center">${data.duedate}</div>
    </div>

</div>`;

export default getLoanDetailTemp;

export const openLoanDetails = () => {
    document.getElementById("loanDetails").classList.remove('hide');
    document.getElementById("backdrop1").classList.remove('hide');
    document.getElementById("backdrop1").classList.add('show');
    document.getElementById("loanDetails").classList.add('show');
}

export const closeLoanDetails = () => {
    document.getElementById("loanDetails").classList.remove('show');
    document.getElementById("backdrop1").classList.remove('show');
    document.getElementById("loanDetails").classList.add('hide');
    document.getElementById("backdrop1").classList.add('hide');
    
}
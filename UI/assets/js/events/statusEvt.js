import { openLoanMsg } from './loanDetails';

function toggleStatus(evt, status1, status2, msgp, ...args) {
  let index;
  console.log(evt.currentTarget);
  const len1 = document.getElementsByClassName(status1).length;
  const msg = document.getElementById('loanMsg');
  for (let counter = 0; counter < len1; counter++) {
    if (evt.currentTarget.id === document.getElementsByClassName(status1)[counter].id) {
      index = counter;
      const id1 = document.getElementsByClassName(status1)[counter].id;
      const id2 = document.getElementsByClassName(status2)[counter].id;
      if (status1 === 'approve') {
        msg.innerHTML = msgp;
      } else if (status1 === 'cancel') {
        msg.innerHTML = msgp;
      } else if (status1 === 'verify') {
        msg.innerHTML = msgp;
      } else if (status1 === 'unverify') {
        msg.innerHTML = msgp;
      }

      if (args.length > 3) {
        const [status3, color1, color2, color3] = args;
        const id3 = document.getElementsByClassName(status3)[counter].id;
        document.getElementById(id3).style.color = color3;
        document.getElementById(id1).style.color = color1;
        document.getElementById(id2).style.color = color2;
        msg.innerHTML = msgp;
      } else if (args.length === 2) {
        const [color1, color2] = args;
        document.getElementById(id1).style.color = color1;
        document.getElementById(id2).style.color = color2;
      }
    }
  }
  openLoanMsg();
}

export default toggleStatus;

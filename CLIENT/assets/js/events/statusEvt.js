function toggleStatus(user) {
  const unverified = document.getElementById(`unverify-${user.email}`);
  const verified = document.getElementById(`verify-${user.email}`);
  if (user.status === 'verified') {
    verified.classList.add('-fc-green');
    verified.classList.remove('-fc-gray-1');
    unverified.classList.add('-fc-gray-1');
    unverified.classList.remove('-fc-amber-1');
    document.getElementById('userEmail').innerHTML = `'${user.email}'`;
    document.getElementById('displayMsg').style.display = 'block';
  } else if (user.status === 'unverified') {
    verified.classList.remove('-fc-green');
    verified.classList.add('-fc-gray-1');
    unverified.classList.add('-fc-amber-1');
    unverified.classList.remove('-fc-gray-1');
    document.getElementById('userEmail').innerHTML = `'${user.email}'`;
    document.getElementById('displayMsg').style.display = 'block';
  }
}

export default toggleStatus;

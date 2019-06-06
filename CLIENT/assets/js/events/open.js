const open = (backdrop, feedback) => {
  const backdrp = document.getElementById(backdrop);
  const feedbck = document.getElementById(feedback);
  backdrp.classList.add('show');
  backdrp.classList.remove('hide');
  feedbck.classList.add('show');
};

export default open;

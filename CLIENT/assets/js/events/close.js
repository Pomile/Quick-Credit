const close = (backdrop, feedback) => {
  const backdrp = document.getElementById(backdrop);
  const feedbck = document.getElementById(feedback);
  backdrp.classList.remove('show');
  feedbck.classList.remove('show');
};

export default close;

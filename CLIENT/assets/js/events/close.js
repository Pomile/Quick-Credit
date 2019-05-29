const close = (backdrop, feedback) => {
  const backdrp = document.getElementById(backdrop);
  const feedbck = document.getElementById(feedback);
  backdrp.style.display = 'none';
  feedbck.style.display = 'none';
};

export default close;

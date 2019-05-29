const open = (backdrop, feedback) => {
  const backdrp = document.getElementById(backdrop);
  const feedbck = document.getElementById(feedback);
  backdrp.style.display = 'block';
  feedbck.style.display = 'block';
};

export default open;

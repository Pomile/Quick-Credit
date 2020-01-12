const title = (tit) => {
  const description = `Profile <i class="material-icons dashboard__title-icon">arrow_right</i> ${tit}`;
  const titleBlock = document.getElementById('title');
  titleBlock.innerHTML = '';
  titleBlock.insertAdjacentHTML('beforeend', description);
};

export default title;

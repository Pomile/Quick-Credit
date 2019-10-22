
const navigator = (event, path, view) => {
  event.preventDefault();
  window.location.href = `.${path}`;
};

export default navigator;

const updateUserImage = (url, token, userId) => {
  const imagePreview = document.querySelector('#imagePreview');

  console.log(url, userId);
  fetch(`http://localhost:8000/api/v1/users/${userId}/profile/image`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    body: JSON.stringify({ imageUrl: url.toString() }),
  }).then(res => res.json()).then((res) => {
    console.log(res.data);
    if (res.status === 200) {
      imagePreview.src = res.data.image;
      document.getElementById('userImage').src = `${res.data.image}`;
    }
  });
};

export default updateUserImage;

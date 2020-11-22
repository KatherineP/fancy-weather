/* eslint-disable no-undef */
const key = 'S4oxOTpWZpzhjgENeve_SKgvO4g385v2J-qgsWPaFWo';
const backgroundIcon = document.querySelector('.fas');
const spinner = document.querySelector('.update-button');

async function uploadRandomImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${key}`;
  const response = await fetch(url);
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
    return false;
  }
  const data = await response.json();
  const imageUrl = await data.urls.full;
  document.body.style.backgroundImage = `url(${imageUrl})`;
  return true;
}

document.addEventListener('DOMContentLoaded', uploadRandomImage);


async function onClickBackgroundIcon() {
  backgroundIcon.classList.add('fa-spin');
  await uploadRandomImage();
  backgroundIcon.classList.remove('fa-spin');
}

spinner.addEventListener('click', onClickBackgroundIcon);

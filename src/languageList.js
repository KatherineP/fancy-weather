/* eslint-disable no-undef */
const selectedLanguage = document.querySelector('.select-current');
const allLanguageOptions = document.querySelector('.select-body');
const selectItem = document.querySelectorAll('.select-item');
const selectCurrent = document.querySelector('.select-current');
const select = document.querySelector('.select');


function onLanguageListClick() {
  allLanguageOptions.classList.toggle('active-list');
  selectCurrent.classList.toggle('active-current');
}

function selectLanguage() {
  const text = this.innerText;
  selectCurrent.innerText = text;
  allLanguageOptions.classList.remove('active-list');
  selectCurrent.classList.remove('active-current');
}

function onClickOutsideMenu(event) {
  const isClickInside = select.contains(event.target);
  if (!isClickInside) {
    allLanguageOptions.classList.remove('active-list');
    selectCurrent.classList.remove('active-current');
  }
}

selectedLanguage.addEventListener('click', onLanguageListClick);

selectItem.forEach((item) => {
  item.addEventListener('click', selectLanguage);
});

document.addEventListener('click', onClickOutsideMenu);
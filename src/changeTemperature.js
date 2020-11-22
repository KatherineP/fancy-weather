/* eslint-disable no-undef */
const c = document.querySelector('.button--c');
const f = document.querySelector('.button--f');
const todayTemp = document.querySelector('.temp');


c.disabled = 'true';

function onClickFTemp() {
  todayTemp.innerText = Math.floor((todayTemp.innerText * 1.8) + 32);

  for (let i = 0; i <= 2; i++) {
    const temp1 = Array.from(document.querySelectorAll('.temperature'))[i].innerText.replace(/[^\d.]/g, '');
    Array.from(document.querySelectorAll('.temperature'))[i].innerText = `${Math.floor((temp1 * 1.8) + 32)}F`;
  }
  f.disabled = 'true';
  c.disabled = '';
}

function onClickCTemp() {
    console.log('зашла');
  todayTemp.innerText = Math.floor((todayTemp.innerText - 32) / 1.8);
  for (let i = 0; i <= 2; i++) {
    const temp1 = Array.from(document.querySelectorAll('.temperature'))[i].innerText.replace(/[^\d.]/g, '');
    Array.from(document.querySelectorAll('.temperature'))[i].innerText = `${Math.floor((temp1 - 32) / 1.8)}°`;
  }
  f.disabled = '';
  c.disabled = 'true';
}

c.addEventListener('click', onClickCTemp);
f.addEventListener('click', onClickFTemp);

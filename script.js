const acrescentar = document.querySelector('.btn-1');
const background = document.querySelector('.box-bg');

acrescentar.addEventListener('click', () => {
  background.classList.remove('hidden');
});

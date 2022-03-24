const acrescentar = document.querySelector('.btn-1');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.box');
const closeBtn = document.querySelector('.close');

const abrirModal = () => {
  overlay.classList.remove('hidden');
  box.classList.remove('hidden');
};
const fecharModal = () => {
  overlay.classList.add('hidden');
  box.classList.add('hidden');
};

acrescentar.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', fecharModal);
overlay.addEventListener('click', fecharModal);

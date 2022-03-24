const acrescentar = document.querySelector('.btn-1');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.box');
const closeBtn = document.querySelector('.close');

const nome = document.querySelector('.nome');
const data = document.querySelector('.data');
const comentario = document.querySelector('.comentario');
const submit = document.querySelector('.submit');
const alerta = document.querySelector('.alert');

const receitas = [];

const abrirModal = () => {
  overlay.classList.remove('hidden');
  box.classList.remove('hidden');
};
const fecharModal = () => {
  overlay.classList.add('hidden');
  box.classList.add('hidden');
  alerta.classList.add('hidden');
};

acrescentar.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', fecharModal);
overlay.addEventListener('click', fecharModal);
submit.addEventListener('click', () => {
  receitas.push([nome.value, data.value, comentario.value]);
  nome.value = '';
  data.value = '';
  comentario.value = '';
  alerta.classList.remove('hidden');
});

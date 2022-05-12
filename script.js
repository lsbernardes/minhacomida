import State from './src/js/state.js';
import Consultar from './src/js/consultar.js';

const overlay = document.querySelector('.overlay__card');
const box = document.querySelector('.box');
const closeBtn = document.querySelector('.close');

const adicionar = document.getElementById('add');
const index = document.querySelector('.index');
const containerConsultar = document.querySelector('.container');
const consultar = document.querySelector('.btn-2');
const nome = document.querySelector('.nome');
const data = document.querySelector('.data');
const comentario = document.querySelector('.comentario');
const submit = document.querySelector('.submit');
const alerta = document.querySelector('.alert');

const abrirModal = (evento) => {
  if (evento.target.closest('.btn-1')) {
    overlay.classList.remove('hidden');
    box.classList.remove('hidden');
    data.valueAsDate = new Date();
  }
};
const fecharModal = () => {
  overlay.classList.add('hidden');
  box.classList.add('hidden');
  alerta.classList.add('hidden');
};
const abrirConsulta = (evento) => {
  evento.preventDefault();
  index.classList.add('hidden');
  containerConsultar.classList.remove('hidden');
};

adicionar.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', fecharModal);
overlay.addEventListener('click', fecharModal);
consultar.addEventListener('click', abrirConsulta);
submit.addEventListener('click', () => {
  const item = {
    id: Math.round(Math.random() * 1000),
    nome: nome.value,
    data: [data.value],
    comentario: comentario.value,
  };
  State.receitas.push(item);
  console.log(item);

  nome.value = '';
  data.valueAsDate = new Date();
  comentario.value = '';
  alerta.classList.remove('hidden');
  localStorage.setItem('receitas', JSON.stringify(State.receitas));

  setTimeout(() => {
    alerta.classList.add('hidden');
  }, 4000);
});

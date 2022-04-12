const overlay = document.querySelector('.overlay');
const box = document.querySelector('.box');
const closeBtn = document.querySelector('.close');

const adicionar = document.getElementById('add');
const consultar = document.querySelector('.btn-2');
const nome = document.querySelector('.nome');
const data = document.querySelector('.data');
const comentario = document.querySelector('.comentario');
const submit = document.querySelector('.submit');
const alerta = document.querySelector('.alert');

let receitas = [];

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
  window.location.href = 'consultar.html';
};
const recuperarDados = () => {
  const dados = localStorage.getItem('receitas');
  if (!dados) return;

  const dadosParsed = JSON.parse(dados);
  receitas = dadosParsed;
  console.log(receitas);
};
recuperarDados();

adicionar.addEventListener('click', abrirModal);
closeBtn.addEventListener('click', fecharModal);
overlay.addEventListener('click', fecharModal);
consultar.addEventListener('click', abrirConsulta);
submit.addEventListener('click', () => {
  const item = {
    nome: nome.value,
    data: [data.value],
    comentario: comentario.value,
  };
  receitas.push(item);
  console.log(item);

  nome.value = '';
  data.valueAsDate = new Date();
  comentario.value = '';
  alerta.classList.remove('hidden');
  localStorage.setItem('receitas', JSON.stringify(receitas));

  setTimeout(() => {
    alerta.classList.add('hidden');
  }, 4000);
});

export default receitas;

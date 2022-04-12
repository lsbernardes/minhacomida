// import receitas from './script.js';

const busca = document.querySelector('.container__receitas');
const campoBusca = document.querySelector('.card__busca');
const containerReceitas = document.querySelector('.container__receitas');

let receitas = [];
let filtrado = false;

const diferData = (data) => {
  const porDia = 1000 * 60 * 60 * 24;
  const dataConv = Date.parse(data);
  const hoje = new Date();
  return Math.floor((hoje - dataConv) / porDia);
};

const ordenarDados = (receitas) => {
  return receitas.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
};

const vista = (receita, data) => {
  const dias =
    diferData(data) === 1
      ? `${diferData(data)} dia`
      : `${diferData(data)} dias`;

  const markup = `
    <div class="receita">
      <div class="card__interno card__siblings">${receita}</div>
      <div class="card__interno card__siblings">${dias}</div>
      </div>
      `;
  busca.insertAdjacentHTML('afterbegin', markup);
};

const renderReceitas = (receitasRecebidas) => {
  ordenarDados(receitasRecebidas).map((receita) => {
    const [dataString] = receita.data;
    const html = vista(receita.nome, dataString);
  });
};

const recuperarDados = () => {
  const dados = localStorage.getItem('receitas');
  if (!dados) return;

  const dadosParsed = JSON.parse(dados);
  receitas = dadosParsed;
};
recuperarDados();

const filtrar = (evento) => {
  const receitasFiltradas = receitas.filter((receita) => {
    return receita.nome.includes(evento.target.value);
  });
  if (!evento.target.value) filtrado = false;
  containerReceitas.innerHTML = '';

  renderReceitas(receitasFiltradas);
};
const filtrarEstado = (evento) => {
  filtrado = evento.target.value;
};
campoBusca.addEventListener('input', filtrar);

if (receitas.length === 0) {
  const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
  busca.insertAdjacentHTML('afterend', divContent);
}
// receitas && filtrado && renderReceitas(filtrado);
receitas && !filtrado && renderReceitas(receitas);

const busca = document.querySelector('.container__receitas');
const campoBusca = document.querySelector('.card__busca');
const containerReceitas = document.querySelector('.container__receitas');
const maxReceitas = 5;
const paginaAtual = 1;

const recuperarDados = () => {
  const dados = localStorage.getItem('receitas');
  if (!dados) return [];

  const dadosParsed = JSON.parse(dados);
  const dadosOrdenados = dadosParsed.sort(
    (a, b) => Date.parse(b.data) - Date.parse(a.data)
  );
  return dadosOrdenados;
};

let receitas = recuperarDados();
let filtrado = false;

const diferData = (data) => {
  const porDia = 1000 * 60 * 60 * 24;
  const dataConv = Date.parse(data);
  const hoje = new Date();
  return Math.floor((hoje - dataConv) / porDia);
};

const pagination = () => {
  const markup = `
  <div class="container__pagination">
      <div class="pagination__esquerda"></div>
      <div class="pagination__direita"></div>
  </div>`;

  const contReceitas = document.querySelector('.container__receitas');
  contReceitas.insertAdjacentHTML('beforeend', markup);
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

const renderReceitas = (receitasRecebidas, pagina = maxReceitas) => {
  let receitasPag;
  let paginationState = false;
  if (receitasRecebidas.length > maxReceitas) {
    receitasPag = receitasRecebidas.slice(0, maxReceitas);
    console.log(receitasPag);
  } else {
    receitasPag = receitasRecebidas;
  }

  receitasPag.map((receita) => {
    const [dataString] = receita.data;
    vista(receita.nome, dataString);
  });
  !paginationState && pagination();
};

const filtrar = (evento) => {
  const receitasFiltradas = receitas.filter((receita) => {
    return receita.nome.includes(evento.target.value);
  });
  if (!evento.target.value) filtrado = false;
  containerReceitas.innerHTML = '';

  renderReceitas(receitasFiltradas);
};

if (receitas.length === 0) {
  const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
  busca.insertAdjacentHTML('afterend', divContent);
}

campoBusca.addEventListener('input', filtrar);
receitas && !filtrado && renderReceitas(receitas);

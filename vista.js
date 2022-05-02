import State from './state.js';

const busca = document.querySelector('.container__receitas');
const campoBusca = document.querySelector('.card__busca');
const containerReceitas = document.querySelector('.container__receitas');
const containerPag = document.querySelector('.container__pagination');
const pagDireita = document.querySelector('.pagination__direita');
const pagEsquerda = document.querySelector('.pagination__esquerda');

const maxReceitas = 4;
let paginaAtual = 1;

// 1. paginacao
// 2. botão de voltar
// 3. editar receita
// 4. adicionar nova data
// 5. backend

let receitas = State.recuperarDados();
let filtrado = false;
let receitasPag = false;

const diferData = (data) => {
  const porDia = 1000 * 60 * 60 * 24;
  const dataConv = Date.parse(data);
  const hoje = new Date();
  return Math.floor((hoje - dataConv) / porDia);
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

const avalPagin = (receitas, pagina) => {
  let paginationState = false;
  const inicio = (pagina - 1) * maxReceitas;
  const fim = pagina * maxReceitas;

  if (receitas.length > maxReceitas) {
    receitasPag = receitas.slice(inicio, fim);
    paginationState = true;
  } else {
    receitasPag = receitas;
  }

  return {
    receitasPorPagina: receitasPag,
    paginationState: paginationState,
  };
};

const pagination = (pagina, numeroPaginas) => {
  State.atualizarPagina(pagina);
  containerPag.classList.remove('hidden');

  if (pagina <= 1) {
    pagDireita.innerHTML = '';
    pagDireita.insertAdjacentText('afterbegin', `página ${pagina + 1}`);
    pagEsquerda.innerHTML = '';
  } else if (pagina === numeroPaginas) {
    pagEsquerda.insertAdjacentText('afterbegin', `página ${pagina - 1}`);
    pagDireita.innerHTML = '';
  } else {
    pagDireita.insertAdjacentText('afterbegin', `página ${pagina + 1}`);
    pagEsquerda.insertAdjacentText('afterbegin', `página ${pagina - 1}`);
  }
};

const renderReceitas = (receitas, pagina = paginaAtual) => {
  const numeroPaginas = Math.ceil(receitas.length / maxReceitas);
  if (pagina > numeroPaginas) return;

  const { receitasPorPagina: receitasNovo, paginationState } = avalPagin(
    receitas,
    pagina
  );

  const receitasInvertidas = [...receitasNovo].reverse();

  containerReceitas.innerHTML = '';
  receitasInvertidas.map((receita) => {
    const [dataString] = receita.data;
    vista(receita.nome, dataString);
  });
  paginationState && pagination(pagina, numeroPaginas);
};

const filtrar = (evento) => {
  const receitasFiltradas = receitas.filter((receita) => {
    return receita.nome.includes(evento.target.value);
  });
  containerReceitas.innerHTML = '';

  if (!evento.target.value) {
    filtrado = false;
    renderReceitas(receitas);
  } else {
    filtrado = true;
    renderReceitas(receitasFiltradas);
  }
};

const passarPagina = (pagina) => {
  const atual = State.pagina();
  pagina === 'direita'
    ? renderReceitas(receitas, atual + 1)
    : renderReceitas(receitas, atual - 1);
};

if (receitas.length === 0) {
  const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
  busca.insertAdjacentHTML('afterend', divContent);
}

pagDireita.addEventListener('click', passarPagina.bind(null, 'direita'));
pagEsquerda.addEventListener('click', passarPagina.bind(null, 'esquerda'));
campoBusca.addEventListener('input', filtrar);
receitas && !filtrado && renderReceitas(receitas);

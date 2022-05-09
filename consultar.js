import State from './componentes/state.js';
import Pagination from './componentes/pagination.js';
import Vista from './componentes/vista.js';

const campoBusca = document.querySelector('.card__busca');

// 2. botão de voltar
// 3. editar receita
// 4. adicionar nova data
// 5. backend

let receitas = State.recuperarDados();
let filtrado = false;

const filtrar = (evento) => {
  const receitasFiltradas = receitas.filter((receita) => {
    return receita.nome.includes(evento.target.value);
  });
  Vista.busca.innerHTML = '';

  if (!evento.target.value) {
    filtrado = false;
    Vista.renderReceitas(receitas);
  } else {
    filtrado = true;
    Vista.renderReceitas(receitasFiltradas);
  }
};

const passarPagina = (pagina) => {
  const atual = State.pagina();
  pagina === 'direita'
    ? Vista.renderReceitas(receitas, atual + 1)
    : Vista.renderReceitas(receitas, atual - 1);
};

if (receitas.length === 0) {
  const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
  Vista.busca.insertAdjacentHTML('afterend', divContent);
}

Pagination.pagDireita.addEventListener(
  'click',
  passarPagina.bind(null, 'direita')
);
Pagination.pagEsquerda.addEventListener(
  'click',
  passarPagina.bind(null, 'esquerda')
);
campoBusca.addEventListener('input', filtrar);
receitas && !filtrado && Vista.renderReceitas(receitas);

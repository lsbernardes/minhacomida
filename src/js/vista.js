import Pagination from './pagination.js';
import { state } from './state.js';

await state.recuperarDados();

class Vista {
  paginaAtual = 1;
  container = document.querySelector('.main');
  busca = document.querySelector('.container__receitas');
  containerPag = document.querySelector('.container__pagination');
  receitaCard = document.querySelector('.receita__card');
  overlay = document.querySelector('.overlay__card');

  constructor() {
    this.container.addEventListener(
      'click',
      this.receitasIndividual.bind(this)
    );
    this.overlay.addEventListener('click', () => {
      this.container.classList.remove('hidden');
      this.receitaCard.classList.add('hidden');
      this.overlay.classList.add('hidden');
    });
  }

  diferData(data) {
    const porDia = 1000 * 60 * 60 * 24;
    const dataConv = Date.parse(data);
    const hoje = new Date();
    return Math.floor((hoje - dataConv) / porDia);
  }

  vista(receita, data, id) {
    const dias =
      this.diferData(data) === 1
        ? `${this.diferData(data)} dia`
        : `${this.diferData(data)} dias`;

    const markup = `
          <div class="receita" id=${id}>
            <div class="card__interno card__siblings">${receita}</div>
            <div class="card__interno card__siblings">${dias}</div>
            </div>
            `;
    this.busca.insertAdjacentHTML('afterbegin', markup);
  }

  async renderReceitas(receitas, pagina = this.paginaAtual) {
    const numeroPaginas = Math.ceil(receitas.length / Pagination.maxReceitas);
    if (pagina > numeroPaginas) return;

    const { receitasPorPagina, paginationState } = Pagination.avalPagin(
      receitas,
      pagina
    );

    const receitasInvertidas = [...receitasPorPagina].reverse();

    this.busca.innerHTML = '';
    receitasInvertidas.map((receita) => {
      const [dataString] = receita.data;
      this.vista(receita.nome, dataString, receita._id);
    });
    !paginationState && this.containerPag.classList.add('hidden');
    paginationState && Pagination.pagination(pagina, numeroPaginas);
  }

  receitasIndividual(evento) {
    if (!evento.target.getAttribute('class').includes('receita')) return;
    const id = evento.target.getAttribute('id');

    this.container.classList.add('hidden');
    this.receitaCard.classList.remove('hidden', 'box');
    this.overlay.classList.remove('hidden');

    console.log(state);
    const [receita] = state.receitas.filter((receita) => {
      if (receita._id == id) return receita;
    });
    const { nome, data, comentario } = receita;
    const markup = `
    <div class="receita__dados">
      <div class="header"> <h2> ${nome} </h2><div>
      <div class="data">${data}</div>
      <div class="coment"> <textarea>${comentario}</textarea> </div>
    </div>`;

    this.receitaCard.innerHTML = markup;
  }
}

const vista = new Vista();
export { vista };

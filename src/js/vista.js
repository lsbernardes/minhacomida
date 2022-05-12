import Pagination from './pagination.js';
import State from './state.js'

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
    })
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

  renderReceitas(receitas, pagina = this.paginaAtual) {
    const numeroPaginas = Math.ceil(receitas.length / Pagination.maxReceitas);
    if (pagina > numeroPaginas) return;

    const { receitasPorPagina: receitasNovo, paginationState } =
      Pagination.avalPagin(receitas, pagina);

    const receitasInvertidas = [...receitasNovo].reverse();

    this.busca.innerHTML = '';
    receitasInvertidas.map((receita) => {
      const [dataString] = receita.data;
      this.vista(receita.nome, dataString, receita.id);
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

    const [receita] = State.receitas.filter(receita => {
      if (receita.id == id ) return receita
    });
    const { nome, data, comentario } = receita;
    const markup = `
    <div class="receita__dados">
      <div class="header"> <h2> ${nome} </h2><div><div class="data">${data}</div>
      <div class="coment">${comentario}<div>
    </div>`

    this.receitaCard.innerHTML = markup
  }
}

export default new Vista();

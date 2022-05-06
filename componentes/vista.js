import Pagination from './pagination.js';

class Vista {
  paginaAtual = 1;
  containerReceitas = document.querySelector('.container__receitas');
  busca = document.querySelector('.container__receitas');
  containerPag = document.querySelector('.container__pagination');

  diferData(data) {
    const porDia = 1000 * 60 * 60 * 24;
    const dataConv = Date.parse(data);
    const hoje = new Date();
    return Math.floor((hoje - dataConv) / porDia);
  }

  vista(receita, data) {
    const dias =
      this.diferData(data) === 1
        ? `${this.diferData(data)} dia`
        : `${this.diferData(data)} dias`;

    const markup = `
          <div class="receita">
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

    this.containerReceitas.innerHTML = '';
    receitasInvertidas.map((receita) => {
      const [dataString] = receita.data;
      this.vista(receita.nome, dataString);
    });
    !paginationState && this.containerPag.classList.add('hidden');
    paginationState && Pagination.pagination(pagina, numeroPaginas);
  }
}

export default new Vista();

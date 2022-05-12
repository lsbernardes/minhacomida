import State from './state.js';

class Pagination {
  maxReceitas = 4;
  receitasPag = false;
  containerPag = document.querySelector('.container__pagination');
  pagDireita = document.querySelector('.pagination__direita');
  pagEsquerda = document.querySelector('.pagination__esquerda');

  avalPagin(receitas, pagina) {
    let paginationState = false;
    const inicio = (pagina - 1) * this.maxReceitas;
    const fim = pagina * this.maxReceitas;

    if (receitas.length > this.maxReceitas) {
      this.receitasPag = receitas.slice(inicio, fim);
      paginationState = true;
    } else {
      paginationState = false;
      this.receitasPag = receitas;
    }

    return {
      receitasPorPagina: this.receitasPag,
      paginationState: paginationState,
    };
  }

  pagination(pagina, numeroPaginas) {
    State.atualizarPagina(pagina);
    this.containerPag.classList.remove('hidden');

    if (pagina <= 1) {
      this.pagDireita.innerHTML = '';
      this.pagDireita.insertAdjacentText('afterbegin', `página ${pagina + 1}`);
      this.pagEsquerda.innerHTML = '';
    } else if (pagina === numeroPaginas) {
      this.pagEsquerda.insertAdjacentText('afterbegin', `página ${pagina - 1}`);
      this.pagDireita.innerHTML = '';
    } else {
      this.pagDireita.insertAdjacentText('afterbegin', `página ${pagina + 1}`);
      this.pagEsquerda.insertAdjacentText('afterbegin', `página ${pagina - 1}`);
    }
  }
}

export default new Pagination();

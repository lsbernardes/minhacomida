// import { state, vista } from './state.js';
import Pagination from './pagination.js';
import { vista } from './vista.js';
import { state } from './state.js';

class Consultar {
  campoBusca = document.querySelector('.card__busca');
  receitas = state.receitas;
  filtrado = false;
  passarBind = this.passarPagina.bind(this);

  // 2. botão de voltar
  // 3. editar receita
  // 4. adicionar nova data
  // 5. backend

  constructor() {
    this.campoBusca.addEventListener('input', this.filtrar.bind(this));
    this.receitas && !this.filtrado && vista.renderReceitas(this.receitas);

    if (this.receitas.length === 0) {
      const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
      vista.busca.insertAdjacentHTML('afterend', divContent);
    }

    Pagination.pagDireita.addEventListener(
      'click',
      this.passarBind.bind(null, 'direita')
    );
    Pagination.pagEsquerda.addEventListener(
      'click',
      this.passarBind.bind(null, 'esquerda')
    );
  }

  filtrar(evento) {
    const receitasFiltradas = this.receitas.filter((receita) => {
      return receita.nome.includes(evento.target.value);
    });
    vista.busca.innerHTML = '';

    if (!evento.target.value) {
      this.filtrado = false;
      vista.renderReceitas(this.receitas);
    } else {
      this.filtrado = true;
      vista.renderReceitas(receitasFiltradas);
    }
  }

  passarPagina(pagina) {
    const atual = State.pagina();
    pagina === 'direita'
      ? vista.renderReceitas(this.receitas, atual + 1)
      : vista.renderReceitas(this.receitas, atual - 1);
  }
}

export default new Consultar();

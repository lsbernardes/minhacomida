import State from './state.js';
import Pagination from './pagination.js';
import Vista from './vista.js';

class Consultar {
  campoBusca = document.querySelector('.card__busca');
  receitas = State.recuperarDados();
  filtrado = false;
  passarBind = this.passarPagina.bind(this);

  // 2. botão de voltar
  // 3. editar receita
  // 4. adicionar nova data
  // 5. backend

  constructor() {
    this.campoBusca.addEventListener('input', this.filtrar.bind(this));
    this.receitas && !this.filtrado && Vista.renderReceitas(this.receitas);

    if (this.receitas.length === 0) {
      const divContent = `<div class="card__siblings">Não há dados armazenados</div>`;
      Vista.busca.insertAdjacentHTML('afterend', divContent);
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
    Vista.busca.innerHTML = '';

    if (!evento.target.value) {
      this.filtrado = false;
      Vista.renderReceitas(this.receitas);
    } else {
      this.filtrado = true;
      Vista.renderReceitas(receitasFiltradas);
    }
  }

  passarPagina(pagina) {
    const atual = State.pagina();
    pagina === 'direita'
      ? Vista.renderReceitas(this.receitas, atual + 1)
      : Vista.renderReceitas(this.receitas, atual - 1);
  }
}

export default new Consultar();

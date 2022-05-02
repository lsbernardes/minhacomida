class State {
  paginaAtual = 1;
  receitas = '';

  constructor() {
    this.receitas = this.recuperarDados();
    this.atualizarPagina();
  }
  atualizarPagina(paginaAtualizada = this.paginaAtual) {
    if (!paginaAtualizada) return;
    const dados = {
      pagina: paginaAtualizada,
    };
    this.paginaAtual = paginaAtualizada;
    localStorage.setItem('state', JSON.stringify(dados));
  }

  pagina() {
    const dados = localStorage.getItem('state');
    const { pagina: pag } = JSON.parse(dados);
    console.log(pag);
    return pag;
  }

  recuperarDados() {
    const dados = localStorage.getItem('receitas');
    if (!dados) return [];

    const dadosParsed = JSON.parse(dados);
    const dadosOrdenados = dadosParsed.sort(
      (a, b) => Date.parse(a.data) - Date.parse(b.data)
    );
    return dadosOrdenados;
  }
}

export default new State();

const fetchHandler = async (url, post = false) => {
  const res = !post
    ? await fetch(url, { mode: 'cors' })
    : await fetch(url, post);
  const data = await res.json();
  return data;
};

class State {
  paginaAtual = 1;
  receitas = [];

  constructor() {
    this.recuperarDados();
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

  async recuperarDados() {
    // const dados = localStorage.getItem('receitas');
    const dados = await fetchHandler('http://127.0.0.1:3000/api/v1/receita');
    if (!dados) return [];

    const dadosParsed = await dados.data.receita;
    const dadosOrdenados = dadosParsed.sort(
      (a, b) => Date.parse(a.data) - Date.parse(b.data)
    );
    this.receitas = dadosOrdenados;
    return { dadosOrdenados, receitas: this.receitas };
  }

  async enviarReceita(item) {
    const res = await fetch('http://127.0.0.1:3000/api/v1/receita', {
      method: 'POST',
      mode: 'cors',
      body: item,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    await this.recuperarDados();
  }
}

export const state = new State();

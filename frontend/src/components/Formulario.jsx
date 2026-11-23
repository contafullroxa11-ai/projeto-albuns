import { useState } from "react";

function Formulario({ adicionarItem }) {
  const [enviando, setEnviando] = useState(false);

  async function enviarFormulario(event) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const dados = new FormData(formulario);
    const novoItem = {
      titulo: dados.get("titulo").trim(),
      artista: dados.get("artista").trim(),
      ano: dados.get("ano"),
      avaliacao: Number(dados.get("avaliacao")),
    };
    setEnviando(true);
    const salvou = await adicionarItem(novoItem);
    setEnviando(false);
    if (salvou) formulario.reset();
  }

  return (
    <form onSubmit={enviarFormulario}>
      <h2>Cadastrar álbum</h2>
      <input name="titulo" placeholder="Nome do álbum" maxLength="50" required />
      <input name="artista" placeholder="Artista" maxLength="50" required />
      <label className="campo">Data de lançamento<input name="ano" type="date" required /></label>
      <label className="campo">Avaliação (0 a 10)<input name="avaliacao" type="number" placeholder="Nota" min="0" max="10" step="0.1" required /></label>
      <button type="submit" disabled={enviando}>{enviando ? "Salvando..." : "Cadastrar álbum"}</button>
    </form>
  );
}

export default Formulario;

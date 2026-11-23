import { useEffect, useMemo, useState } from "react";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Resumo from "./components/Resumo";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/album/";

function App() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarAlbuns() {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error("Não foi possível buscar os álbuns no Django.");
      setItens(await resposta.json());
    } catch {
      setErro("Não consegui conectar ao backend. Confira se o Django está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarAlbuns(); }, []);

  async function adicionarItem(novoItem) {
    setErro("");
    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoItem),
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || "Não foi possível cadastrar o álbum.");
      await carregarAlbuns();
      return true;
    } catch (error) {
      setErro(error.message || "Erro ao cadastrar o álbum.");
      return false;
    }
  }

  const itensFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return itens.filter((album) => `${album.titulo} ${album.artista}`.toLowerCase().includes(termo));
  }, [itens, busca]);

  const total = itens.length;
  const media = total
    ? (itens.reduce((soma, album) => soma + Number(album["avaliação"]), 0) / total).toFixed(1)
    : "0";
  const melhorItem = total
    ? itens.reduce((melhor, album) => Number(album["avaliação"]) > Number(melhor["avaliação"]) ? album : melhor).titulo
    : "";

  return (
    <main className="container">
      <h1>Minha Coleção de Álbuns</h1>
      <p className="subtitulo">Consulte seus álbuns musicais favoritos</p>
      <Resumo total={total} media={media} melhorItem={melhorItem} />
      <Formulario adicionarItem={adicionarItem} />
      <div className="busca">
        <h2>Buscar álbum</h2>
        <input type="text" placeholder="Digite o nome do álbum ou artista" value={busca} onChange={(event) => setBusca(event.target.value)} />
      </div>
      {erro && <p className="mensagem erro">{erro}</p>}
      {carregando ? <p className="mensagem">Carregando álbuns...</p> : <Lista itens={itensFiltrados} />}
    </main>
  );
}

export default App;

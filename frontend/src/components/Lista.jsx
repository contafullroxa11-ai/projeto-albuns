function Lista({ itens }) {
  if (itens.length === 0) return <p>Nenhum álbum encontrado.</p>;

  return (
    <section>
      <h2>Álbuns cadastrados</h2>
      {itens.map((album) => (
        <article className="album-card" key={album.id}>
          <h3>{album.titulo}</h3>
          <p><strong>Artista:</strong> {album.artista}</p>
          <p><strong>Data:</strong> {new Date(`${album.ano}T12:00:00`).toLocaleDateString("pt-BR")}</p>
          <p><strong>Avaliação:</strong> {Number(album["avaliação"]).toFixed(1)}</p>
        </article>
      ))}
    </section>
  );
}

export default Lista;

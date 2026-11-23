
function Resumo({ total, media, melhorItem }) {
  return (
    <div className="resumo">
      <h2>Resumo da coleção</h2>

      <p>Total de itens: {total}</p>

      <p>Média: {media}</p>

      <p>
        Melhor item: {melhorItem || "Nenhum"}
      </p>
    </div>
  );
}

export default Resumo;

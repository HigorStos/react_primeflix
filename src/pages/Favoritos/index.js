import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");

    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    const filmesFiltrados = filmes.filter((filme) => filme.id !== id);

    setFilmes(filmesFiltrados);
    localStorage.setItem("@primeflix", JSON.stringify(filmesFiltrados));

    toast.success("Filme removido com sucesso!");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && (
        <span>{`Você não possui nenhum filme salvo :(`}</span>
      )}

      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
              <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;

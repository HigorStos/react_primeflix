import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./home.css";

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "1ffc9593e8534c21a44b2df66dd617c7",
          language: "pt-BR",
          page: "1",
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="loading">Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
            />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;

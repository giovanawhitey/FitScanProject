import { useEffect, useState } from "react";

function ListaMetas({ atualizar }) {
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setCarregando(true);
    setErro("");

    fetch("http://localhost:8080/metas")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar metas");
        }
        return resposta.json(); 
      })
      .then((dados) => setMetas(dados))
      .catch(() => setErro("Nao foi possivel carregar as metas."))
      .finally(() => setCarregando(false));
  }, [atualizar]);

  function mostrarMensagem() {
    if (carregando) {
      return <p className={styles.mensagem}>Carregando metas...</p>;
    }

    if (erro) {
      return <p className={styles.erro}>{erro}</p>;
    }

    if (metas.length === 0) {
      return <p className={styles.mensagem}>Nenhuma meta cadastrada ainda.</p>;
    }

    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>Metas cadastradas</h2>

      {mostrarMensagem()}

      <div className={styles.grade}>
        {metas.map((meta) => (
          <article key={meta.id} className={styles.card}>
            <h3 className={styles.cardTitulo}>{meta.nome}</h3>
            <p><strong>Peso atual:</strong> {meta.pesoAtual}</p>
            <p><strong>Peso objetivo:</strong> {meta.pesoObjetivo}</p>
            <p><strong>Altura:</strong> {meta.altura}</p>
            <p><strong>Prazo:</strong> {meta.prazoMeta}</p>
            <p><strong>Observacao:</strong> {meta.observacao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListaMetas;
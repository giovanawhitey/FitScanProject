import { useEffect, useState } from "react";
import styles from "./ListaMetas.module.css";

function ListaMetas({ atualizar }) {
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function buscarMetas() {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8080/metas");

      if (!resposta.ok) {
        setErro("Erro ao buscar metas.");
        return;
      }

      const dados = await resposta.json();

      setMetas(dados);

    } catch (erro) {
      setErro("Não foi possível conectar com a API.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarMetas();
  }, [atualizar]);

  function mostrarMensagem() {
    if (carregando) {
      return (
        <p className={styles.mensagem}>
          Carregando metas...
        </p>
      );
    }

    if (erro) {
      return (
        <p className={styles.erro}>
          {erro}
        </p>
      );
    }

    if (metas.length === 0) {
      return (
        <p className={styles.mensagem}>
          Nenhuma meta cadastrada ainda.
        </p>
      );
    }

    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>
        Metas cadastradas
      </h2>

      {mostrarMensagem()}

      <div className={styles.grade}>
        {metas.map((meta) => (
          <div
            key={meta.id}
            className={styles.card}
          >
            <h3 className={styles.cardTitulo}>
              {meta.nome}
            </h3>

            <p>Data de nascimento: {meta.dataNascimento}</p>

            <p>Peso atual: {meta.pesoAtual} kg</p>

            <p>Altura: {meta.altura} m</p>

            <p>Objetivo: {meta.objetivo}</p>

            <p>IMC: {meta.imc}</p>

            <p>Classificação: {meta.classificacao}</p>

            <p>Sugestão: {meta.sugestao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaMetas;
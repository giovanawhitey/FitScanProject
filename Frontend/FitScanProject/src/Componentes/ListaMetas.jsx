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

  function formatarIMC(imc) {
    return Number(imc).toFixed(1).replace(".", ",");
  }

  function formatarClassificacao(classificacao) {
    if (!classificacao) {
      return "Não informado";
    }

    const classificacaoFormatada = classificacao.toLowerCase();

    if (classificacaoFormatada === "obesidade") {
      return "Acima da faixa saudável";
    }

    if (classificacaoFormatada === "sobrepeso") {
      return "Acima da faixa recomendada";
    }

    if (classificacaoFormatada === "normal") {
      return "Dentro da faixa considerada saudável";
    }

    if (classificacaoFormatada === "baixo peso") {
      return "Abaixo da faixa recomendada";
    }

    return classificacao;
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

            <p>
              Data de nascimento: {meta.dataNascimento}
            </p>

            <p>
              Peso atual: {meta.pesoAtual} kg
            </p>

            <p>
              Altura: {meta.altura} m
            </p>

            <p>
              Objetivo: {meta.objetivo}
            </p>

            <div className={styles.imcBox}>
              <span className={styles.imcLabel}>
                Seu IMC é: <br />
              </span>

              <span className={styles.imcValor}>
                {formatarIMC(meta.imc)}
              </span>

              <span className={styles.imcDescricao}>
                  <br />Resultado calculado com base no seu peso e altura
              </span>

              <p className={styles.classificacao}>
                {formatarClassificacao(meta.classificacao)}
              </p>
            </div>

            <div className={styles.sugestao}>
              <p className={styles.sugestaoTitulo}>
               <b> Sugestão para você:</b>
              </p>

              <p>
                {meta.sugestao}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaMetas;
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
      <h2 className={styles.titulo}>Metas cadastradas</h2>

      {mostrarMensagem()}

      <div className={styles.grade}>
        {metas.map((meta) => (
          <div key={meta.id} className={styles.card}>
            <h3 className={styles.cardTitulo}>{meta.nome}</h3>

            <p>
              <b>Data de nascimento: </b>
              {meta.dataNascimento}
            </p>

            <p>
              <b>Peso atual: </b>
              {meta.pesoAtual} kg
            </p>

            <p>
              <b>Altura: </b> {meta.altura}
            </p>

            <p>
              <b>Objetivo: </b>{" "}
              {meta.objetivo === "GANHAR_MASSA" ? "Ganhar Massa" : "Emagrecer"}
            </p>

            <div className={styles.imcBox}>
              <div className={styles.imcTitulo}>
                <b>Seu IMC é:</b> {formatarIMC(meta.imc)}
              </div>

              <p className={styles.imcDescricao}>
                Este resultado é calculado com base no seu peso e altura.
              </p>

              <p className={styles.classificacao}>
                {formatarClassificacao(meta.classificacao)}
              </p>
            </div>

            <div className={styles.sugestao}>
              <h4 className={styles.sugestaoTitulo}>Sugestão para você:</h4>

              <p className={styles.sugestaoTexto}>{meta.sugestao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaMetas;

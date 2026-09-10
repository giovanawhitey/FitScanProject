import styles from "./Informacoes.module.css";

function Informacoes() {
  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>
        💗 Conheça o FitScan
      </h2>

      <p className={styles.texto}>
       O FitScan ajuda a acompanhar os dados e objetivos dos alunos de forma simples e prática. Com informações como peso, altura e objetivo, é possível acompanhar os resultados e a evolução de cada aluno.
      </p>

      <div className={styles.divisor}></div>

      <h3 className={styles.subtitulo}>
        O que é o IMC?
      </h3>

      <p className={styles.texto}>
        O IMC, ou Índice de Massa Corporal, é uma medida utilizada para
        relacionar o peso e a altura de uma pessoa. Ele ajuda a identificar
        uma faixa de peso e oferece uma referência para acompanhar seus dados.
      </p>

      <h3 className={styles.subtitulo}>
        Como ele é calculado?
      </h3>

      <div className={styles.formula}>
        IMC = peso ÷ (altura × altura)
      </div>

      <p className={styles.observacao}>
        O IMC é apenas uma referência e deve ser interpretado junto a outros
        fatores. Ele não representa, sozinho, uma avaliação completa da saúde.
      </p>
    </section>
  );
}

export default Informacoes;
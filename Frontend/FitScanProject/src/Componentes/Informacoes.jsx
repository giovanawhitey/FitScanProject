import styles from "./Informacoes.module.css";

function Informacoes() {
  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>
        💗 Conheça o FitScan
      </h2>

      <p className={styles.texto}>
        O FitScan é uma ferramenta de acompanhamento que
        utiliza informações como peso, altura e objetivo
        para ajudar você a acompanhar seus resultados.
      </p>

      <div className={styles.divisor}></div>

      <h3 className={styles.subtitulo}>
        📊 O que é o IMC?
      </h3>

      <p className={styles.texto}>
        IMC significa Índice de Massa Corporal. É um cálculo
        que relaciona o peso de uma pessoa com sua altura
        para indicar uma faixa de classificação do peso.
      </p>

      <h3 className={styles.subtitulo}>
        🧮 Como ele é calculado?
      </h3>

      <div className={styles.formula}>
        IMC = peso ÷ (altura × altura)
      </div>

      <p className={styles.observacao}>
        O IMC é um indicador baseado nesse cálculo e não
        representa, sozinho, uma avaliação completa da saúde.
      </p>
    </section>
  );
}

export default Informacoes;
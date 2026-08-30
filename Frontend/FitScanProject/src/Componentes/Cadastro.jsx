import { useState } from "react";
import styles from "./Cadastro.module.css";

function Cadastro({ onMetaCriada }) {
  const [form, setForm] = useState({
    nome: "",
    pesoAtual: "",
    pesoObjetivo: "",
    altura: "",
    prazoMeta: "",
    observacao: ""
  });
  const [mensagem, setMensagem] = useState("");

  function alterarCampo(event) {
    const { name, value } = event.target;
    setForm((dadosAntigos) => ({
      ...dadosAntigos,
      [name]: value
    }));
  }

  function limparFormulario() {
    setForm({
      nome: "",
      pesoAtual: "",
      pesoObjetivo: "",
      altura: "",
      prazoMeta: "",
      observacao: ""
    });
  }

  async function cadastrar() {
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:8080/metas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!resposta.ok) {
        setMensagem("Erro " + resposta.status);
        return;
      }

      await resposta.json();
      limparFormulario();
      setMensagem("Meta cadastrada com sucesso!");
      onMetaCriada();
    } catch (erro) {
      setMensagem("Nao foi possivel cadastrar a meta.");
    }
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Cadastro de Metas da Academia  FitScan</h1>

      <div className={styles.formulario}>
        <label className={styles.label}>
          Nome
          <input
            className={styles.input}
            type="text"
            name="nome"
            value={form.nome}
            onChange={alterarCampo}
            placeholder="Digite o nome"
          />
        </label>

        <label className={styles.label}>
          Peso Atual
          <input
            className={styles.input}
            type="number"
            name="pesoAtual"
            value={form.pesoAtual}
            onChange={alterarCampo}
            placeholder="Digite o peso atual"
            step="0.01"
          />
        </label>

        <label className={styles.label}>
          Peso Objetivo
          <input
            className={styles.input}
            type="number"
            name="pesoObjetivo"
            value={form.pesoObjetivo}
            onChange={alterarCampo}
            placeholder="Digite o peso objetivo"
            step="0.01"
          />
        </label>

        <label className={styles.label}>
          Altura
          <input
            className={styles.input}
            type="number"
            name="altura"
            value={form.altura}
            onChange={alterarCampo}
            placeholder="Digite a altura"
            step="0.01"
          />
        </label>

        <label className={styles.label}>
          Prazo da Meta
          <input
            className={styles.input}
            type="date"
            name="prazoMeta"
            value={form.prazoMeta}
            onChange={alterarCampo}
          />
        </label>

        <label className={styles.label}>
          Observação
          <textarea
            className={styles.textarea}
            name="observacao"
            value={form.observacao}
            onChange={alterarCampo}
            placeholder="Digite uma observação"
          />
        </label>

        <button className={styles.button} type="button" onClick={cadastrar}>
          Salvar
        </button>
      </div>
      {mensagem && <p className={styles.message}>{mensagem}</p>}
    </section>
  );
}

export default Cadastro;

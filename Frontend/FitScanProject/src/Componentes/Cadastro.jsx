import { useState } from "react";
import styles from "./Cadastro.module.css";

function Cadastro({ onMetaCriada }) {
  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    pesoAtual: "",
    altura: "",
    objetivo: ""
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
      dataNascimento: "",
      pesoAtual: "",
      altura: "",
      objetivo: ""
    });
  }

  async function cadastrar() {
  setMensagem("");

  const dadosEnviados = {
    ...form,
    pesoAtual: Number(form.pesoAtual),
    altura: Number(form.altura)
  };

  console.log("DADOS ENVIADOS:", dadosEnviados);

  try {
    const resposta = await fetch("http://localhost:8080/metas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosEnviados)
    });

    console.log("STATUS:", resposta.status);

   if (!resposta.ok) {
  const erroBack = await resposta.text();

  setMensagem(erroBack);

  return;
}

    const dados = await resposta.json();

    console.log("RESPOSTA:", dados);

    limparFormulario();
    setMensagem("Cadastro realizado com sucesso!");

    onMetaCriada();

  } catch (erro) {
    console.log("ERRO FETCH:", erro);
    setMensagem("Nao foi possivel realizar o cadastro.");
  }
}

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Cadastro FitScan</h1>

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
          Data de nascimento
          <input
            className={styles.input}
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={alterarCampo}
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
            placeholder="Ex: 80"
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
            placeholder="Ex: 1.60"
            step="0.01"
          />
        </label>

        <label className={styles.label}>
          Objetivo
          <select
            className={styles.input}
            name="objetivo"
            value={form.objetivo}
            onChange={alterarCampo}
          >
            <option value="">Selecione um objetivo</option>
            <option value="EMAGRECER">Emagrecer</option>
            <option value="GANHAR_MASSA">Ganhar massa muscular</option>
          </select>
        </label>

        <button
          className={styles.button}
          type="button"
          onClick={cadastrar}
        >
          Salvar
        </button>
      </div>

      {mensagem && (
        <p className={styles.message}>
          {mensagem}
        </p>
      )}
    </section>
  );
}

export default Cadastro;
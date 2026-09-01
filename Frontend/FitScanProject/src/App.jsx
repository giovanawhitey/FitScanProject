import { useState } from "react";
import Cadastro from "./Componentes/Cadastro";
import ListaMetas from "./Componentes/ListaMetas";
import Navbar from "./Componentes/Navbar";

export default function App() {
  const [atualizarLista, setAtualizarLista] = useState(0);

  function recarregarLista() {
    setAtualizarLista((valorAtual) => valorAtual + 1);
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <Cadastro onMetaCriada={recarregarLista} />

        <ListaMetas atualizar={atualizarLista} />
      </main>
    </>
  );
}
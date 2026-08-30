import { useState } from "react";
import Cadastro from "./Componentes/Cadastro";
import ListaMetas from "./Componentes/ListaMetas";

export default function App() {
  const [atualizarLista, setAtualizarLista] = useState(0);

  function recarregarLista() {
    setAtualizarLista((valorAtual) => valorAtual + 1);
  }

  return (
    <main>
      <Cadastro onMetaCriada={recarregarLista} />
      <ListaMetas atualizar={atualizarLista} />
    </main>
  );
}

import { useEffect, useState, useRef } from "react";
import ProdutoCard from "../components/ProdutoCard";
import caminhaRosa from "../assets/caminha.png";
import coleiraLacinho from "../assets/coleira.png";
import peitoralFloral from "../assets/peitoral.png";
import "./Produtos.css";

const produtosIniciais = [
  {
    id: 1,
    nome: "Caminha rosa fofinha",
    preco: 99.9,
    imagem: caminhaRosa,
    descricao:
      "Confortável, macia e perfeita para deixar o cantinho do pet mais charmoso.",
  },
  {
    id: 2,
    nome: "Coleira com Lacinho",
    preco: 79.9,
    imagem: coleiraLacinho,
    descricao:
      "Delicada, confortável e perfeita para deixar o passeio do pet ainda mais estiloso.",
  },
  {
    id: 3,
    nome: "Peitoral Floral com Lacinho",
    preco: 129.9,
    imagem: peitoralFloral,
    descricao:
      "Confortável, delicado e perfeito para deixar os passeios do seu pet ainda mais charmosos.",
  },
];

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const inputImagemRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoProduto = {
      id: Date.now(),
      nome,
      preco: Number(preco),
      descricao,
      imagem,
    };

    setProdutos([...produtos, novoProduto]);

    setNome("");
    setPreco("");
    setDescricao("");
    setImagem("");
    inputImagemRef.current.value = "";
  };

  const excluirProduto = (id) => {
    const novaLista = produtos.filter((produto) => produto.id !== id);
    setProdutos(novaLista);
  };

  useEffect(() => {
    setTimeout(() => {
      setProdutos(produtosIniciais);
      setCarregando(false);
    }, 2000);
  }, []);

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }
  return (
    <section>
      <h2>Cadastro de Produtos</h2>

      <form className="form-produto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          ref={inputImagemRef}
          onChange={(e) => {
            const arquivo = e.target.files[0];
            if (arquivo) {
              setImagem(URL.createObjectURL(arquivo));
            }
          }}
        />

        <button type="submit">Adicionar Produto</button>
      </form>

      <div className="grid-produtos">
        {produtos.map((produto) => (
          <ProdutoCard
            id={produto.id}
            key={produto.id}
            nome={produto.nome}
            preco={produto.preco}
            imagem={produto.imagem}
            descricao={produto.descricao}
            onExcluir={excluirProduto}
          />
        ))}
      </div>
    </section>
  );
}

export default Produtos;

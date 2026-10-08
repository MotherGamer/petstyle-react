import imagemEmBreve from "../assets/em_breve.png";
import "./ProdutoCard.css";

function ProdutoCard({ imagem, nome, preco, descricao, id, onExcluir }) {
  return (
    <article className="produto-card">
      <img
        className="imagem-produto"
        src={imagem || imagemEmBreve}
        alt={nome}
      />
      <h3 className="nome-produto">{nome}</h3>

      <p className="descricao-produto">{descricao}</p>

      <p className="preco-produto">
        Preço: R$ {preco.toFixed(2).replace(".", ",")}
      </p>

      <button type="button" onClick={() => onExcluir(id)}>
        Excluir
      </button>
    </article>
  );
}

export default ProdutoCard;

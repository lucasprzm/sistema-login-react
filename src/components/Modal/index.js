import "./modal.css";
import { FiX } from "react-icons/fi";

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color="#fff" />
          Voltar
        </button>
        <div>
          <h2>Detalhes do Chamado</h2>
          <div className="row">
            <span>
              Cliente:<u>{conteudo.cliente}</u>
            </span>
          </div>
          <div className="row">
            <span>
              Assunto: <u>{conteudo.assunto}</u>
            </span>
            <span>
              Cadastrado em:<u>{conteudo.createdFormatted}</u>
            </span>
          </div>
          <div className="row">
            <span>
              Status:{" "}
              <u
                style={{
                  color: "#fff",
                  backgroundColor:
                    conteudo.status === "Aberto" ? "#5cb85c" : "#999",
                }}
              >
                {conteudo.status}
              </u>
            </span>
          </div>
          {conteudo.complemento !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

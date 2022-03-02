import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import "./new.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function New() {
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection("customers")
        .get()
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });
          if (lista.length === 0) {
            console.log("Nenhuma Empresa Encontrada");
            setCustomers([{ id: "1", nomeFantasia: "Freela" }]);
            setLoadCustomers(false);
            return;
          }
          setCustomers(lista);
          setLoadCustomers(false);
        })
        .catch((error) => {
          console.log("Deu algum erro!");
          setLoadCustomers(false);
          setCustomers([{ id: "1", nomeFantasia: "" }]);
        });
    }
    loadCustomers();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    await firebase
      .firestore()
      .collection("chamados")
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Chamado criado com sucesso!");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops! Erro ao registrar, tente mais tarde.");
        console.log(error);
      });
  }
  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }
  function handleChangeCustomers(e) {
    // console.log("Index do Cliente Selecionado:", e.target.value);
    // console.log("Cliente Selecionado", customers[e.target.value]);
    setCustomerSelected(e.target.value);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>
            {loadCustomers ? (
              <input
                type="text"
                disabled={true}
                value="Carregando Clientes..."
              />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}
            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Em Andamento</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>
            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

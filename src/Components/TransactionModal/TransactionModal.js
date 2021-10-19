import { useContext } from "react";
import { TransactionContext } from "../../Contexts/TransactionContext";
import InputMask from "react-input-mask";

export default function TransactionModal() {
   const {
      editTransaction,
      setEditTransaction,
      form,
      setForm,
      formInitialState,
      setIsModalOpen,
      handleChange,
      handleEdit,
      handleCreate,
   } = useContext(TransactionContext);

   return (
      <div className="modal">
         <div className="modal-container">
            <div className="title-close">
               <h1>{`${editTransaction ? "Editar " : "Adicionar"}`} Registro</h1>
               <div>
                  <img
                     src="/assets/close.svg"
                     alt="Close Modal"
                     className="close-icon"
                     onClick={() => {
                        setForm(formInitialState);
                        setIsModalOpen(false);
                        setEditTransaction(false);
                     }}
                  />
               </div>
            </div>
            <div className="credit-debit-btn">
               <button
                  className="credit-button"
                  onClick={() => setForm({ ...form, type: "credit" })}
                  style={{
                     background: `${
                        form.type === "credit"
                           ? "linear-gradient(91.26deg, #05EDE3 0%, #3A9FF1 97.77%)"
                           : "#b9b9b9"
                     }`,
                  }}>
                  Entrada
               </button>
               <button
                  className="debit-button"
                  onClick={() => setForm({ ...form, type: "debit" })}
                  style={{
                     background: `${
                        form.type === "debit"
                           ? "linear-gradient(91.66deg, #FA8C10 0%, #FF576B 90.32%)"
                           : "#b9b9b9"
                     }`,
                  }}>
                  Saída
               </button>
            </div>
            <form>
               <div>
                  <label htmlFor="value">Valor</label>
                  <input
                     id="value"
                     name="value"
                     value={form.value}
                     onChange={handleChange}
                     type="number"
                  />
               </div>
               <div>
                  <label htmlFor="category">Categoria</label>
                  <input
                     id="category"
                     name="category"
                     value={form.category}
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <label htmlFor="date">Data</label>
                  <InputMask
                     id="date"
                     mask="9999/99/99"
                     name="date"
                     value={form.date}
                     onChange={handleChange}
                     style={{ marginLeft: "64px" }}
                  />
               </div>
               <div>
                  <label htmlFor="description">Descrição</label>
                  <input
                     id="description"
                     name="description"
                     value={form.description}
                     onChange={handleChange}
                  />
               </div>
            </form>
            <div className="submit">
               <button
                  className="btn-insert"
                  type="submit"
                  onClick={editTransaction ? handleEdit : handleCreate}>
                  Confirmar
               </button>
            </div>
         </div>
      </div>
   );
}

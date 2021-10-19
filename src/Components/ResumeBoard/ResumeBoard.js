import { useContext } from "react";
import { ResumeContext } from "../../Contexts/ResumeContext";

export default function ResumeBoard() {
   const { transactions, form, setForm, setIsModalOpen } = useContext(ResumeContext);

   return (
      <div className="right-side">
         <div className="container-resume">
            <div>
               <h2>Resumo</h2>
               <div className="resume-in">
                  <span>Entradas</span>
                  <span className="in" style={{ color: "#645ffb" }}>
                     {`R$ ${transactions
                        .filter((t) => t.type === "credit")
                        .reduce((acc, curr) => acc + Number(curr.value), 0)}`}
                  </span>
               </div>
               <div className="resume-out">
                  <span>Saídas</span>
                  <span className="out" style={{ color: "#fa8c10" }}>
                     {`R$ ${transactions
                        .filter((t) => t.type === "debit")
                        .reduce((acc, curr) => acc + Number(curr.value), 0)}`}
                  </span>
               </div>
            </div>
            <div className="resume-balance">
               <span>
                  <b>Saldo</b>
               </span>
               <span className="balance" style={{ color: "#3a9ff1" }}>
                  {`R$ ${transactions.reduce(
                     (acc, curr) =>
                        curr.type === "credit"
                           ? acc + Number(curr.value)
                           : acc - Number(curr.value),
                     0
                  )}`}
               </span>
            </div>
         </div>
         <button
            className="btn-add"
            onClick={() => {
               setForm({ ...form, type: "credit" });
               setIsModalOpen(true);
            }}>
            Adicionar Registro
         </button>
      </div>
   );
}

import { useContext } from "react";
import { LogContext } from "../Contexts/LogContext";

export default function Log(props) {
   const { deleteModal, setDeleteModal, handleDelete, setEditTransaction } =
      useContext(LogContext);

   const date = new Date(props.t.date);

   return (
      <div className="table-line">
         <span className="line-items">
            <b>
               {date.toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
               })}
            </b>
         </span>
         <span className="line-items">{props.t.week_day}</span>
         <span className="line-items">{props.t.description}</span>
         <span className="line-items">{props.t.category}</span>
         <span className="line-items">
            <b
               style={{
                  color: `${props.t.type == "credit" ? "#7B61FF" : "#FA8C10"}`,
               }}>
               R$ {props.t.value}
            </b>
         </span>
         <div className="edit-delete-icon">
            <button>
               <img
                  src="/assets/editar.svg"
                  alt="Editar registro."
                  className="edit-icon"
                  onClick={() => setEditTransaction(props.t)}
               />
            </button>
            <button>
               <img
                  src="/assets/excluir.svg"
                  alt="Excluir registro."
                  className="delete-icon"
                  onClick={() => setDeleteModal(props.t.id)}
               />
            </button>

            {deleteModal === props.t.id && (
               <div className="container-confirm-delete" id={props.t.id}>
                  <p>Apagar item?</p>
                  <div className="btn-actions-confirm-delete">
                     <button
                        className="yes-btn"
                        onClick={() => {
                           handleDelete(props.t.id);
                           setDeleteModal(false);
                        }}>
                        Sim
                     </button>
                     <button className="no-btn" onClick={() => setDeleteModal(false)}>
                        Não
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

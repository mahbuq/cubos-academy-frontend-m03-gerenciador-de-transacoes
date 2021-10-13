import { useContext } from "react";
import { ColumnContext } from "../Contexts/ColumnContext";

export default function ColumnButton(props) {
   const { id, children } = props;
   const { column, setColumn, orderAsc, setOrderAsc } = useContext(ColumnContext);

   function handleClickColumn() {
      setColumn(id);
      setOrderAsc(true);
   }

   return (
      <div className="column-title" id={id}>
         <button onClick={handleClickColumn}>{children}</button>
         <button onClick={() => (orderAsc ? setOrderAsc(false) : setOrderAsc(true))}>
            {column == id && (
               <img
                  src="/assets/arrow.svg"
                  alt="Ordenar"
                  className="arrow"
                  style={{
                     transform: `${orderAsc ? "rotate(180deg)" : "rotate(360deg)"}`,
                  }}
               />
            )}
         </button>
      </div>
   );
}

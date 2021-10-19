import ColumnButton from "./ColumnButton/ColumnButton";

export default function ColumnHeader() {
   return (
      <div className="table-head">
         <ColumnButton id="date">Data</ColumnButton>
         <ColumnButton id="week-day">Dia da Semana</ColumnButton>
         <div>
            <span className="column-title">Descrição</span>
         </div>
         <div>
            <span className="column-title">Categoria</span>
         </div>
         <div>
            <ColumnButton id="value">Valor</ColumnButton>
         </div>
         <div className="null-div" />
      </div>
   );
}

import { useContext, useState } from "react";
import { FiltersContext } from "../Contexts/FiltersContext";
import Chip from "./Chip";

export default function FilterOptions() {
   const { transactions, checked, setChecked, setFiltered } = useContext(FiltersContext);

   const [min, setMin] = useState(0);
   const [max, setMax] = useState(Infinity);

   function handleClearFilter() {
      setFiltered();
      setChecked([]);
      setMin(0);
      setMax(Infinity);
   }

   function handleFilters(filters) {
      let valueFilter = [];
      let categoryFilter = [];
      let newTransactions = [];

      transactions.filter((t) => {
         if (t.value >= min && t.value <= max) {
            valueFilter.push(t);
         }
      });

      if (checked.length === 0) {
         valueFilter.map((t) => newTransactions.push(t));
      } else {
         for (const key of filters) {
            valueFilter.filter((t) => {
               if (t.category === key) {
                  categoryFilter.push(t);
               }
            });
         }
         if (categoryFilter.length === 0) {
            valueFilter.map((t) => categoryFilter.push(t));
         }

         for (const key of filters) {
            categoryFilter.filter((t) => {
               if (t.week_day === key) {
                  newTransactions.push(t);
               }
            });
         }
         if (newTransactions.length === 0) {
            categoryFilter.map((t) => newTransactions.push(t));
         }
      }

      setFiltered(newTransactions);
   }

   return (
      <div className="container-filters">
         <div className="day-filter">
            <h2 className="filter-title">Dia da semana</h2>
            <div className="day-options">
               <Chip>Segunda</Chip>
               <Chip>Terça</Chip>
               <Chip>Quarta</Chip>
               <Chip>Quinta</Chip>
               <Chip>Sexta</Chip>
               <Chip>Sábado</Chip>
               <Chip>Domingo</Chip>
            </div>
         </div>

         <div className="category-filter">
            <h2 className="filter-title">Categoria</h2>
            <div className="category-options">
               {transactions
                  .reduce(
                     (acc, curr) =>
                        acc.includes(curr.category) ? acc : [...acc, curr.category],
                     []
                  )
                  .map((category, index) => (
                     <Chip key={index}>{category}</Chip>
                  ))}
            </div>
         </div>

         <div className="value-filter">
            <h2 className="filter-title">Valor</h2>
            <label className="value-label">Min</label>
            <input
               type="number"
               className="value-options"
               onChange={(e) => setMin(Number(e.target.value))}
               value={min}
            />
            <label className="value-label">Max</label>
            <input
               type="number"
               className="value-options"
               onChange={(e) => setMax(Number(e.target.value))}
               value={max}
            />
         </div>

         <div style={{ alignSelf: "flex-end" }}>
            <button className="btn-clear-filters" onClick={handleClearFilter}>
               Limpar Filtros
            </button>
            <button className="btn-apply-filters" onClick={() => handleFilters(checked)}>
               Aplicar Filtros
            </button>
         </div>
      </div>
   );
}

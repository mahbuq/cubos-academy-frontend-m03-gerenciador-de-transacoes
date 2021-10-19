/* Dependencies */
import { useEffect, useState } from "react";

/* Components */
import ColumnHeader from "./Components/ColumnHeader/ColumnHeader";
import FilterOptions from "./Components/FilterOptions/FilterOptions";
import Log from "./Components/Log/Log";
import ResumeBoard from "./Components/ResumeBoard/ResumeBoard";
import TransactionModal from "./Components/TransactionModal/TransactionModal";

/* Contexts */
import { ColumnContext } from "./Contexts/ColumnContext";
import { FiltersContext } from "./Contexts/FiltersContext";
import { LogContext } from "./Contexts/LogContext";
import { ResumeContext } from "./Contexts/ResumeContext";
import { TransactionContext } from "./Contexts/TransactionContext";

function App() {
   const [transactions, setTransactions] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editTransaction, setEditTransaction] = useState(false);
   const [column, setColumn] = useState("date");
   const [orderAsc, setOrderAsc] = useState(true);
   const [showFilter, setShowFilter] = useState(false);
   const [checked, setChecked] = useState([]);
   const [filtered, setFiltered] = useState();
   const [rows, setRows] = useState([]);

   const formInitialState = {
      value: "",
      category: "",
      date: "",
      week_day: "",
      description: "",
      type: "credit",
   };
   const [form, setForm] = useState({ ...formInitialState });

   const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

   useEffect(() => {
      loadTransactions();
   }, []);

   useEffect(() => {
      if (editTransaction) {
         setForm(editTransaction);
         setIsModalOpen(true);
         return;
      }

      setForm(formInitialState);
   }, [editTransaction]);

   useEffect(() => {
      if (!filtered) {
         setRows([...transactions]);
      } else {
         setRows([...filtered]);
      }
   }, [filtered, transactions]);

   async function loadTransactions() {
      try {
         const response = await fetch("http://localhost:3333/transactions", {
            method: "GET",
         });

         const data = await response.json();
         setTransactions(data);
      } catch (error) {
         console.log(error);
      }
   }

   function handleChange({ target }) {
      setForm({ ...form, [target.name]: target.value });
   }

   async function handleCreate() {
      if (!form.date || !form.value || !form.category || !form.description) {
         alert("Todos os campos devem ser preenchidos!");
         return;
      }

      const date = new Date(form.date);

      const data = { ...form, date: date, week_day: days[date.getDay()] };

      try {
         const response = await fetch("http://localhost:3333/transactions", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         await response.json();
      } catch (error) {
         console.log(error);
      }

      setForm({
         ...formInitialState,
      });
      setIsModalOpen(false);

      loadTransactions();
   }

   async function handleDelete(id) {
      try {
         await fetch(`http://localhost:3333/transactions/${id}`, {
            method: "DELETE",
         });

         loadTransactions();
      } catch (error) {
         console.log(error);
      }
   }

   async function handleEdit() {
      if (!form.date || !form.value) return;

      const date = new Date(form.date);

      const data = { ...form, date: date, week_day: days[date.getDay()] };

      try {
         const response = await fetch(
            `http://localhost:3333/transactions/${editTransaction.id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            }
         );

         await response.json();
      } catch (error) {
         console.log(error);
      }

      setForm({
         ...formInitialState,
      });
      setIsModalOpen(false);
      setEditTransaction(false);

      loadTransactions();
   }

   return (
      <div className="App">
         <header className="container-header">
            <img src="/assets/dindin-logo.svg" alt="Logo" />
            <h1>Dindin</h1>
         </header>
         <div className="main-ctn">
            <div className="left-side">
               <button
                  className="open-filters-button"
                  onClick={() => (showFilter ? setShowFilter(false) : setShowFilter(true))}>
                  <img src="/assets/filtro.svg" />
                  <span>Filtrar</span>
               </button>

               {showFilter && (
                  <FiltersContext.Provider
                     value={{ transactions, checked, setChecked, setFiltered }}>
                     <FilterOptions />
                  </FiltersContext.Provider>
               )}

               <div className="table">
                  <ColumnContext.Provider value={{ column, setColumn, orderAsc, setOrderAsc }}>
                     <ColumnHeader />
                  </ColumnContext.Provider>

                  <div className="table-body">
                     <LogContext.Provider
                        value={{
                           handleDelete,
                           setEditTransaction,
                        }}>
                        {rows
                           .sort((a, b) =>
                              column === "date"
                                 ? orderAsc
                                    ? new Date(a.date) - new Date(b.date)
                                    : new Date(b.date) - new Date(a.date)
                                 : column === "week-day"
                                 ? orderAsc
                                    ? new Date(a.date).getDay() - new Date(b.date).getDay()
                                    : new Date(b.date).getDay() - new Date(a.date).getDay()
                                 : orderAsc
                                 ? a.value - b.value
                                 : b.value - a.value
                           )
                           .map((t) => (
                              <Log key={t.id} t={t} />
                           ))}
                     </LogContext.Provider>
                  </div>
               </div>
            </div>

            <ResumeContext.Provider value={{ transactions, form, setForm, setIsModalOpen }}>
               <ResumeBoard />
            </ResumeContext.Provider>
         </div>

         <TransactionContext.Provider
            value={{
               editTransaction,
               setEditTransaction,
               form,
               setForm,
               formInitialState,
               setIsModalOpen,
               handleChange,
               handleEdit,
               handleCreate,
            }}>
            {isModalOpen && <TransactionModal />}
         </TransactionContext.Provider>
      </div>
   );
}

export default App;

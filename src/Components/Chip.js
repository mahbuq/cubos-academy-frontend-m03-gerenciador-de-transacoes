import { useContext } from "react";
import { FiltersContext } from "../Contexts/FiltersContext";

export default function Chip(props) {
   const { checked, setChecked } = useContext(FiltersContext);
   const { children } = props;

   function handleClickFilter(id) {
      checked.includes(id)
         ? setChecked(checked.filter((item) => item !== id))
         : setChecked([...checked, id]);
   }

   return (
      <div>
         <button
            className="container-chip"
            id={children}
            style={{
               backgroundColor: `${checked.indexOf(children) >= 0 ? "#7B61FF" : "white"}`,
               color: `${checked.indexOf(children) >= 0 ? "white" : "black"}`,
            }}
            onClick={(e) => handleClickFilter(e.target.id)}>
            {children}
            <img
               src={`${checked.includes(children) ? "/assets/x.svg" : "/assets/plus.svg"}`}
               className="icon-filter"
               alt="Filtrar."
            />
         </button>
      </div>
   );
}

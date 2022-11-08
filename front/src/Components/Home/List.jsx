import { useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";

function List() {

  const { rows } = useContext(Home);

console.log(rows)

  return (
    <div className="card m-4">
      <h5 className="card-header">Stories List</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        
        {
          rows?.map(r => <Line key={r.id} row={r} />
          )
        }
      </ul>
    </div>
  );
}
export default List;

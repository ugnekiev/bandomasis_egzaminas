import { useContext } from "react";
import Ideas from "../../Contexts/Ideas";
import Line from "./Line";

function List() {

  const { ideas } = useContext(Ideas);
console.log(ideas)
  return (
    <div className="card m-4">
      <h5 className="card-header">Stories list</h5>
      <div className="card-body"></div>
      <ul className="list-group">
        {
          ideas?.map(i => <Line key={i.id} idea={i} />
          )
        }
      </ul>
    </div>
  );
}
export default List;

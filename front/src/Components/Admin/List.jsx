
import Line from "./Line";

function List({ rows }) {
  console.log(rows)

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card m-4">
            <h5 className="card-header">Stories List</h5>
            <div className="card-body"></div>
            <ul className="list-group">
              {
                rows?.map((r, i) => <Line key={i} row={r} />
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default List;

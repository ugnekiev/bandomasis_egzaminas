

function Line({ row }) {



    const collected = row[1].reduce((prev, curr) => prev + curr.donation, 0)
    const goal = row[1][0].donation_sum
    console.log(row)



    return (
        <li className="list-group-item">

            <div className="home">
                <div className="home__content">
                    <div className="home__content__name">
                        {row[0]}
                        <h5>GOAL: {goal}</h5>
                        <h2><i>COLLECTED: {collected} LEFT: {goal - collected}</i></h2>
                    </div>
                    <div className="home__content__comment">{row[1][0].story}</div>
                    <h2 className="home__content__title">donors:</h2>
                    <ul className="home__content__donors">
                    {row[1].map(obj => 
                    
                            <li key={obj.did}>
                                {obj.name} {obj.surname} {obj.donation}
                            </li>
                      )}
                      </ul>
                </div>
            </div>
        </li>
    )
}

export default Line;


function Line({ row }) {

    
  


    console.log(row)

   

    return (
        <li className="list-group-item">

            <div className="home">
                <div className="home__content">
                    <div className="home__content__title">
                        <h2 className="home__content__name">GOAL: {row.donation_sum}</h2>
                    </div>
                    <div className="home__content__comment">{row.story}</div>
                    <div className="home__content__comment"> Donors:
                        <li>
                            {row.name}{row.surname}{row.donation}
                        </li>
                    </div>
                  
                </div>
            </div>
        </li>
    )
}

export default Line;
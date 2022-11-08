

function Line({ row }) {

    
  


    console.log(row)

   

    return (
        <li className="list-group-item">

            <div className="home">
                <div className="home__content">
                    <div className="home__content__title">
                        {row[0]}
                        GOAL: {row[1][0].donation_sum}
                        </div>
                        {row[1].map(obj=> <> 
                    
                    <div className="home__content__comment">{obj.story}</div>
                    <div className="home__content__comment"> Donors:
                        <li>
                            {obj.name}{obj.surname}{obj.donation}
                        </li>
                    </div></>)}
                       
                  
                </div>
            </div>
        </li>
    )
}

export default Line;
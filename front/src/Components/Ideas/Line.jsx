import { useContext } from "react";
import Ideas from "../../Contexts/Ideas";


function Line({ idea }) {

    const { ideas, setModalData, setDeleteData } = useContext(Ideas);

    console.log(idea)
    console.log(setDeleteData);
    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__comment">{idea.story}</div>
                    <div className="home__content__info">
                        {idea.image ? <div className='img-bin'>
                            <img src={idea.image} alt={idea.name}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="home__content__comment">{idea.donation_sum}</div>

                </div>
                <div className="line__buttons">
                <button onClick={() => setModalData(ideas)}type="button" className="btn btn-outline-primary">Edit</button>
                <button onClick={() => setDeleteData(ideas)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
                
            </div>
        </li>
         
    )
}

export default Line;


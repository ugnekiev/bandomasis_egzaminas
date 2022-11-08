import { useContext, useState, useRef } from 'react';
import Ideas from '../../Contexts/Ideas';
import getBase64 from '../../Functions/getBase64';


function Create() {

const [title, setTitle] = useState ('');
const [story, setStory] = useState ('');
const [donation_sum, setDonation_sum] = useState ('');

const fileInput = useRef();
const [photoPrint, setPhotoPrint] = useState(null);

const { setCreateData } = useContext(Ideas);

const doPhoto = () => {
  getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    })
}

const create = () => {
  setCreateData({
    title,
    story,
    donation_sum,
    image: photoPrint
    
  });
  setTitle('');
  setStory('');
  setDonation_sum('');
  setPhotoPrint(null);
  fileInput.current.value = null;
}

  return (
    <div className="card m-4">
    <h5 className="card-header">Tell the Story</h5>
    <div className="card-body">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Story</label>
        <input type="text" className="form-control" value={story} onChange={e => setStory(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Add photo</label>
        <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
      </div>
      {photoPrint ? <div className='img-bin'>
        <label htmlFor="image-delete">X</label>
        <input id="image-delete" type="checkbox"></input>
        <img src={photoPrint} alt="upload"></img>
      </div> : null}
      <div className="mb-3">
        <label className="form-label">Goal</label>
        <input type="number" className="form-control" value={donation_sum} onChange={e => setDonation_sum(e.target.value)} />
      </div>
      <button onClick={create} type="button" className="btn btn-outline-dark">Create</button>
    </div>
  </div>
  );
        }

export default Create;

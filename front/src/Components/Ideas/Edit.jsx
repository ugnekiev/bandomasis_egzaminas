import { useState, useContext, useEffect, useRef } from 'react';
import Ideas from '../../Contexts/Ideas';
import getBase64 from '../../Functions/getBase64';


function Edit() {

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [donation_sum, setDonation_sum] = useState('');

  const [photoPrint, setPhotoPrint] = useState(null);

  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
        // tylim
      })
  }

  const { modalData, setModalData, setEditData } = useContext(Ideas);

  const edit = () => {
    setEditData({
      title,
      story,
      donation_sum,
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint

    })
    //kad po "save" uzsidarytu modalas
    setModalData(null);
    setDeletePhoto(false);

  }

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setStory(modalData.story);
    setDonation_sum(modalData.donation_sum);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData])

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Story</h5>
            <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {/* cia isicopinam CREATE struktura */}
            <div className="card m-4">

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
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setModalData(null)} type="button" className="btn btn-secondary">Close</button>
              <button onClick={edit} type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Edit;

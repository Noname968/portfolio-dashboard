import firebase from '../firebase';
import { useState } from 'react';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import './Create.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const firestore = firebase.firestore()
  const [name, setname] = useState('');
  const [git, setgit] = useState('');
  const [demo, setdemo] = useState('');
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  const [progress, setProgress] = useState(0);

  const notify = () => toast.success("Uploaded Successfully")

  const notifyupload = () => {
    if (name !== '' && git !== '' && demo !== '' && image !== '') {
      toast("Uploading...", {
        autoClose: 4000,
      })
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    const uploadTask = imageRef.put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          await firestore.collection('projects').add({
            name: name,
            git: git,
            demo: demo,
            imageUrl: downloadURL,
          }).then(() => {
            setname('')
            setgit('')
            setdemo('')
            setImage(null)
            notify();
          })
        });
      }
    );

  };

  return (
    <>
      <section className="vh">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 ">
              <form onSubmit={handleFormSubmit}>
                <h2 className="mt-1 mb-4 pb-1">Project Details</h2>
                <div className="form-outline mb-3">
                  <input type="text" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Project Name" value={name} onChange={(e) => setname(e.target.value)} required />
                </div>
                <div className="form-outline mt-1 mb-3">
                  <input type="text" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Github Link" value={git} onChange={(e) => setgit(e.target.value)} required />
                </div>
                <div className="form-outline mt-2 mb-3">
                  <input type="text" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Demo Link" value={demo} onChange={(e) => setdemo(e.target.value)} required />
                </div>
                <div className="form-outline mt-2 mb-3">
                  <input type="file" id="customFile" className="form-control form-control-lg"
                    placeholder="Select File" accept="image/png, image/jpeg" onChange={handleImageChange} required />
                </div>
                <div className="text-center text-start pt-2 mb-4">
                  <button type="submit" className="btn btn-primary btn-lg" onClick={notifyupload}>Submit</button>
                </div>
              </form>
              {
                image &&
                <><img src={image ? window.URL.createObjectURL(image) : ""} alt="" style={{ height: "125px" }} />
                </>
              }
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Create;
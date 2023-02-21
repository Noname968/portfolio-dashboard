import React, { useState } from 'react'
import './Create.css'
import firebase from '../firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Delete() {
    const [name, setname] = useState('');
    const firestore = firebase.firestore()

    const notifydeleted = () => toast.success(`Deleted successfully`);
    const notifyfailed = (error) => toast.error(`Failed to delete. ` + error);

    const handledelete = (event) => {
        event.preventDefault();
        const usersRef = firestore.collection('projects');

        usersRef.where('name', '==', name).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    notifyfailed('No such project')
                } else {
                    const userRef = querySnapshot.docs[0].ref;
                    userRef.delete()
                        .then(() => {
                            console.log('Document successfully deleted!');
                            notifydeleted();
                            setname('')
                        })
                        .catch((error) => {
                            console.error('Error deleting document: ', error);
                            notifyfailed(error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error getting document: ', error);
                notifyfailed(error);
            });

    }

    return (
        <>
            <section className="vh">
                <div className="container-fluid h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 ">
                            <form onSubmit={handledelete}>
                                <h2 className="mt-1 mb-4 pb-1">Delete Project</h2>
                                <div className="form-outline mb-3">
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Project Name" value={name} onChange={(e) => setname(e.target.value)} required />
                                </div>
                                <div className="text-center text-start pt-2 mb-4">
                                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Delete

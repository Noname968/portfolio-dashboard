import React, { useState } from 'react'
import firebase from '../firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './Create.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
    const [name, setname] = useState('');
    const [git, setgit] = useState('');
    const [demo, setdemo] = useState('');

    const notifyDataUpdated = () => toast.success(`Updated successfully`);
    const notifyfailed = (error) => toast.error(`Failed to update. ` + error);

    const firestore = firebase.firestore()

    const handleSubmit = (event) => {
        event.preventDefault();
        const userRef = firestore.collection('projects');
        const newData = {};

        if (name !== '') {
            newData.name = name;
        }

        if (demo !== '') {
            newData.demo = demo;
        }

        if (git !== '') {
            newData.git = git;
        }

        userRef.where('name', '==', `${name}`)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    notifyfailed("Check project Name")
                }
                else {
                    querySnapshot.forEach((doc) => {
                        doc.ref.update(newData)
                        notifyDataUpdated();
                        setname('')
                        setdemo('')
                        setgit('')
                    });
                }
            })
            .catch((error) => {
                console.error('Error getting documents: ', error);
                notifyfailed(error);
            });
    }

    return (
        <>
            <section className="vh">
                <div className="container-fluid h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 ">
                            <form onSubmit={handleSubmit}>
                                <h2 className="mt-1 mb-4 pb-1">Update Project Details</h2>
                                <div className="form-outline mb-3">
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Project Name" value={name} onChange={(e) => setname(e.target.value)} required />
                                </div>
                                <div className="form-outline mt-1 mb-3">
                                    <input type="text" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Github Link" value={git} onChange={(e) => setgit(e.target.value)} />
                                </div>
                                <div className="form-outline mt-2 mb-3">
                                    <input type="text" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Demo Link" value={demo} onChange={(e) => setdemo(e.target.value)} />
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

export default Update

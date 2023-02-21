import firebase from '../firebase';
import { useState } from 'react';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import './Read.css'

function Read() {
    const [projects, setprojects] = useState([])
    const [loading, setloading] = useState(true)
    const firestore = firebase.firestore()
    const usersRef = firestore.collection('projects');

    usersRef.get()
        .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                const user = {
                    id: doc.id,
                    ...doc.data()
                };
                data.push(user);
            });
            setprojects(data);
            setloading(false)
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
        });

    return (
        <div className='works'>
            {
                loading ? (<div className="k"><div className="spinner-border " role="status" >
                    <span class="visually-hidden">Loading...</span>
                </div></div>) : (
                    <>
                        <h2 className='h2'>Projects</h2>
                        <div className="allp">
                            {projects.map((item) => {
                                return (
                                    <div className="singlep" key={item.id}>
                                        <div className="allimgs">
                                            <img src={item.imageUrl} alt="" className="pimg" />
                                        </div>
                                        <h3 className='h3'>Name: {item.name}</h3>
                                        <h3 className='h3'>Git: {item.git}</h3>
                                        <h3 className='h3'>Demo: {item.demo}</h3>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default Read

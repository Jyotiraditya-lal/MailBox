import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Sent.css'

const Sent=()=>{

    const [SentMail,setSentMail]=useState([])
    const [modal,setModal]=useState(false)
    const [selectedMail, setSelectedMail] = useState(null); 
    const DataKey=[]
    const FromMail=useSelector((state)=>state.Auth.FromMail)

    useEffect(() => {
        const fetchMail = async () => {
            try {
                const response = await fetch(
                    "https://mailbox-f4ddb-default-rtdb.asia-southeast1.firebasedatabase.app/mail.json"
                );
                if (!response.ok) {
                    throw new Error("Could not fetch sent emails");
                }
                const data = await response.json();
                console.log(data);
    
                for (const key in data) {
                    const objectsArray = Object.values(data[key]);
                    DataKey.push(...objectsArray);
                }
    
                const LoadedMails = DataKey
                    .filter((data) => FromMail === data.FromEmail)
                    .map((data) => ({
                        ToEmail: data.ToEmail,
                        sub: data.sub,
                        body: data.text,
                    }));
                setSentMail(LoadedMails);
            } catch (err) {
                alert(err.message);
            }
        };
    
        fetchMail();
    }, []);
    

    const SelectedMailHandler=(mail)=>{
        setSelectedMail(mail)
        setModal(true)
    }

    const closeModal=()=>{
        setModal(false)
    }

    return(
       <React.Fragment>
            <div className="inbox-container">
                <h1>Sent</h1>
                <ul className="mail-list">
                   {SentMail.map((details)=>
                      <li key={Math.random()} onClick={SelectedMailHandler.bind(null,details)}>
                        <span className="To">{details.ToEmail}</span>
                        <span className="subject">{details.sub}</span>       
                      </li>
                    )}
                </ul> 
            </div>
            {modal && selectedMail && (
                <div>
                <div className="backdrop" onClick={closeModal}></div>
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>X</span>
                        <p>To: {selectedMail.ToEmail}</p>
                        <p>Subject: {selectedMail.sub}</p>
                        <p> {selectedMail.body}</p>  
                    </div>
               </div>
               </div>

            )}
        </React.Fragment>
    )
}

export default Sent
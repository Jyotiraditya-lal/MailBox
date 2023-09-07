import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Inbox.css';


const Inbox = () => {
  const mail = useSelector((state) => state.Auth.FromMail);
  const newMail = mail.replace(/[@.]/g, "");
  
  const [loadedMails, setLoadedMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMail = async () => {
        try {
          const response = await fetch(
            `https://mailbox-f4ddb-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${newMail}.json`
          );
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const data = await response.json();
          const mails = [];
          for (const key in data) {
            mails.push({
              id: key, 
              from: data[key].FromEmail,
              sub: data[key].sub,
              text: data[key].text,
              isRead: localStorage.getItem(key) === 'true', 
            });
          }
          
          setLoadedMails(mails);
        } catch (err) {
          alert(err.message);
        }
      };

      fetchMail();
      const intervalId = setInterval(fetchMail, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }, [newMail]);
  
    const handleMailItemClick = (mail) => {
      if (!mail.isRead) {
        
        localStorage.setItem(mail.id, 'true');
        
        setLoadedMails((prevMails) =>
          prevMails.map((m) => (m.id === mail.id ? { ...m, isRead: true } : m))
        );
      }
      setSelectedMail(mail);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const DeleteMail= async (id,event)=>{

        event.stopPropagation();
        try{
            const response= await fetch(`https://mailbox-f4ddb-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${newMail}/${id}.json`,{
                method: 'DELETE'
            })

            if(!response.ok){
                throw new Error('Somethig went wrong while deleting the mail')
            }

            setLoadedMails((prevMails) =>
               prevMails.filter((m) => m.id !== id)
        );
        }catch(err){
            alert(err.message)
        }
    }
  
    return (
      <React.Fragment>
        <div className="inbox-container">
          <h1>Inbox</h1>
          <ul className="mail-list">
            {loadedMails.map((details) => (
              <li
                key={details.id} 
                className={`mail-item ${details.isRead ? "" : "unread"}`} 
                onClick={() => handleMailItemClick(details)} 
              >
                {details.isRead || <span className="blue-dot" />} 
                <span className="from">{details.from}</span>
                <span className="subject">{details.sub}</span>
                <span className="button">
                    <button onClick={(event) => DeleteMail(details.id,event)}>Delete Mail</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && selectedMail && (
        <div>
        <div className="backdrop" onClick={closeModal}></div>
        <div className="modal">
          <div className="modal-content">
            <p>From: {selectedMail.from}</p>
            <p>Subject: {selectedMail.sub}</p>
            <p> {selectedMail.text}</p>
            <span className="close-btn" onClick={closeModal}>
              X
            </span>
          </div>
        </div>
        </div>
      )}
    </React.Fragment>
  )
  
};

export default Inbox;

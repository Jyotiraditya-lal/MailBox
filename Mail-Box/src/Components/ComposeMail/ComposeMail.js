import React, { useState } from "react";
import './ComposeMail.css'; 
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../Store/Mail-redux";

const ComposeMail = () => {

    const [email, setEmail] = useState('')
    const [sub, setSub] = useState('')
    const [body, setBody] = useState('')
    const dispatch=useDispatch()
    const fromMail=useSelector((state)=>state.Auth.FromMail)
    

   

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubChange = (event) => {
        setSub(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSend = async() => {
        
       try{
        const NewMail=email.replace(/[@.]/g, "")

        const response=await fetch(`https://mailbox-f4ddb-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${NewMail}.json`,{
        method: 'POST',
        body: JSON.stringify({
            ToEmail: email,
            sub: sub,
            text: body,
            FromEmail: fromMail
        })
       })
       if(!response.ok){
        throw new Error('Could not send the mail')
       }else{
        dispatch(AuthActions.MailDetails(email))
        alert('Mail Sent!')
       }
       }catch(err){
        alert(err.message)
       }

        
        setEmail('');
        setSub('');
        setBody('');
    };

    return (
        <div className="compose-container">
            <div className="form-group">
                <label className="label-col">To:</label>
                <input
                    className="compose-input"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Recipients"
                />
            </div>
            <div className="form-group">
                <label className="label-col">Subject:</label>
                <input
                    className="compose-input"
                    value={sub}
                    onChange={handleSubChange}
                    placeholder="Subject"
                />
            </div>
            <div className="form-group">
                <textarea
                    className="compose-body"
                    value={body}
                    onChange={handleBodyChange}
                    placeholder="Compose your email..."
                />
            </div>
            <div className="form-group">
                <button className="compose-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ComposeMail;

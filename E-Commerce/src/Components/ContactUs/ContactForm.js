import React, { useRef } from 'react';

import classes from './ContactForm.module.css';

function ContactForm(props) {
  const NameRef = useRef('');
  const EmailRef = useRef('');
  const NumberRef = useRef('');

  function submitHandler(event) {
    
    event.preventDefault();

    const info = {
      name: NameRef.current.value,
      emailId: EmailRef.current.value,
      phoneNumber: NumberRef.current.value,
    };
    NameRef.current.value=''
    EmailRef.current.value=''
    NumberRef.current.value=''

    props.onSendInfo(info);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' ref={NameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='id'>Email Id:</label>
        <input id='id' ref={EmailRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor='number'>Phone Number:</label>
        <input type='number' id='number' ref={NumberRef} />
      </div>
      <button>Send Info</button>
    </form>
  );
}

export default ContactForm;

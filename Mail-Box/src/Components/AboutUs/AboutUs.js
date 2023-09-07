
import React from "react";
import  "./AboutUs.css"; 

const AboutUs = () => {
  return (
    <div className='about-container'>
      <h1 className='about-title'>About Us</h1>
      <h2 className='about-heading'>Welcome to Mailbox</h2>
      <p className='about-paragraph'>
        At Mailbox, we are committed to simplifying and enhancing your email experience.
        Our application aims to provide you with a modern and intuitive platform for managing your emails efficiently and effectively.
        Whether you're a busy professional, a student, or someone who wants to stay organized, Mailbox has you covered.
      </p>
      <h2 className='about-heading'>Our Mission</h2>
      <p className='about-paragraph'>
        Our mission is to empower users to regain control of their email communications.
        We understand the challenges of managing a constantly growing inbox, and that's why we built Mailbox to help you declutter, prioritize, and respond to your emails with ease.
        Our team is dedicated to providing a reliable and secure service that streamlines your email workflow and saves you valuable time.
      </p>
    </div>
  );
};

export default AboutUs;

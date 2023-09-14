import React, { useState } from 'react';
import {  gmailIcon, slackIcon, teamsIcon } from '../../assets/icons';
import './emailShare.css';

function generateConversationContent(userQuery, answer) {
  let conversationContent = '';
  const userQuestion = userQuery;
  const botAnswer = answer;

  conversationContent += `User: ${userQuestion}\nBot: ${botAnswer}\n\n`;

  return conversationContent;
}


function EmailShare({ userQuery, answer ,handleEmailClick,index}) {

  const handleShareEmail = () => {

    // Generate the conversation content as a string
    const conversationContent = generateConversationContent(userQuery, answer);

    // Create a Blob containing the conversation content as a text file
    const conversationBlob = new Blob([conversationContent], {
      type: 'text/plain',
    });

    // Create a URL for the Blob
    const conversationUrl = URL.createObjectURL(conversationBlob);

    // Create a new email link with the conversation content file as an attachment
    const emailLink = `mailto:?subject=Conversation%20Content&body=Please%20find%20the%20conversation%20content%20attached`;

    // Open the user's default email client
    window.location.href = emailLink;
    handleEmailClick(index);
  };
  return (
    <div className='share-button-container'>
      {/* You can add a button or any UI element to trigger the email share */}
        <button className="mail-share-icon" onClick={handleShareEmail}><img src={gmailIcon} alt ='mail'/></button>
        <button className="mail-share-icon" ><img src={teamsIcon} alt ='teams'/></button>
        <button className="mail-share-icon" ><img src={slackIcon} alt ='slack'/></button>
    </div>
  );
}

export default EmailShare;

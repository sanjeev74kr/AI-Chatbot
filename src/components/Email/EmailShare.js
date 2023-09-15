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

function generateBlobLink(conversationContent){
    // Create a Blob containing the conversation content as a text file
     const conversationBlob = new Blob([conversationContent], {
     type: 'text/plain',
  });
  // Create a URL for the Blob
  const conversationUrl = URL.createObjectURL(conversationBlob);
 return conversationUrl;
}



function EmailShare({ userQuery, answer ,handleEmailClick,index}) {
  const conversationContent = generateConversationContent(userQuery, answer);
  const conversationUrl=generateBlobLink(conversationContent);

  const handleShareEmail = () => {
 
    // Create a new email link with the conversation content file as an attachment
    const emailLink = `mailto:?subject=Conversation%20Content&body=Please%20find%20the%20conversation%20content%20attached`;

    // Open the user's default email client
    window.location.href = emailLink;
    handleEmailClick(index);
  };

  function handleShareTeams() {
    const message = encodeURIComponent("Please find the conversation content attached.");
    const teamsLink = `msteams://compose?chat=${message}`;
    
    window.location.href = teamsLink;
    handleEmailClick(index);
  }
  

  return (
    <div className='share-button-container'>
      {/* You can add a button or any UI element to trigger the email share */}
        <button className="mail-share-icon" onClick={handleShareEmail}><img src={gmailIcon} alt ='mail'/></button>
        <button className="mail-share-icon" onClick={handleShareTeams}><img src={teamsIcon} alt ='teams'/></button>
        {/* <button className="mail-share-icon" ><img src={slackIcon} alt ='slack'/></button> */}
        <a href="https://slack.com/intl/en-in/signin?redir=%2Fshare%2Fadd" target="_blank">
        <img alt="Share to Slack" src={slackIcon} />
        </a>
    </div>
  );
}

export default EmailShare;

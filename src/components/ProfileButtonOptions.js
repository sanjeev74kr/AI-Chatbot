import React from "react";
import '../styles/profileButtonOptions.css'

function ProfileButtonOptions() {
    return (
        <div className="profile-options-container">
            <div className="manage-account-container ">
                <img className="profile-options-icon" src="./manage-account-icon.svg" alt="manage-account-icon"/>
                <p className="option" >Manage Account</p>
            </div>
            <div className="signOut-container">
                <img className="profile-options-icon" src="./signOut-icon.svg" alt="signOut-icon"/>
                <p className="option">Sign out</p>
            </div>
        </div>
    )
}

export default ProfileButtonOptions;
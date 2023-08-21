import React from "react";
import '../css/ProfileButtonOptions.css'

function ProfileButtonOptions() {
    return (
        <div className="profile-options-container">
            <div className="manage-account-container">
                <img className="profile-options-icon" src="" alt=""/>
                <p className="option" >Manage Account</p>
            </div>
            <div className="signOut-container">
                <img profile-options-icon src="" alt=""/>
                <p className="option">Sign out</p>
            </div>
        </div>
    )
}

export default ProfileButtonOptions;
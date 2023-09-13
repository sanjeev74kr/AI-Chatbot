import { feedbackStyles } from './index'
import { dislikeRedIcon, cancelIcon } from '../../assets/icons';

function Feedback({ handleDislikeClick, notify,handleDislikeIconClicked }) {
const handleSubmitClick=()=>{
    notify("Feedback submitted");
    handleDislikeClick();
}

const handleSkipClick=()=>{
    
    handleDislikeClick();
}
    return (
        <div className="feedback-component">
            <div className="feedback-header">
                <img className="feedback-dislike-icon" src={dislikeRedIcon} alt="dislike" />
                <p className="feedback-title">
                    Provide additional feedback
                </p>
                <img className="clickable-icon feedback-cancel-button" src={cancelIcon} alt="cancel" 
                onClick={handleDislikeClick} />
            </div>
            <textarea className="feedback-text-area" placeholder='What was the issue with response?How could it be improved?'></textarea>

            <div className='feedback-button-container'>
            <button id='feedback-submit-button' className="clickable-icon feedback-submit-button" onClick={handleSubmitClick}>Submit Feedback</button>
            <button className='clickable-icon skip-button' onClick={handleSkipClick}>skip</button>
            </div>
        </div>
    )
}

export default Feedback;
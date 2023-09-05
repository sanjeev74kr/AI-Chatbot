import {feedbackStyles} from './index'
import { dislikeRedIcon,cancelIcon } from '../../assets/icons';

function Feedback({handleDislikeClick}){
return(
    <div className="feedback-component">
        <div className="feedback-header">
         <img className="feedback-dislike-icon" src={dislikeRedIcon} alt="dislike"/>
         <p className="feedback-title">
          Provide additional feedback
         </p>
         <img className="clickable-icon feedback-cancel-button" src={cancelIcon} alt="cancel" onClick={handleDislikeClick}/>
        </div>
        <textarea className="feedback-text-area" ></textarea>
        <div className="clickable-icon feedback-submit-button" onClick={handleDislikeClick}>Submit Feedback</div>

    </div>
)
}

export default  Feedback;
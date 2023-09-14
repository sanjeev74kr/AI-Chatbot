import './deleteConfirmation.css'
function DeleteConfirmation({ date, index, handleDelete, onCancel }) {
    const handleConfirm = () => {
        handleDelete(date, index);
    };
    return (
        <div className="delete-confirmation-dialogue-container">
            <p className='delete-confirmation-heading'>Delete chat?</p>
            <p className="delete-confirmation-msg">
            <span>You'll no longer see this chat here. This will also delete related activity like prompts, responses and feedback from your RON activity.</span>
            {/* <span className='learn-more-link'><a href=''>Learn more</a></span>  */}
            </p>
            <div className="delete-confirmation-button-container">
                <button className="clickable-icon delete-confirmation-button" onClick={onCancel}>Cancel</button>
                <button className="clickable-icon delete-cancel-button" onClick={handleConfirm}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteConfirmation;
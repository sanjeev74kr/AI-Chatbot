import  './deleteConfirmation.css'
function DeleteConfirmation({date,index,handleDelete,onCancel}){
    const handleConfirm = () => {
        handleDelete(date, index);
      };
    return(
        <div className="delete-confirmation-dialogue-container">
            <p className="delete-confirmation-msg">
             This will delete the chat as well
            </p>
            <div className="delete-confirmation-button-container">
            <button className="clickable-icon delete-confirmation-button" onClick={handleConfirm}>confirm</button>
            <button className="clickable-icon delete-cancel-button" onClick={onCancel}>cancel</button>
            </div>
        </div>
    )
}

export default DeleteConfirmation;
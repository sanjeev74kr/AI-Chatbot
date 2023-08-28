function formatDate(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
  
    const diff = now - date;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `This Week`;
    } else if (days < 30) {
      return `This month`;
    } else {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = date.getMonth();
      return `${monthNames[month]}`;
    }
  }
  
  export default formatDate;
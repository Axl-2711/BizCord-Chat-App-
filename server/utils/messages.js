export const formatMessage = (username, text) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;

    return {
        username,
        text,
        time: formattedTime,
    };
};

   
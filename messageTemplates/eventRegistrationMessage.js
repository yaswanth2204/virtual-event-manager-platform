const eventRegistrationMessage = (username, eventName, eventDate, eventTime) => {
    return `
  Hi ${username},
  
  You're all set! 🎉  
  You've successfully registered for **${eventName}** happening on **${eventDate} at ${eventTime}**.
  
  We’re thrilled to have you join us and can't wait to see you there. Get ready for an engaging and exciting experience!
  
  ✨ Here’s what you can look forward to:
  - Valuable insights and fun interactions
  - Opportunities to connect with other participants
  - A seamless virtual event experience powered by EventHive
  
  📅 Make sure to mark your calendar:
  🗓️ **Date:** ${eventDate}  
  ⏰ **Time:** ${eventTime}
  
  If you have any questions or need support, feel free to reach out to us—we’re always happy to help!
  
  See you at **${eventName}**!
  
  Cheers,  
  The EventHive Team
    `;
  };

  module.exports = {eventRegistrationMessage}
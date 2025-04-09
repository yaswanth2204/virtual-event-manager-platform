const nodemailer = require("nodemailer")

const sendEmail = async(to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth : {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        })
        console.log("email will be sent in a while")
        
    } catch (error) {
      console.log(error)  
    }
}

module.exports = {sendEmail}
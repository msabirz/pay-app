// include nodemailer
const nodemailer = require('nodemailer');
// declare vars,
let fromMail = 'subwaycakes@gmail.com';
let toMail = 'subwaycakes@gmail.com';
let subject = 'A NEW PRODUCT PURCHASED';
let text = "A NEW PRODUCT." 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail ,
        pass: 'Subway@cakes123'
    }
});

let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text
};

// send email
transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(error);
    }
    console.log(response)
});


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;



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





app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/send-email', (req, res) => {
    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response)
    });
    res.send('Email Send');
});

app.post('/payment-callback', (req, res) => {
    // We will be coding here
    const data = req.body;

    // Output the book to the console for debugging
    console.log(data);
    // send email
    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text+data
    };
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response)
    });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

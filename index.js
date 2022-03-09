const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const {MongoClient} = require('mongodb');

var http = require('http');
var client;
async function main(){
    const uri = "mongodb+srv://test:test123@cluster0.zwqsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    client = new MongoClient(uri,{ useNewUrlParser: true });
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error('ee',e);
    } 
    // finally {
    //     await client.close();
    // }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function updateInvoice(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



const app = express();
const port = process.env.PORT || 3000;
// https://events.hookdeck.com/e/src_oJCGWM6nopzyavufkrhTY4tZ



app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', req, res => {

    
    res.send('Hello World, from express');
});

app.route('/send-email').post(async (req, res) => {
    const result = await client.db("sample_airbnb").collection("updatedInvoice").insertOne(req.body);
    // main().catch(console.error);
    // const result = client.db("sample_airbnb").collection("updatedInvoice").insertOne(req.body);
    // console.log(`New listing created with the following id: ${result.insertedId}`);
  
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
main().catch(console.error);

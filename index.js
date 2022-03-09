const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const {MongoClient} = require('mongodb');

var http = require('http');
var client;
async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  
  const uri = "mongodb+srv://test:test123@cluster0.zwqsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


 client = new MongoClient(uri,{ useNewUrlParser: true });
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
      await  listDatabases(client);

      
    //   await createListing(client);

      //await createInvoice();
      
      
  } catch (e) {
      console.error('ee',e);
  } finally {
      await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client){
  const newListing={
    name: "Lovely Loft",
    summary: "A charming loft in Paris",
    bedrooms: 1,
    bathrooms: 1
  }
  const result = await client.db("sample_airbnb").collection("listingsAndReviewssss").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

const app = express();
const port = process.env.PORT || 3000;
// https://events.hookdeck.com/e/src_oJCGWM6nopzyavufkrhTY4tZ


// declare vars,
let fromMail = 'subwaycakes@gmail.com';
let toMail = 'subwaycakes@gmail.com';
let subject = 'A NEW PRODUCT PURCHASED';
let text = "A NEW PRODUCT." 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'subwaycakes@gmail.com',
        accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
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
    main().catch(console.error);
    const result = client.db("sample_airbnb").collection("updatedInvoice").insertOne(req.body);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    // let mailOptions = {
    //     from: fromMail,
    //     to: toMail,
    //     subject: subject,
    //     text: text
    // };
    // transporter.sendMail(mailOptions, (error, response) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(response)
    // });
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

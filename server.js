const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


// Generate a random string of 32 characters
const secretKey = crypto.randomBytes(32).toString('hex');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Nirbhay:nirbhay_987@passman.pxdsb2y.mongodb.net/?retryWrites=true&w=majority&appName=PassMan";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);




// Create a new MongoClient
// const client = new MongoClient(uri);

// Function to post data to the MongoDB database
async function postDataToDatabase(data) {
    try {
        // Connect to the MongoDB database
        await client.connect();

        // Access the database and collection
        const database = client.db("PassMan");
        const collection = database.collection("encrypteddata");

        // Insert the data into the collection
        const result = await collection.insertMany(data);

        console.log(`${result.insertedCount} documents inserted.`);
    } catch (error) {
        console.error('Error posting data to database:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}







app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));





function isAuthenticated(req, res, next) {
    if (req.session.user) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
}


const userData = {
    'nh': { dashboard: 'dashboard1', password: '1234' },
    'user2': { dashboard: 'dashboard2', password: 'password2' }
};



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public2')));

// Serve static files from the 'web login' directory
app.use(express.static(path.join(__dirname, 'web login')));

// Serve static files from the 'user login' directory
app.use(express.static(path.join(__dirname, 'user login')));





// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = userData[username];
    fs.writeFileSync('./user_data.json', JSON.stringify(user));
    if (user && user.password === password) {
        console.log("user sussfull enter on a server rooom .... ")
        // Store user data in session upon successful login
        req.session.user = { username, dashboard: user.dashboard };
        // Redirect to the user's dashboard upon successful login
        res.redirect(`/${user.dashboard}`);
    } else {
        res.send('Invalid username or password');
    }
});


// Serve the dashboards
app.get('/dashboard1', isAuthenticated, (req, res) => {
    // Render dashboard 1
    res.send('Welcome to Dashboard 1!');
});

app.get('/dashboard2', isAuthenticated, (req, res) => {
    // Render dashboard 2
    res.send('Welcome to Dashboard 2!');
});


app.get('/login', (req, res) => {
    res.send('<form action="/login" method="post"><input type="text" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><button type="submit">Login</button></form>');
});

class webUser_data {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}


const web_userdata = [];

// app.post('/webuserdata', (req, res) => {
//     const { username, password } = req.body;
//     let user = new webUser_data(username, password);
//     console.log(user)
//     web_userdata.push(user);
//     fs.writeFileSync('./web_userdata.json', JSON.stringify(web_userdata));
//     res.send('Login data received.');
// });

const encrypteddata = [];


app.post('/webuserdata', async (req, res) => {
    const { username, password } = req.body;
    let user = new webUser_data(username, password);
    console.log(user)
    web_userdata.push(user);
    fs.writeFileSync('./web_userdata.json', JSON.stringify(web_userdata));
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store the hashed password in the database
        const user = new webUser_data(username, hashedPassword);
        encrypteddata.push(user);
        console.log(user)
        fs.writeFileSync('./encrypteddata.json', JSON.stringify(encrypteddata));
        res.send('Login data received.');
        return res.status(200).json({ message: 'The user has been created!' })
    } catch (error) {
        console.error('Error storing user data:', error);
        res.status(500).send('Internal server error');
    }
});


// app.get('/webuserdata', (req, res) => {
//     res.json(web_userdata);
// });

async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

app.get('/webuserdata', async (req, res) => {
    res.json(web_userdata);
    // try {

    //     const db = client.db("PassMan");
    //     const collection = db.collection("userData");
    //     const user = await collection.find({}).toArray();
    //     user = {};
    //     const decryptedUserData = user.map(user => {
    //         const { username, password } = user;
    //         return { username, password: comparePasswords(req.body.password, password) ? '********' : 'Invalid Password' }; // Mask the password
    //     });
    //     // For demonstration purposes, sending an empty array
    //     res.json(decryptedUserData);
    // } catch (error) {
    //     console.error('Error fetching user data:', error);
    //     res.status(500).send('Internal server error');
    // }
});

const userecryData = [];

class userecryDataa {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// Endpoint to handle adding a new user
app.post('/addUser', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userecryDataa(username, hashedPassword);
    userecryData.push({ username, password });
    console.log(user);
    web_userdata.push({ username, password });
    // Send a response to confirm that the user has been added
    res.sendStatus(200);
});




postDataToDatabase(encrypteddata);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

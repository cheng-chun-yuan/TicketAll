// var express = require('express');
// var app = express();
// console.log("starting server");
// const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:5173'
// }));

// app.get("/create-token", async (req, res) => {
//     const alias = req.query.alias;
//     console.log("alias", alias);
//     // Generate a new userid or grab the userid from session, cookie etc
//     const payload = {
//         userId: alias,
//         username: "pjfry@passwordless.dev",
//         aliases: [alias] // We can also set aliases for the userid, so that signin can be initiated without knowing the userid
//     };

//     // Send the username to the passwordless api to get a token
//     var { token } = await fetch("https://v4.passwordless.dev/register/token", {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: { ApiSecret: "catty:secret:186a0ba14b824dcf8c8a94cf9a36e39a", 'Content-Type': 'application/json' }
//     });
//     console.log("token", token);
//     // const alias = req.query.alias;

//     // Generate a new userid or grab the userid from session, cookie etc
//     // const payload = {
//     //     userId: getRandomInt(),
//     //     username: "alias",
//     //     // aliases: [alias] // We can also set aliases for the userid, so that signin can be initiated without knowing the userid
//     // };
//     // const payload = {
//     //     // "userId": "107fb578-9559-4540-a0e2-f82ad78852f7", // A WebAuthn User Handle, which should be generated by your application. Max. 64 bytes.
//     //     // "username": "pjfry@passwordless.dev", // For display purposes, should help a user identify the user account.  
//     //     "userId": "107fb578-9559-4540-a0e2-f82ad78852f7", // A WebAuthn User Handle, which should be generated by your application. Max. 64 bytes.
//     //     "username": "pjfry@passwordless.dev", // For display purposes, should help a user identify the user account.  
//     //     "displayname": "Philip J. Fry", // A human-palatable name for the account.
//     //     "authenticatorType": "platform", // WebAuthn authenticator attachment modality. Can be "any" (default), "platform" which triggers client device-specific options Windows Hello, FaceID, or TouchID, or "cross-platform", which triggers roaming options like security keys.
//     //     "userVerification": "preferred", // Whether the relying party requires locally-invoked authorization for the operation. Can be "preferred" (default), "required", or "optional".
//     //     "aliases": ["pjfry@passwordless.dev"], // An array of user-created identifiers, like emails, which are used to reference a userId.
//     //     "aliasHashing": true // Whether aliases should be hashed before being stored. Defaults to true.
//     // };
//     // const apiUrl = "https://v4.passwordless.dev";
//     // const { token } = await fetch(apiUrl + "/register/token", {
//     //     method: "POST",
//     //     body: JSON.stringify(payload),
//     //     headers: {
//     //         "ApiSecret": "catty:secret:186a0ba14b824dcf8c8a94cf9a36e39a",
//     //         "Content-Type": "application/json"
//     //     }
//     // }).then(r => r.json());
//     // console.log("token", token);
//     // Send the username to the passwordless api to get a token
//     // var response = await fetch("https://v4.passwordless.dev/register/token", {
//     //     method: "POST",
//     //     body: JSON.stringify(payload),
//     //     headers: { ApiSecret: 'catty:secret:186a0ba14b824dcf8c8a94cf9a36e39a', 'Content-Type': 'application/json' }
//     // });

//     // var responseData = await response.json();
//     // console.log("passwordless api response", response.status, response.statusText, responseData);

//     // if (response.status == 200) {
//     //     console.log("received token: ", responseData.token);
//     // } else {
//     //     // Handle or log any API error, { errorCode: "unknown_credentials", "title": "This is what is wrong", "details": "..."}
//     // }

//     // res.status(response.status);
//     // res.send(responseData);
// });
// app.get("/signin", async (req, res) => {
//     // Code written for this step should run on your backend.
//     console.log("received token: ", req.query.token);
//     // Fetch the verification token from your frontend.
//     const token = { token: req.query.token };

//     // POST the verification token to the Passwordless.dev API using your API private secret.
//     const apiUrl = "https://v4.passwordless.dev";
//     const response = await fetch(apiUrl + "/signin/verify", {
//         method: "POST",
//         body: JSON.stringify({ token }),
//         headers: { "ApiSecret": "catty:secret:186a0ba14b824dcf8c8a94cf9a36e39a", "Content-Type": "application/json" }
//     });

//     // Cache the API response (see below) to a variable.
//     const body = await response.json();

//     // Check the API response for successful verification.
//     // To see all properties returned by this endpoint, checkout the Backend API Reference for /signin/verify.
//     if (body.success) {
//         console.log("Successfully verified sign-in for user.", body);
//         // Set a cookie/userid.
//     } else {
//         console.warn("Sign in failed.", body);
//     }
// });
const express = require("express");
const fetch = require("node-fetch");
const https = require("https");
const bodyParser = require('body-parser');
const agent = new https.Agent({
    rejectUnauthorized: false
})
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const API_URL = process.env.API_URL;
const API_SECRET = process.env.API_SECRET; // Replace with your API secret
const API_KEY = process.env.API_KEY; // this will be injected to index.html
const messageData = [];
console.log("Using API URL: " + API_URL);
console.log("Using API key: " + API_KEY);
console.log("Using API secret: " + API_SECRET);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});
app.use(cors());
app.use(bodyParser.json());
/** 
 * Register - Get token from the passwordless API
 * 
 * The passwordless client side code needs a Token to register a passkey to a UserId.
 * The token is used by the Passwordless API to verify that this action is allowed for this user.
 * Your server can create this token by calling the Passwordless API with the ApiSecret.
 * This allows you to control the process, perhaps you only want to allow new users to register or only allow already signed in users to add a passkey to their own account.
 * Please see: https://docs.passwordless.dev/guide/get-started.html#build-a-registration-flow
 */
app.get("/create-token", async (req, res) => {

    const userId = getRandomInt(999999999);
    const alias = req.query.alias;
    const displayname = "Mr Guest";
    // grab the userid from session, cookie etc
    const payload = {
        userId,
        username: alias || displayname,
        displayname,
        aliases: alias ? [alias] : [] // We can also set aliases for the userid, so that signin can be initiated without knowing the userid
    };

    console.log("creating-token", API_URL);
    // Send the username to the passwordless api to get a token
    var response = await fetch(API_URL + "/register/token", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { ApiSecret: API_SECRET, 'Content-Type': 'application/json' },
        agent
    });

    var responseData = await response.json();

    console.log("passwordless api response", response.status, response.statusText, responseData);

    if (response.status == 200) {
        console.log("received token: ", responseData.token);
    } else {
        // Handle or log any API error
    }

    res.status(response.status);
    res.send(responseData);
});

/**
 * Sign in - Verify the sign in
 * 
 * The passwordless API handles all the cryptography and WebAuthn details so that you don't need to.
 * In order for you to verify that the sign in was successful and retrieve details such as the username, you need to verify the token that the passwordless client side code returned to you.
 * This is as easy as POST'ing it to together with your ApiSecret.
 * Please see: https://docs.passwordless.dev/guide/get-started.html#build-a-registration-flow
 */
app.get("/verify-signin", async (req, res) => {
    const token = { token: req.query.token };

    console.log("Validating token", token);
    const response = await fetch(API_URL + "/signin/verify", {
        method: "POST",
        body: JSON.stringify(token),
        headers: { ApiSecret: API_SECRET, 'Content-Type': 'application/json' },
        agent
    });

    var body = await response.json();

    if (body.success) {
        console.log("Succesfully verfied signin for user", body);
    } else {
        console.warn("Sign in failed", body);
    }
    res.statusCode = response.status;
    res.send(body);
});
app.post('/api/submit', (req, res) => {
    console.log('api-submit')
    const {address ,email, title, description } = req.body;

    // Perform any necessary operations with the submitted data
    // For example, you can save it to a database or perform some calculations

    // Log the email to the console
    messageData.push({ address,email, title, description });
    console.log(messageData);
    // Send a response indicating the success of the submission
    res.status(200).json({ message: 'Data submitted successfully' });
});
app.get('/api/messages', (req, res) => {
    // Send the messageData as the response
    res.status(200).json(messageData);
    // res.send.json(messageData);
});

// Small helper to update API_KEYs:
// Response with index.html but replace API_KEY value.
const fs = require('fs');
const { m } = require("framer-motion");
app.get("", (req, res) => {
    const index = "public/index.html";
    fs.readFile(index, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/<YOUR_API_KEY>/g, API_KEY);
        res.send(result);
    });
});

// serve static/html files
app.use(express.static("public"));

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const shutdown = () => {
    console.log('Stopping ...');
    server.close(() => {
        console.log('Stopped');
    });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
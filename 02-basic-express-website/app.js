"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }) )

app.listen(3000);
console.log('Server is running on port 3000');
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
var pdf = require("pdf-creator-node");

const readFileAsync = util.promisify(fs.readFile);

inquirer
  .prompt([{
    message: "Enter your GitHub username:",
    name: "username"
  },{
  type: "list",
  message: "Pick a color:",
  name: "colorChoices",
  choices: [
    "Blue", 
    "Purple", 
    "Black", 
    "Pink",
    "Red"
  ]}])
  .then(function({username}) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response) {
      // User name
      const name = response.data.name;
      console.log(name);
      fs.appendFileSync('message.pdf', name + "\n" + response.data.avatar_url + "\n" + response.data.html_url + "\n" + response.data.location + "\n" + response.data.bio + "\n" + response.data.public_repos + "\n" + response.data.followers + "\n" + response.data.following);
      console.log(response.data.name);
      // Profile image
      // fs.appendFileSync('message.pdf', response.data.avatar_url);
        console.log(response.data.avatar_url);
        // Link to User GitHub profile
        console.log(response.data.html_url);
        // location
        console.log(response.data.location);
        // User bio
        console.log(response.data.bio);
        // Number of public repositories
        console.log(response.data.public_repos);
        // Number of followers
        console.log(response.data.followers);
        // Number of users following
        console.log(response.data.following);
      });



      });

// function generateHTML(answers) {
// return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Hi! My name is ${answers.name}</h1>
//     <p class="lead">I am from ${answers.location}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">My GitHub username is ${answers.github}</li>
//       <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;
// }
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
var pdf = require('html-pdf');
var html = fs.readFileSync('./message.html', 'utf8');
var options = { format: 'Letter' };

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
  .then(function({username, colorChoices}) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    axios.get(queryUrl).then(function(response) {
      // User name
      const name = response.data.name;
      // console.log(name);
      fs.writeFile('message.html', `<!DOCTYPE html>
      <html>
          <head>
              <mate charest="utf-8" />
              <title>Github Profile</title>
          </head>
          <body>
              <h1> <span style="color:`+colorChoices+`">` + name + `</span></h1>
              <hr>
              <img src="`+response.data.avatar_url+`" alt="profilepic">
              <br>
              <P>Bio: ` + response.data.bio + `
              <br>
              Company: ` + response.data.company + `
              <br>
              Repo URL: <a href="`+response.data.html_url+`">`+username+`</a>
              <br>
              Public Repos: `+ response.data.public_repos +` 
              <br>
              Followers: `+ response.data.followers +`
              <br>
              Following: `+ response.data.following +`
              <br>
              Location: `+ response.data.location +`
              </p>
          </body>
      </html>`
      ,
      function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      // // );
      // console.log(response.data.name);
      // // Profile image
      // // fs.appendFileSync('message.pdf', response.data.avatar_url);
      //   console.log(response.data.avatar_url);
      //   // Link to User GitHub profile
      //   console.log(response.data.html_url);
      //   // location
      //   console.log(response.data.location);
      //   // User bio
      //   console.log(response.data.bio);
      //   // Number of public repositories
      //   console.log(response.data.public_repos);
      //   // Number of followers
      //   console.log(response.data.followers);
      //   // Number of users following
      //   console.log(response.data.following);
      
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
  // current year
  let year = date_ob.getFullYear();
  
  // current hours
  let hours = date_ob.getHours();
  
  // current minutes
  let minutes = date_ob.getMinutes();
  
  // current seconds
  let seconds = date_ob.getSeconds();
  
  // prints date in YYYY-MM-DD format
  // console.log(year + "-" + month + "-" + date);
  
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  
  // prints time in HH:MM format
  //console.log(hours + ":" + minutes);
  let timestamp = month + date + year +"_"+ hours + ":" + minutes + ":" + seconds;
  pdf.create(html, options).toFile('./GitHubProfile'+timestamp+'.pdf', function(err, res) {
    if (err) return console.log(err);
    });
    
  });

  
  // // current year
  // let year = date_ob.getFullYear();
  
  // // current hours
  // let hours = date_ob.getHours();
  
  // // current minutes
  // let minutes = date_ob.getMinutes();
  
  // // current seconds
  // let seconds = date_ob.getSeconds();
  
  // // prints date in YYYY-MM-DD format
  // let timestamp = year + month + date + hours + ":" + minutes + ":" + seconds;
  // console.log(timestamp);
  
  //Converts HTML to PDF
  // pdf.create(html, options).toFile('./GitHubProfile'+timestamp+'.pdf', function(err, res) {
  //   if (err) return console.log(err);
});

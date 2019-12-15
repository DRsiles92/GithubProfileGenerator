const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var pdf = require("pdf-creator-node");

// var html = fs.readFileSync('template.html', 'utf8');

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
      console.log(response.data.name);
      // Profile image
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




      // const repoNamesStr = repoNames.join("\n");

      // fs.writeFile("repos.txt", repoNamesStr, function(err) {
      //   if (err) {
      //     throw err;
      //   }



        // console.log(`Saved ${repoNames.length} repos`);
       
      });
    // });
  // });
  
# sh-cap
Shark

# shark chat | Message Sharing

shark chat testing sharing application that allows users to submit messages for other users to see, favourite and follow.

## Deployed Application

## GitHub Repository 

(https://github.com/safwaanabrams/sh-cap)

## Installation

1. Move folder to your local machine
2. Navigate to server directory and npm install
3. Once packages are installed npm start
4. Navigate to client directory and npm install 
5. Once packages are installed npm start
6. Navigate to Local http://localhost:3000/


## Testing

This application uses Jest, Mocha and Chai for testing purposes.

On the client side Jest is used in order to do a snapshot test on the dashboard component.

In order to run this test:

1. Navigate to client directory
2. npm test
3. Then press 'a'

On the server side Mocha and Chai is used in order to test API endpoints in the Express server.

In order to run this test:

1. Navigate to server directory
2. Make sure server has started
3. npm test 

## How to use the platform

1. From the landing page navigate to the signup page
2. Either register your own details or register via the Google or 
   Facebook signup options
3. You will be directed to your personal dashboard page
4. Here you can submit your first message
5. Your message will display under the 'Your Messages' section
6. Navigate to the 'Feed' page via the green button
7. Here you will be able to view other user's most recent messages
8. Add another user's message to your favourites and also follow a user
9. Navigate back to your dashboard
10. You will now be able to view the message you favourited as well as 
    the users you are following
11. Click on a user you are following to view their entire message 
    history
12. Click the 'Edit Messages' button to edit your own messages
13. Try deleting a message you have favourited or a user you are 
    following

## Admin Privileges

Admin have the ability to delete users.


## System Architecture

This application is built using a MERN Stack.

Technologies used include:

- MongoDB
- Express.js
- React
- Node.js
- CSS
- Bootstrap

This application has been deployed via Heroku. Both server and client have been deployed together in order to to ensure seamless communication between back-end and front-end functionality and to ensure user authentication works correctly.

create-react-app is used for React setup.

## System Requirements 

This application is available to anyone who feels like sharing messages on a simple and intuitive platform.

### User Stories

- A user who wants to share messages and reach an audience
- An admin who wants to delete a user from the application

### Functional Requirements 

- Local and third-party authentication
- Admin access in order to delete users
- User dashboard in order for users to submit messages as well as view 
  their own message history, favourited messages and users they follow
- Ability for users to edit their own messages
- Ability for users to delete personal and favourited messages as well 
  as other users they follow from their dashboard
- Ability for users to view another user's entire messages history
- Ability for users to follow a user or favourite a user message via the 
  message feed page

### Non-Functional Requirements 

- Security for users by salting and hashing their passwords
- Code is as modular and clean as possible in order to ensure 
  maintenance and future scalability 
- Code is as clean and intuitive as possible in 
  order to ensure application response time. CSS styling is also 
  clean and simple in order to not reduce application response time

## Application Security

All Sensitive information is stored in a .env file not accessible via GitHub or Heroku.

Information stored in this file includes:

- MongoDB connection URL
- Third-party authentication credentials


User passwords are salted and hashed in the database.

## License

[Safwaan Abrams](https://www.hyperiondev.com/)

### Modifying database

To use this app on your local machine, create a .env file and copy the following to it. Fill in all necessary details.
"
module.exports = {
  google: {
    callbackURL: "/googlelogin/redirect",
    clientID:
      "",
    clientSecret: ""
  },
  facebook: {
    callbackURI: "/facebooklogin/redirect",
    clientID: "",
    clientSecret: ""
  },
  mongoDB: {
    dbURI:
      "mongodb+srv://game:game@game.nxfcb.mongodb.net/db_test?retryWrites=true&w=majority"
  },
  session: {
    cookieKey: "logincookiefortodolist"
  }
};
"

### Deployment

This app can be deployed on Heroku as a full stack app.
The link to the app is as follows: 

# Software requirements document

**PS...After thoughtful consideration, I decided to create a new idea, very different from my pervious task where we were required to build the requirements**

The Single-Page Application (SPA's) software architecture pattern was used for this web application as it provides a dynamic interaction
and constant updating of web pages. SPA's also prevent interruptions in user experience.
This software architecture model was chosen for its fast response times, ease of scalability, support of testing,
reliable, reduces failure rate and allows for ease of maintenance.

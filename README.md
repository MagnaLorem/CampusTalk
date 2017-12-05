# Study Swamp Chat App #
[Visit the website here](https://studyswamp.herokuapp.com/ "Study Swamp Website")

![alt text](https://github.com/MagnaLorem/CampusAlly/blob/master/modules/core/client/img/brand/home_page.png)

## Overview and Features ##
The Study Swamp app is a way for students to chat with other students enrolled in the same courses as them. Students can select classes to join from the list of courses offered at their university and then begin chatting. Each semester a subscription is required to use the app.
### My Classes ###
In "My Classes" the user can update a list of the classes that they are currently enrolled in. To add classes they can search through the list of classes offered by their university and click the plus icon next to each class. To remove classes they can click the delete icons next to the classes in their list.

![alt text](https://github.com/MagnaLorem/CampusAlly/blob/master/modules/core/client/img/brand/my_classes.png)
### Chat ###
In "Chat" the user can join a dedicated chat room for each of the courses offered at their university. The classes that they chose in "My Classes" will load here and they can join the chat room for each one. They can then discuss information relating to the class with other students.

![alt text](https://github.com/MagnaLorem/CampusAlly/blob/master/modules/core/client/img/brand/chat.png)
### Announcements ###
In "Announcements" the user can see a list of announcements made by a moderator that will include important news or deals that Study Swamp is running.

![alt text](https://github.com/MagnaLorem/CampusAlly/blob/master/modules/core/client/img/brand/announcements.png)
## Running the App Locally ##
+ Clone this repository
+ In a command window, navigate to the project directory and run `$ npm install`
+ Start the app using `$ grunt` or `$ node server`
+ Go to http://localhost:27017 in a browser

## Updating the Database and Server ##
+ In /config/env/development.js change the URI to the URI for the new database
+ In /config/env/default.js change the port to the new number

## Resources Used ##
+ [MEAN.JS](https://github.com/meanjs/mean "MEAN.JS GitHub Page") as a framework
+ [Bootstrap](https://getbootstrap.com/ "Bootstrap Website") for front-end components
+ [PayPal Express Checkout](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/ "PayPal Express Checkout Page") for user payments

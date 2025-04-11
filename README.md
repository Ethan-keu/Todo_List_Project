# To-do List Website

## Description
Final project for CSCI 4131: Internet Programming Fall 2024. This project aims to demonstrate our studies of the core languages and technologies of internet programming: HTML, CSS, JavaScript, the DOM, the HTTP protocol, and the standard back-end technologies used to build modern-day websites: routing, templatting, and SQL databases. 

## Disclaimer 
This course is not currently active, thus, the MySQL database connection will not work. The contents that would establish the database can be seen within the "schema.sql" file. 

## Implemented Features: 
Here are the currently supported features. A brief list of formal requirements can be found below this section. 
### Configuration and Deployment
- Website was designed on a standard 1920 x 1080 monitor 
- To start the server, run "node server.js" in the terminal (assuming that the user is already running an SSH tunnel).
- Connection pool code can be viewed in data.js file. 
    - The local port is set to 3838. 
- schema.sql contains the database query needed to set up the table. The table should already be set up if using my database.
### Generic Features 
- "Home" page displays all of the to-do items (done/not done).
- "To-Do" page displays all of the to-do items (not done).
- "Done Items" page displays all of the done to-do items.
- Adding a new item is done through the "Add New Item" Button.
    - A title and due date are required, but a description is not.
    - Adding a listing will automatically refresh the page.
- Deleting an item is done through the "DELETE" button on each of the items. 
- Marking an item as done/not done is done through the check box on each item. 
    - An item done has the check box pre-checked
### Advanced Features 
- The advanced feature attempted was the implementation of deadlines. 
- All to-do items are required to have a deadline set by the user. 
- Users can create deadlines in the past if they wish.
    - New items with deadlines set to past dates will automatically be sent to the overdue list. 
- The overdue list (side bar), by default, is sorted from top to bottom based on the most recently overdue item in the to-do list. 
- The main page is sorted based on the deadline of the item. The oldest items are shown first.
- It updates once the page refreshes
### User Support 
- User support is not implemented
- The login form and "Register" button are present for visual representation but do not operate.

## Formal Requirements 
The project revolves around a primitive "to-do list" website. The requirements are broken down into four sections: 
### Technical Requirements 
- Must use the Express framework for the server.
- The website must store data persistently in your allocated MySQL database.
  - The queries to create your database will be stored in a file called "schema.sql"
- Good file structure is essential and should "make sense".
### Visual Requirements 
- We are given freedom to the layout of our website; however, visible effort must be made to the visual appearance (i.e, must not be black-and-white).
- Screen size is not formally enforced; however, it should be documented if the website was developed on a less standard screen size.
### Minimum Required Behaviors 
- The user should be able to view a to-do list containing items.
  - There should be a way to view all items that have not been deleted.
  - To-do items should be filterable. At a minimum, you should be able to view all "done" and "not done" items.
  - To-do list items can be created.
  - To-do list items can be deleted.
  - To-do list items can be marked as "done" and "undone". This is different than simply deleting an item. 
### Advanced Feature Requirements 
One of the three following additional features must be implemented: 
- Comments and Descriptions
  - Each to-do list item has a dedicated page with the ability to add a description.
  - Each to-do list item can have the ability to add comments, which can be added and deleted but not edited. 
- Categorization
  - Each to-do list item can be assigned a category.
  - There should be a way to search by category. For example, this could be a drop-down box.
  - Users should be able to create custom categories and remove them. 
- Deadlines
  - To-do list items all have an assignable deadline.
  - To-do list items can be sorted by their deadline.
  - Overdue items, not marked done, must be placed on a separate list.
### User Support 
Fully functional account support must be implemented for a grade of 91% or higher. 
- Account creation must be supported.
- Login and Logout features should exist.
  - Passwords can be stored in plain text, but additional credit is awarded if encryption is utilized.
- Each user is given their own to-do list, which they can modify.
- Users not logged in cannot create to-do list items.


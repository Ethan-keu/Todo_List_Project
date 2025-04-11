// Main file for handling connections to the database 
const mysql = require(`mysql-await`); 
var connPool = mysql.createPool({
    connectionLimit: 5, 
    host: "127.0.0.1",
    port:3838,
    user: "XXXXXXXXXXX", 
    database: "XXXXXXXXXXX", 
    password: "XXXX", 
  });

// Function to handle getting all items.
async function getAllItems(){
  const res = await connPool.awaitQuery("SELECT * FROM toDoItems ORDER BY dueDate ASC;"); 
  // Update the to-do list items that are not marked done and overdue. 
  await connPool.awaitQuery("UPDATE toDoItems SET isOverdue=1 WHERE dueDate < NOW() AND done <> 1;");
  return res; 
}

// Function to handle getting all over due items.
async function getOverDue(){
  const res = await connPool.awaitQuery("SELECT * FROM toDoItems where isOverdue=1 AND done <> 1 ORDER BY dueDate DESC;"); 
  return res; 
}

// Function to handle getting all done items.
async function getDoneItems(){
  const res = await connPool.awaitQuery("SELECT * FROM toDoItems WHERE done=1 ORDER BY dueDate ASC;");
  return res; 
}

// Function to handle getting all not done items.
async function getItems(){
  const res = await connPool.awaitQuery("SELECT * FROM toDoItems WHERE done=0 ORDER BY dueDate ASC;");
  return res; 
}

// Function to handle setting an item as done or not done.
async function update_isDone(id){
  const res0 = await connPool.awaitQuery("SELECT done FROM toDoItems WHERE id=?;", [id]); 
  if(res0[0].done === 0){
    const res1 = await connPool.awaitQuery("UPDATE toDoItems SET done=1 WHERE id=?;", [id]); // Set the value to 1
    return res1 > 0; // Return true if item's done variable was updated
  }
  else{
    const res2 = await connPool.awaitQuery("UPDATE toDoItems SET done=0 WHERE id=?;", [id]); // Set the value to 1
    return res2 > 0; // Return true if item's done variable was updated
  }
}

// Function to handle adding a new item to the database.
async function addItem(data){
  const res = await connPool.awaitQuery("INSERT INTO toDoItems(title, description, done, isOverdue, dueDate)\
    VALUES(?,?,?,?,?);", [data.addItemTitle, data.addItemDesc, 0, data.isOverdue, data.dueDate]);
  return res.affectedRows > 0; // Return true if item was added
}

// Function to remove a specific item from the database.
async function deleteItem(id){
  const res = await connPool.awaitQuery("DELETE FROM toDoItems WHERE id=?;", [id]);
  return res.affectedRows > 0; // Return true if item was deleted
}

module.exports = {getAllItems, getOverDue, getDoneItems, getItems, update_isDone, addItem, deleteItem}; 
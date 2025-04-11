// JS file for handling the to-do list items.

// Hide and reveal Add item forum
let revealButton = document.getElementById("addNewItemButton");
let clickToggle = true;
revealButton.addEventListener("click", ()=>{
    let form = document.getElementById("addItemContainer");
    if(clickToggle === true){
        form.removeAttribute("hidden"); 
        document.getElementById("addNewItemButton").value = "Cancel Item";
        clickToggle = false; 
    }
    else{
        form.hidden = true;
        document.getElementById("addNewItemButton").value = "Add New Item";
        clickToggle = true;
    }
}); 

for(i=0; i < document.getElementsByClassName("listItem").length; i++){
    // Detect an update to the current item's checkbox to update the done variable in the database
    let checkBox = document.getElementsByClassName("checkBox")[i];
    checkBox.addEventListener("click", ()=>{
        const id = checkBox.closest('div').getAttribute('list-item-id');
        updateToDo(id);
    })

    // Detect a delete event on a list item
    let deleteButton = document.getElementsByClassName("deleteButton")[i]; 
    deleteButton.addEventListener("click", ()=>{
        const id = deleteButton.closest('div').getAttribute('list-item-id');
        deleteItem(id); 
    });

}

// Send a PATCH request to the server with the id of the current list item 
// This will send the id of the item to the database to set an item's done variable. 
async function updateToDo(id){
    await fetchItems(id);
}

async function fetchItems(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch("/isDone", {
        method:"PATCH", 
        headers:myHeaders, 
        body:JSON.stringify({id:id})
    });
    let statusCode = Number(response.status);
    return statusCode
}

// Code to handle deleting an item from the to-do list
// This will send the id of the item to the database to remove the item.
async function fetchItemToDelete(deleteId){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch("/deleteItem", {
        method:"DELETE", 
        headers:myHeaders, 
        body:JSON.stringify({id:deleteId})
    });
    let statusCode = Number(response.status);
    if(statusCode === 400 | statusCode === 500){
        alert(`Error: ${statusCode}`);
    }

    return statusCode
}

// Code to remove the container representing the deleted list item.
async function deleteItem(id){
    let temp = await fetchItemToDelete(id);
    const container = document.getElementById("contentContainer");
    const item = container.getElementsByClassName("listItem"); 
    for(let i=0; i < item.length; i++){
        if(item[i].attributes[1].value == id){
            item[i].remove();
            break;
        }
    }
}
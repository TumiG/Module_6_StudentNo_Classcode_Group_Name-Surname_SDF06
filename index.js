import { intializeApp } from "https://realtime-database-5b8d5-default-rtdb.europe-west1.firebasedatabase.app/"
import { getDatabase, ref, push, onValue, remove } from "https://realtime-database-5b8d5-default-rtdb.europe-west1.firebasedatabase.app/"

const appSettings  = {
    databaseURL: "https://console.firebase.google.com/u/0/project/realtime-database-5b8d5/database/realtime-database-5b8d5-default-rtdb/data/~2F"
}

const app = intializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB =ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("onClick", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})
   
onValue(shoppingListInDB, function(snapshot) {
    
    
if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingListEl()
  
for (let i = 0; i < itemsArray.length; i++) {
  let currentItem = itemsArray[i]
  let currentItemID = currentItem[0]
  let currentItemValue = currentItem[1]

  appendItemToShoppingListEl(currentItem)
}
} else {
    shoppingListEl.innerHTML = "No items here... yet"
}
    
  })

function clearShoppingListEl() {
     shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl = ""
 }

 function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    
    newEl.addEventListener("click", function() {
        
        let exactLocationOfItemInDB = ref(database, `shoppingLis/${itemID}`)

        remove(exactLocationOfItemInDB)


    })


        shoppingListEl.append(newEl)
    }



/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable strict */

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
const STORE = [
  { id: cuid(), name: "apples", checked: false },
  { id: cuid(), name: "oranges", checked: false },
  { id: cuid(), name: "milk", checked: true },
  { id: cuid(), name: "beer", checked: false },
];

function generateItemElement(item) {
  return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${
      item.checked ? "shopping-item__checked" : ""
    }">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function generateItemStr(shoppingList) {
  console.log("generating shopping list element");

  //creates new arr called items, by calling generate element on shopping list
  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );
  //joins all items in items arr into one big str.
  return items.join("");
}
/*

}
function main() {
  $("#js-shopping-list-form").submit((event) => {
    event.preventDefault();
    console.log('A button was clicked');
    let listItem = $("#shopping-list-entry").val();
    console.log("item detected", listItem);

    let template = `<li>
  <span class="shopping-item">${listItem}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;

    $(".shopping-list").append(template);
  });

  
  $(".shopping-list").on("click", ".shopping-item-delete", delete);
}
*/

function renderShoppingList() {
  //renders list to the DOM
  console.log("render list ran");
  //for each item in store, generate <li> with:
  //item name rendered as inner text
  //and items index in store as a data attr.
  //the items checked state.

  //then join together the indiv strings into one
  //insert the <li> string inside .js-shopping-list <ul>

  const listStr = generateItemStr(STORE);
  //render to dom
  $(".shopping-list").html(listStr);
}

function addItemtoList(itemName) {
  console.log(`adding ${itemName} to shopping list`);
  STORE.push({ id: cuid(), name: itemName, checked: false });
}
function handleNewItemSubmit() {
  //handles whne user adds item
  console.log("handlenewitemsubmit ran");
  $("#js-shopping-list-form").submit(function (evt) {
    evt.preventDefault();

    console.log("handlenewitemsubmit ran");
    //creates new variable to capture user input
    let newlistItem = $("#shopping-list-entry").val();

    //sets input field blank
    $("#shopping-list-entry").val("");

    addItemtoList(newlistItem);
    renderShoppingList();
  });
}
function toggleChecked(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.find((item) => item.id === itemId);
  item.checked = !item.checked;
}

function getItemId(item) {
  return $(item).closest("li").data("item-id");
}

function handleItemChecked() {
  //handles user clicking check button

  $(".shopping-list").on("click", ".shopping-item-toggle", function (
    evt
  ) {
    console.log("handle item checked ran");
    const itemId = getItemId(this);
    toggleChecked(itemId);
    renderShoppingList();
  });
}

function deleteItem(itemId) {
  const itemDel= STORE.find((item) => item.id === itemId)
  console.log(itemDel)
  STORE.splice(STORE.indexOf(itemDel),1)
}
function handleItemDelete() {
  //handles when user clicks delete button
  $(".shopping-list").on(
    "click",
    ".shopping-item-delete",
    function () {
      const itemId = getItemId(this);
      deleteItem(itemId);
      renderShoppingList();
    }
  );

  console.log("handle delete item ran");
}

function handleShoppingList() {
  //callback for when page laods. will render, and activate indiv fns.
  renderShoppingList();
  handleNewItemSubmit();
  handleItemChecked();
  handleItemDelete();
}

$(handleShoppingList);

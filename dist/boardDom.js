import { createCard, createList, deleteCard, deleteList, getAllLists, getCardData } from "./script.js";

const listContainer = document.getElementById("list-container");
const form = document.getElementById("create-list");
const addingListContainer = document.getElementById("adding-list-container");


function getBoardId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("boardId");
}
function getAllListData() {
  getAllLists(id)
    .then((listsData) => {
      let listId = [];
      listsData.forEach((list) => {
        const listName = document.createElement("div");
        const heading = document.createElement("h2");
        const icon = document.createElement("button");
        heading.className = "p-4 delete-list";
        icon.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        icon.className = "p-4";
        const container = document.createElement("div");
        container.className = "flex justify-between";
        icon.firstElementChild.setAttribute("data-list-id", list.id);
        heading.innerText = list.name;
        container.append(heading);
        container.append(icon);
        listName.append(container);
        listName.className =
          "w-64 h-fit rounded-lg text-white bg-slate-400 text-xl p-2";
        listName.id = `${list.id}`;

        listContainer.insertBefore(listName, addingListContainer);

        //Adding a cardCard Button
        const addCard = document.createElement("div");
        addCard.className =
          "w-56 h-fit p-2 rounded-lg bg-slate-400 mx-auto mb-2 border-2";
        addCard.id = "adding-card";
        addCard.innerText = "Add a card";

        const cardForm = document.createElement("form");
        const cardName = document.createElement("input");
        const addCardbtn = document.createElement("button");
        const closeform = document.createElement("button");

        addCardbtn.id = "creating-card";
        addCardbtn.setAttribute("data-list-id", list.id);
        addCardbtn.type = "submit";
        cardName.id = "card-name";
        closeform.id = "closing-form";

        const divContainer = document.createElement("div");
        divContainer.className = "flex gap-4 mb-2";
        divContainer.append(addCardbtn);
        divContainer.append(closeform);

        cardName.className =
          "w-56 h-12 rounded-lg mb-2 outline-blue-500 p-2 text-black mx-auto";
        cardName.placeholder = "Enter a title...";

        addCardbtn.className = "p-2 bg-blue-300 rounded-lg";
        addCardbtn.innerText = "Add card";

        closeform.className = "p-2 bg-blue-300 rounded-lg";
        closeform.innerText = "X";

        cardForm.append(cardName);
        cardForm.append(divContainer);

        cardForm.id = "create-card";
        cardForm.className = "hidden flex flex-col w-60 p-2";

        listName.append(addCard);
        listName.append(cardForm);
        listId.push(list.id);
      });
      return Promise.all(listId.map((id) => getCardData(id)));
    })
    .then((cardData) => {
      for (let index = 0; index < cardData.length; index++) {
        
        for (let j = 0; j < cardData[index].length; j++) {
          
          const listCard = document.getElementById(cardData[index][j].idList);
          const cardContent = document.createElement("div");
          const cardName = document.createElement("h3");
          const icon = document.createElement("button");
          cardContent.className =
            "mx-auto mb-2 p-2 w-56 h-12 bg-cyan-300 rounded-lg flex justify-between";

          cardName.innerText = cardData[index][j].name;
          icon.innerHTML = `<i class="fa-solid fa-trash"></i>`;
          icon.firstElementChild.setAttribute("card-id", cardData[index][j].id);
          cardContent.append(cardName);
          cardContent.append(icon);
          listCard.lastElementChild.previousElementSibling.before(cardContent)
          
        }
      }
    })
    .catch((err) => {
      console.log("Invalid response");
    });
}

const id = getBoardId();
document.addEventListener("DOMContentLoaded", () => {
  getAllListData();
});


// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("Ankit");
//   const getName = document.getElementById("list-name");
//   const listName = getName.value;
//   createList(id, listName);
//   getName.value = "";
//   createBtn.style.display = "block";
//   form.style.display = "none";
// });

listContainer.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log(event.target);
  if (event.target.getAttribute("id") === "adding-card") {
    const createCardbtn = event.target;
    const cardForm = event.target.nextElementSibling;
    createCardbtn.style.display = "none";
    cardForm.style.display = "block";
  } else if (event.target.getAttribute("id") === "closing-form") {
    const cardForm = event.target.parentElement.parentElement;
    const createCardbtn = cardForm.previousElementSibling;
    createCardbtn.style.display = "block";
    cardForm.style.display = "none";
  } else if (event.target.getAttribute("id") === "creating-card") {
    const listId = event.target.getAttribute("data-list-id");
    const inputElement = event.target.parentElement.previousElementSibling;
    createCard(listId, inputElement.value);
    setTimeout(() => {
      location.reload();
    }, 500);
    inputElement.value = "";
  }else if (event.target.getAttribute("id") === "create-button") {
    const createBtn = event.target;
    const listForm = event.target.nextElementSibling;
    createBtn.style.display = "none";
    listForm.style.display = "block";
  } else if (event.target.getAttribute("id") === "close") {
    const listForm = event.target.parentElement.parentElement;
    const createBtn = listForm.previousElementSibling;
    listForm.style.display = "none";
    createBtn.style.display = "block";
  } else if (event.target.getAttribute("id") === "create") {
    const listName = event.target.parentElement.previousElementSibling;
    createList(id, listName.value);
    setTimeout(() => {
      location.reload();
    }, 500);
    listName.value = "";
    const listForm = event.target.parentElement.parentElement;
    const createBtn = listForm.previousElementSibling;
    listForm.style.display = "none";
    createBtn.style.display = "block";
  } else if (event.target.getAttribute("data-list-id")) {
    const val = event.target.getAttribute("data-list-id");
    console.log(val);
    deleteList(val);
    console.log("List-deleted");
  } else if (event.target.getAttribute("card-id")) {
    const cardVal = event.target.getAttribute("card-id");
    console.log(cardVal);
    deleteCard(cardVal);
    console.log("Card-deleted");
  }

});

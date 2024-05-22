const apiKey = "fd3359bcaac13a0e64bdacbce2258945";
const token =
  "ATTAe1153f1b2e36202ee1703fe0c99af46c661d48bad45f9966d09c49410ff701304883E53A";
const permission = "public";

export function createBoard(boardName) {
  const url = `https://api.trello.com/1/boards/?name=${boardName}&prefs_permissionLevel=${permission}&defaultLists=false&key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => new Error("Not valid url"));
}


export function fetchBoard(){
  const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`;

  return fetch(url, {
    method: "GET",
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => new Error ("Not valid url"));
}

export function getAllLists(boardID) {
  const url = `https://api.trello.com/1/boards/${boardID}/lists?key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
}

export function getCardData(listID) {
  const url = `https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}


export function createList(boardId, name) {
  return fetch(
    `https://api.trello.com/1/boards/${boardId}/lists?name=${name}&key=${apiKey}&token=${token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => {
    return response.json();
  });
}

export function createCard(listId, name) {
  const url = `https://api.trello.com/1/cards?name=${name}&idList=${listId}&key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteList(listId) {
  const url = `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "PUT",
  });
}


export function deleteCard(cardId){
  const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`;
  return fetch(url, {
    method: "DELETE",
  })
}
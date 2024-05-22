import { createBoard, fetchBoard} from "./script.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-board");
  const boardContainer = document.getElementById("board-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const getName = document.getElementById("boardName");
    createBoard(getName.value);
    getName.value = "";
    document.getElementById("my_modal_6").checked = false;
  });

  // Fetch and display boards on page load
  function fetchAndDisplayBoards() {
    fetchBoard()
      .then((boards) => {
        boards.forEach((board) => {
          const boardElement = document.createElement("button");
          boardElement.addEventListener('click' , () =>{
            window.location.href = `./boards.html?boardId=${board.id}`;
            
          })
          boardElement.className =
            "w-52 h-24 border-2 rounded-lg text-white btn text-xl ";
          boardElement.innerText = board.name;
          const imgurl = board.prefs.backgroundImage;
          const color = board.prefs.backgroundColor;
          boardElement.style.textAlign = "left"
          if (imgurl) {
            boardElement.style.backgroundImage = `url(${imgurl})`;
            boardElement.style.backgroundSize = "cover";
          } 
          boardElement.style.backgroundColor = color;
          boardContainer.appendChild(boardElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }

  // Initial fetch and display
  fetchAndDisplayBoards();
});

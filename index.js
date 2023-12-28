// const words = [];
// function setWords(items) {
//   items.forEach((item) => words.push(item));
// }
$(document).ready(function () {
  console.log("document mounted");
  const words = [
    "Banane",
    "Poire",
    "Avocat",
    "Mangue",
    "Citron",
    "Mandarine",
    "Cola",
    "Coca cola",
    "Orange",
    "Ananas",
    "Papaye",
    "Pastèque",
  ];
  const alphabetList = "abcdefghijklmnopqrstuvwxyz";
  const maxPenalities = 10;
  let penalities = 0;
  const letterInput = $("#letter-input");
  const startButton = $("#start-btn");
  const letterError = $("#letter-error");
  const playerNameDiv = $("#player-name");
  const nameInput = $("#username");
  const userSaveBtn = $("#btn-validate")
  const recordsTableDiv = $("#records-table");
  const messageRecordsParagr = $("#records-message");
  let records = []

  // Get word div
  const wordSpace = $("#word");
  let choosenLetter = "";
  const lettersFound = [];
  const lettersUsed = [];
  let totalWords = words.length;
  let randomWord = "";

  function startPlaying() {
    console.log("start");
    let randomIndex = Math.floor(Math.random() * totalWords);
    // let randomWord = words[randomIndex];
    randomWord = "norris";

    // Add letter places
    for (let i = 0; i < randomWord.length; i++) {
      wordSpace.append(`<span class='letter letter-${i}'>_</span>`);
    }

    letterInput.attr("disabled", false);
    letterInput.focus();
    startButton.attr("disabled", true);
    startButton.css("background-color", "rgba(255, 255, 255, 0.6)");
    startButton.css("background-color:", "rgba(255, 255, 255, 0.6)");
  }

  class Player {
    constructor(name, nbOfTrials = 0, elapsedTime = 0) {
      this.name = name;
      this.nbOfTrials = nbOfTrials;
      this.elapsedTime = elapsedTime;
    }
  }

  function previewRecords() {
    const player = new Player(nameInput.value);
    playerNameDiv.css("display", "none");
    recordsTableDiv.css("display", "flex");
    messageRecordsParagr.text("Meilleurs scores !!!");
    console.log(records);

    // Reset variables
    sec = 0;
    elapsedTime = 0;
    nbOfTrials = 0;

    if (localStorage.getItem("records") == null) {
      records.push(player);
      console.log(records);
      localStorage.setItem("records", JSON.stringify(records));
    } else {
      records = [];
      console.log(records);
      persistedRecords = JSON.parse(localStorage.getItem("records"));
      console.log(records);
      records = [...persistedRecords, player];
      console.log(records);
      localStorage.setItem("records", JSON.stringify(records));
    }

    sortRecords(records);
    previewRank(orderedRecords, player);
    console.log(orderedRecords);
    fillRecordsTable(orderedRecords);
    records = [];
    orderedRecords = [];
    console.log(records);
  }

  // Display initial penalities count
  $("#penalities .content").append(`<span>${penalities}</span>`);

  letterInput.on("input", function (e) {
    letterError.css("display", "none");
    let letter = e.target.value;
    console.log(e.target.value);
    if (!letterInAlphabet(letter)) {
      letterError
        .text("Veuillez taper une lettre valide")
        .css("display", "block");
      return;
    }

    if (!lettersUsed.includes(letter)) {
      lettersUsed.push(letter);
    }
    console.log(lettersUsed);

    // if (letter) {
    console.log(randomWord.indexOf(letter));

    if (randomWord.includes(letter)) {
      if (lettersFound.includes(letter)) {
        letterError
          .text("Cette lettre a déjà été trouvée")
          .css("display", "block");
        penalities++;
        $("#penalities .content").empty().append(`<span>${penalities}</span>`);
        letterInput.val("");
        checkResult();
        return;
      }

      const letterIndexes = randomWord
        .toLowerCase()
        .split("")
        .map(function (value, index) {
          if (value === letter) return index;
        })
        .filter(function (item) {
          return item != undefined;
        });

      console.log(letterIndexes);

      letterIndexes.forEach(function (i) {
        lettersFound.push(letter);
        $(`.letter-${i}`).text(letter);
        console.log(lettersFound);
      });
      checkResult();
      letterInput.val("");
    } else {
      penalities++;
      checkResult();
      $("#penalities .content").empty().append(`<span>${penalities}</span>`);
      letterInput.val("");
    }

    $("#used-letters").css("display", "flex");
    $("#used-letters .content")
      .empty()
      .append(`<span>${lettersUsed.join("  ")}</span>`);

    console.log(letterIndexes);
    console.log(randomWord.indexOf(letter));
    console.log(lettersFound);
    // }

    checkResult();
  });

  /**
   * Check if letter typed in alphabet list
   * @param {*} letter
   * @returns {Boolean}
   */
  function letterInAlphabet(letter) {
    return alphabetList.includes(letter);
  }

  function checkResult() {
    console.log("checking");
    console.log(randomWord);
    console.log(lettersFound);
    console.log(randomWord.length);
    console.log(lettersFound.length);
    console.log(lettersFound.length === randomWord.length);
    if (penalities === maxPenalities) {
      // TODO Player loses
      $("#word").css("color", "rgb(192, 30, 30)");
      letterInput.val("");
      letterInput.attr("disabled", true);
    } else {
      if (lettersFound.length === randomWord.length) {
        // TODO Player win
        $("#word").css("color", "rgb(56, 187, 56)");
        playerNameDiv.css("display", "flex")
        letterInput.val("");
        letterInput.attr("disabled", true);
        userSaveBtn.on('click', previewRecords)
      }
    }
  }

  startButton.on("click", startPlaying);
});

const alphabetList = "abcdefghijklmnopqrstuvwxyz";
const maxPenalities = 10;
let penalities = 0;
const letterInput = $("#letter-input");
const startButton = $("#start-btn");
const letterError = $("#letter-error");
// Get word div
const wordSpace = $("#word");
let choosenLetter = "";
let lettersFound = [];
let totalWords = words.length;

function startPlaying() {
  console.log("start");
  let randomIndex = Math.floor(Math.random() * totalWords);
  // let randomWord = words[randomIndex];
  let randomWord = "mandarine";

  // Add letter places
  for (let i = 0; i < randomWord.length; i++) {
    wordSpace.append(`<span class='letter letter-${i}'>_</span>`);
  }

  startButton.attr("disabled", true);
}

// console.log(randomWord);
// let randomWordLength = randomWord.length;

// startButton.on("click", function () {
//   console.log("start");
//   let randomIndex = Math.floor(Math.random() * totalWords);
//   // let randomWord = words[randomIndex];
//   let randomWord = "mandarine";

//   // Add letter places
//   for (let i = 0; i < randomWord.length; i++) {
//     wordSpace.append(`<span class='letter letter-${i}'>_</span>`);
//   }

//   startButton.attr("disabled", true);
// });

// letterInput.on("input", function (e) {
//   letterError.css("display", "none");
//   let letter = e.target.value;
//   console.log(e.target.value);
//   if (!letterInAlphabet(letter)) {
//     letterError
//       .text("Veuillez taper une lettre valide")
//       .css("display", "block");
//     return;
//   }

//   if (letter) {
//     console.log(randomWord.indexOf(letter));

//     if (randomWord.includes(letter)) {
//       if (lettersFound.includes(letter)) {
//         letterError
//           .text("Cette lettre a déjà été trouvée")
//           .css("display", "block");
//         penalities++;
//         return;
//       }

//       const letterIndexes = randomWord
//         .toLowerCase()
//         .split("")
//         .map(function (e, i) {
//           if (e === letter) return `${i}`;
//         });

//       letterIndexes.forEach(function (i) {
//         lettersFound.push(letter);
//         $(`.letter-${i}`).text(letter);
//       });
//     } else {
//       penalities++;
//     }

//     console.log(letterIndexes);
//     console.log(randomWord.indexOf(letter));
//     console.log(lettersFound);
//   }

//   checkResult();
// });

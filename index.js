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
  const userSaveBtn = $("#btn-validate");
  const recordsTableDiv = $("#records-table");
  const messageRecordsParagr = $("#records-message");
  const recordsTable = $("table");
  const head = $("#table-head");
  let records = [];
  let orderedRecords = [];

  // Get word div
  const wordSpace = $("#word");
  let choosenLetter = "";
  const lettersFound = [];
  const lettersUsed = [];
  let totalWords = words.length;
  let randomWord = "";

  function startPlaying() {
    letterInput.val("");
    console.log("start");
    wordSpace.empty();
    $("#word").css("color", "#000");
    penalities = 0;
    lettersFound.length = 0;
    lettersUsed.length = 0;
    $("#penalities .content").empty();
    $("#used-letters .content").empty();
    $("#used-letters").css("display", "none");
    recordsTable.css("display", "none")
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
  }

  class Player {
    constructor(name, penalities = 0) {
      this.username = name;
      this.penalities = penalities;
    }
  }

  function previewRecords() {
    const player = new Player(nameInput.val(), penalities);
    playerNameDiv.css("display", "none");
    recordsTableDiv.css("display", "flex");
    messageRecordsParagr.text("Meilleurs scores !!!");
    console.log(records);

    // Reset values
    nameInput.val("");
    penalities = 0;

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

  function previewRank(orderedRecords, player) {
    if (orderedRecords.indexOf(player) == 0)
      messageRecordsParagr.text("Vous occupez la 1re place !");
    if (orderedRecords.indexOf(player) == 1)
      messageRecordsParagr.text("Vous occupez la 2e place !");

    if (orderedRecords.indexOf(player) == 2)
      messageRecordsParagr.text("Vous occupez la 3e place !");
    if (orderedRecords.indexOf(player) == 3)
      messageRecordsParagr.text("Vous occupez la 4e place !");
    if (orderedRecords.indexOf(player) == 4)
      messageRecordsParagr.text("Vous occupez la 5e place !");
    if (orderedRecords.indexOf(player) == 5)
      messageRecordsParagr.text("Vous occupez la 6e place !");
    if (orderedRecords.indexOf(player) == 6)
      messageRecordsParagr.text("Vous occupez la 7e place !");
    if (orderedRecords.indexOf(player) == 7)
      messageRecordsParagr.text("Vous occupez la 8e place !");
    if (orderedRecords.indexOf(player) == 8)
      messageRecordsParagr.text("Vous occupez la 9e place !");
    if (orderedRecords.indexOf(player) == 6)
      messageRecordsParagr.text("Vous occupez la 10e place !");
  }

  function sortRecords(records) {
    while (records.length != 0) {
      var bestRecord = new Player(
        "Best Player",
        Number.MAX_VALUE,
        "Number.MAX_VALUE"
      );

      for (let record of records) {
        if (record.penalities < bestRecord.penalities) {
          bestRecord = record;
        }
      }
      orderedRecords.push(bestRecord);
      records.splice(records.indexOf(bestRecord), 1);
    }
  }

  function fillRecordsTable(orderedRecords) {
    console.log("fill records table");
    recordsTable.empty();recordsTable
    recordsTable.append(head);

    console.log(recordsTable);

    console.log(orderedRecords);
    orderedRecords.slice(0, 10).forEach(function (record) {
      addLine(orderedRecords.indexOf(record), record);
    });
  }

  function addLine(index, record) {
    // create line
    const line = $("<tr>");

    // Create columns
    const idColumn = $("<td>");
    idColumn.text(index + 1);
    const nameColumn = $("<td>");
    nameColumn.text(record.username)
    const nbColumn = $("<td>");
    nbColumn.text( record.penalities);
    // const timeColumn = $("<td>");
    // timeColumn.text(record.elapsedTime);

    // Add columns to line
    line.append(idColumn);
    line.append(nameColumn);
    line.append(nbColumn);
    // line.append(timeColumn);

    console.log(line)

    // Add line to table
    recordsTable.append(line);
    console.log("line added")
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
      // letterInput.val("");
    } else {
      penalities++;
      checkResult();
      $("#penalities .content").empty().append(`<span>${penalities}</span>`);
      // letterInput.val("");
    }

    if (lettersUsed.length > 0) {
      $("#used-letters").css("display", "flex");
      $("#used-letters .content")
        .empty()
        .append(`<span>${lettersUsed.join(" ")}</span>`);
    }

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
      // letterInput.val("");
      letterInput.attr("disabled", true);

      startButton.text("Rejouer");
      startButton.css("display", "block");
      startButton.attr("disabled", false);
      startButton.css("background-color", "rgb(56, 187, 56)");
    } else {
      if (lettersFound.length === randomWord.length) {
        // TODO Player win
        $("#word").css("color", "rgb(56, 187, 56)");
        playerNameDiv.css("display", "flex");
        console.log("success");
        // letterInput.val("");
        letterInput.attr("disabled", true);

        startButton.text("Rejouer");
        startButton.css("display", "block");
        startButton.attr("disabled", false);
        startButton.css("background-color", "rgb(56, 187, 56)");
      }
    }
  }

  startButton.on("click", startPlaying);
  userSaveBtn.on("click", previewRecords);
});

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

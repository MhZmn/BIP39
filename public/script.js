import copySeedPhrase from "./copy.js";

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copySeedPhrase);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("generateButton")
    .addEventListener("click", generateSeedPhrase);
});

async function generateSeedPhrase() {
  const numWords = document.getElementById("numWords").value;
  if (numWords < 12 || numWords > 24) {
    alert("Please enter a number between 12 and 24.");
    return;
  }

  const response = await fetch(`/generate?numWords=${numWords}`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.ok) {
    displaySeedPhrase(data.phrase, numWords);
  } else {
    alert("Error generating seed phrase.");
  }
}

function displaySeedPhrase(phrase, numWords) {
  const words = phrase.split(" ");

  document.getElementById("column1").innerHTML = "";
  document.getElementById("column2").innerHTML = "";

  const half = Math.ceil(numWords / 2);

  words.slice(0, half).forEach((word) => {
    const li = document.createElement("li");
    li.classList.add("phrase-word");
    li.textContent = word;
    document.getElementById("column1").appendChild(li);
  });

  words.slice(half).forEach((word) => {
    const li = document.createElement("li");
    li.classList.add("phrase-word");
    li.textContent = word;
    document.getElementById("column2").appendChild(li);
  });

  document.getElementById("seedPhraseText").textContent = phrase;
}

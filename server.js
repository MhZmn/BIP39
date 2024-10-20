const express = require("express");
const mongoose = require("mongoose");
const wordList = require("./word-list.js");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/seedphrases");

const seedPhraseSchema = new mongoose.Schema({
  phrase: String,
  createdAt: { type: Date, default: Date.now },
});

const SeedPhrase = mongoose.model("SeedPhrase", seedPhraseSchema);

function generateSeedPhrase(numWords) {
  let seedPhrase = [];
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    seedPhrase.push(wordList[randomIndex]);
  }
  return seedPhrase.join(" ");
}

async function generateUniqueSeedPhrase(numWords) {
  let unique = false;
  let newSeedPhrase;

  while (!unique) {
    newSeedPhrase = generateSeedPhrase(numWords);

    const existingPhrase = await SeedPhrase.findOne({ phrase: newSeedPhrase });

    if (!existingPhrase) {
      unique = true;
    }
  }

  const savedPhrase = new SeedPhrase({ phrase: newSeedPhrase });
  await savedPhrase.save();

  return newSeedPhrase;
}

app.get("/generate", async (req, res) => {
  const numWords = parseInt(req.query.numWords);

  if (numWords < 12 || numWords > 24) {
    return res.status(400).send("Invalid number of words.");
  }

  const uniqueSeedPhrase = await generateUniqueSeedPhrase(numWords);

  res.json({ phrase: uniqueSeedPhrase });
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default function copySeedPhrase() {
  const seedPhraseText = document.getElementById("seedPhraseText").textContent;

  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");
    textarea.value = seedPhraseText;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      alert("Seed phrase copied to clipboard!");
    } catch (err) {
      console.error("Fallback: Could not copy text", err);
    }

    document.body.removeChild(textarea);
  } else {
    navigator.clipboard
      .writeText(seedPhraseText)
      .then(() => {
        alert("Seed phrase copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }
}

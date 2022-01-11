const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("input");
const noDefMessage = document.querySelector(".no-definition");
const clearBtn = document.querySelector(".clear-icon");
const audioBtn = document.querySelector(".audio-icon i");
const example = document.querySelector(".example");
const synonyms = document.querySelector(".synonyms .list");
var audio;

function data(result, word) {
  if (result.title) {
    console.log(result);

    noDefMessage.innerHTML = result.message;
  } else {
    console.log(result);
    wrapper.classList.add("active");

    const definitions = result[0].meanings[0].definitions[0];
    const phonetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word small").innerText = phonetics;
    document.querySelector(".meaning").innerText = definitions.definition;
    audio = new Audio("https:" + result[0].phonetics[0].audio);

    if (definitions.example == undefined) {
      example.parentElement.style.display = "none";
    } else {
      example.parentElement.style.display = "block";

      document.querySelector(".example").innerText = definitions.example;
    }

    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]}</span>, `;
        tag =
          i == 4
            ? (tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>`)
            : tag;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
  }
}

function search(word) {
  fetchApi(word);
  input.value = word;
}

function fetchApi(word) {
  wrapper.classList.remove("active");
  noDefMessage.innerHTML = `<i class="bx bx-loader bx-spin"></i>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => data(result, word))
    .catch(() => {
      noDefMessage.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

input.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    noDefMessage.style.display = "block";
    fetchApi(word);
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  input.focus();
  noDefMessage.style.display = "none";
  wrapper.classList.remove("active");
});

audioBtn.addEventListener("click", () => {
  audioBtn.style.color = "#d62c0b";
  audio.play();
  setTimeout(() => {
    audioBtn.style.color = "white";
  }, 800);
});

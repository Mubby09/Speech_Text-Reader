const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const ReadButton = document.getElementById("read");
const PauseButton = document.getElementById("pause");
const CancelButton = document.getElementById("cancel");
const ResumeButton = document.getElementById("resume");
const ToggleButton = document.getElementById("toogle");
const closeButton = document.getElementById("close");
const textBox = document.getElementById("text-box");

const data = [
  {
    image: "./images/thirsty.jpg",
    text: "I am Thirsty"
  },
  {
    image: "./images/angry.jpg",
    text: "I am Angry"
  },
  {
    image: "./images/grandma.jpg",
    text: "I want to see Grandma"
  },
  {
    image: "./images/happy.jpg",
    text: "I am happy"
  },
  {
    image: "./images/home.jpg",
    text: "I want to go Home"
  },
  {
    image: "./images/hungry.jpg",
    text: "I am hungry"
  },
  {
    image: "./images/hurt.jpg",
    text: "I am Hurt"
  },
  {
    image: "./images/outside.jpg",
    text: "I want to go Outside"
  },
  {
    image: "./images/sad.jpg",
    text: "I am Sad"
  },
  {
    image: "./images/scared.jpg",
    text: "I am Scared"
  },
  {
    image: "./images/school.jpg",
    text: "I miss school"
  },
  {
    image: "./images/tired.jpg",
    text: "I am Tired"
  },
  {
    image: "./images/sick.jpg",
    text: "I am Sick"
  }
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.className = `box`;
  box.innerHTML = `
  <img src='${image}' alt='${text}'/>
  <p class='info'>${text}</p>
  `;

  //@todo - speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speak();

    box.classList.add("active");

    setTimeout(() => {
      box.classList.remove("active");
    }, 1000);
  });

  main.appendChild(box);
  //create array to store voices
}

//init speech
const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

//voices change
speechSynthesis.addEventListener("voiceschanged", getVoices);

////////////////////////////////////////////////////////////////////////////////////////////////////

//set speech text
function setTextMessage(text) {
  message.text = text;
}

//speak text
function speak() {
  speechSynthesis.speak(message);
}

function pause() {
  speechSynthesis.pause(message);
}

function resume() {
  speechSynthesis.resume(message);
}

function cancel() {
  speechSynthesis.cancel(message);
}

//set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//Toggle textBox
function showArea() {
  textBox.classList.toggle("show");
}
//close button on textBox
function TextAreaButton() {
  textBox.classList.remove("show");
}

ToggleButton.addEventListener("click", showArea);
closeButton.addEventListener("click", TextAreaButton);
//change Voice
voicesSelect.addEventListener("change", setVoice);
//Read text button
ReadButton.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speak(text);
});

PauseButton.addEventListener("click", () => {
  setTextMessage(textArea.value);
  pause(text);
});

ResumeButton.addEventListener("click", () => {
  setTextMessage(textArea.value);
  resume(text);
});

CancelButton.addEventListener("click", () => {
  setTextMessage(textArea.value);
  cancel(text);
});

getVoices();

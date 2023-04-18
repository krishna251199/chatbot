
// var css=document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body=document.getElementById("gradient");
// console.log(css);
// console.log(color1);
// console.log(color2);
// console.log(body);
// body.style.background = "red";
function colorListiner()
{
    body.style.background = 
    "linear-gradient(to right, " + color1.value + ", "+ color2.value+ ")";
}

color1.addEventListener("input", colorListiner)
color2.addEventListener("input", colorListiner)
    






const form = document.getElementById("chatbot-form");
const userInput = document.getElementById("user-input");
const messagesContainer = document.querySelector(".chatbot-messages");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userMessage = userInput.value;
  if (userMessage !== "") {
    addMessage("user", userMessage);
    fetch("/get-response?user_input=" + userMessage)
      .then((response) => response.json())
      .then((data) => {
        addMessage("chatbot", data["response"]);
      });
    userInput.value = "";
  }
});

function addMessage(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.classList.add(`${sender}-message`);
  messageElement.innerText = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

const chatHistory = document.getElementById("chat-history");

const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  sendMessage(userInput.value);
});

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage(userInput.value);
  }
});

function sendMessage(message) {
  if (message.trim() === "") {
    return;
  }
  addUserMessage(message);
  fetch("/get-response", {
    method: "POST",
    body: JSON.stringify({ message: message }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => addBotMessage(data.response));
  userInput.value = "";
}

function addUserMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "user-message-container";
  const messageBubble = document.createElement("div");
  messageBubble.className = "user-message-bubble";
  messageBubble.innerHTML = message;
  messageContainer.appendChild(messageBubble);
  chatHistory.appendChild(messageContainer);
}

function addBotMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "bot-message-container";
  const messageBubble = document.createElement("div");
  messageBubble.className = "bot-message-bubble";
  messageBubble.innerHTML = message;
  messageContainer.appendChild(messageBubble);
  chatHistory.appendChild(messageContainer);
  messageBubble.scrollIntoView({ behavior: "smooth" });
}


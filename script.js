
const PASSCODE = "1113";

const screens = document.querySelectorAll(".screen");
const pinDots = document.querySelectorAll("#pinDots span");
const errorMessage = document.getElementById("errorMessage");
const unlockButton = document.getElementById("unlockButton");
const numberButtons = document.querySelectorAll(".key[data-number]");
const deleteButton = document.getElementById("deleteNumber");

let enteredCode = "";

/* PAGE NAVIGATION */

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.remove("active"));

  const nextScreen = document.getElementById(screenId);

  if (nextScreen) {
    nextScreen.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  closeModal();
}

/* ON-SCREEN KEYPAD */

function updateDots() {
  pinDots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < enteredCode.length);
  });
}

function enterNumber(number) {
  if (enteredCode.length >= 4) return;

  errorMessage.textContent = "";
  enteredCode += number;
  updateDots();
}

function deleteNumber() {
  enteredCode = enteredCode.slice(0, -1);
  errorMessage.textContent = "";
  updateDots();
}

function unlock() {
  if (enteredCode === PASSCODE) {
    enteredCode = "";
    updateDots();
    errorMessage.textContent = "";
    showScreen("greetingScreen");
  } else {
    enteredCode = "";
    updateDots();
    errorMessage.textContent = "incorrect code, try again ♡";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    enterNumber(button.dataset.number);
  });
});

deleteButton.addEventListener("click", deleteNumber);
unlockButton.addEventListener("click", unlock);

/* MODAL CONTENT */

const modalData = {
  poem: {
    eyebrow: "01 · a little poem",
    title: "poem for her",
    content: `
      <p>there is something lovely about the way you exist, in the little things you do and the things you don't even notice.</p>
      <p>in the way your laughter fills a quiet room, in the stories you tell, and in the little moments that become something worth remembering.</p>
      <p>if i could wish one thing for you, it would be this: may you always see the beauty in yourself that the people who care about you already see.</p>
      <p>and if the world ever feels a little too loud, i hope you find a place where your heart can rest.</p>
      <p><em>you are a lovely thing to know, kai. ♡</em></p>
    `
  },

  things: {
    eyebrow: "02 · little reminders",
    title: "things i want you to know",
    content: `
      <p>i hope you never feel like you have to earn the love and kindness you receive. you deserve them simply because you are you.</p>
      <p>you don't have to have everything figured out right now. take your time, make mistakes, learn new things, and allow yourself to grow at your own pace.</p>
      <p>please remember to give yourself the same patience and understanding that you so easily give to other people.</p>
      <p>and whenever you forget how much you matter, i hope this little note reminds you that you are appreciated more than you know.</p>
    `
  },

  days: {
    eyebrow: "03 · for your new chapter",
    title: "for the days ahead",
    content: `
      <p>i hope this new year of your life brings you closer to the things you've been wishing for.</p>
      <p>may you have more reasons to laugh, more places to discover, more memories to make, and more little achievements to celebrate.</p>
      <p>i hope you find courage on difficult days and peace on the days when you need to slow down.</p>
      <p>whatever this next chapter brings, i hope it gives you plenty of reasons to look forward to tomorrow.</p>
      <p><em>here's to another beautiful year, baby. ♡</em></p>
    `
  }
};

const modal = document.getElementById("contentModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

function openModal(type) {
  const data = modalData[type];

  if (!data) return;

  modalEyebrow.textContent = data.eyebrow;
  modalTitle.textContent = data.title;
  modalContent.innerHTML = data.content;

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function closeModalOutside(event) {
  if (event.target === modal) {
    closeModal();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* FLOATING FLOWERS, HEARTS AND BALLOONS */

const decorations = document.getElementById("decorations");

const decorationItems = [
  "♡", "🌸", "🎈", "♥", "✿", "🎈",
  "♡", "🌷", "♥", "🎈", "❀", "♡"
];

for (let i = 0; i < 22; i++) {
  const item = document.createElement("span");

  item.classList.add("floating-item");

  item.textContent =
    decorationItems[Math.floor(Math.random() * decorationItems.length)];

  item.style.left = `${Math.random() * 100}%`;
  item.style.fontSize = `${16 + Math.random() * 17}px`;
  item.style.animationDuration = `${12 + Math.random() * 13}s`;
  item.style.animationDelay = `${Math.random() * 12}s`;

  decorations.appendChild(item);
}

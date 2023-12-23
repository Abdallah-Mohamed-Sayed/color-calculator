const firstInput = document.getElementById("smallCable");
const micBtn = document.querySelector("#hearBtn");
let isSpeechActive = false;
let recognition;

function getColor(order) {
  const listColors = [
    "ازرق",
    "برتقاني",
    "اخضر",
    "بني",
    "رمادي",
    "ابيض",
    "احمر",
    "اسود",
    "اصفر",
    "بنفسجي",
    "بمبي",
    "لبني",
  ];
  return listColors[order - 1];
}

function calculateColor() {
  const smallCableInput = document.getElementById("smallCable");
  const smallCable = parseInt(smallCableInput.value);

  if (isNaN(smallCable)) {
    document.getElementById("output").innerText =
      "Please enter valid numeric values.";
    return;
  }

  if (smallCable > 144 || smallCable <= 0) {
    document.getElementById("output").innerText =
      "This small optical cable does not exist for the selected cable.";
  } else {
    const outDiv = Math.ceil(smallCable / 12);
    const tubeColor = getColor(outDiv);

    const order = smallCable - (outDiv - 1) * 12;
    const smallCableColor = getColor(order);

    const outputText = `
            لون التيوب: ${tubeColor}
            رقم التيوب: ${outDiv}
            لون الفرعة: ${smallCableColor}
            رقم الفرعة: ${order}
          `;
    document.getElementById("output").innerText = outputText;

    const allSmallCables = document.querySelectorAll(
      "#Main g:not(#Jacket) circle:not(.t)"
    );
    const smallcableSVG = document.querySelector(
      `#tube_${outDiv} .num-${order}:not(.t)`
    );
    allSmallCables.forEach((e) => {
      e.classList.remove("active");
    });
    smallcableSVG.parentElement.appendChild(smallcableSVG);
    smallcableSVG.classList.add("active");
  }

  // Show output with fade-in animation
  document.getElementById("output").style.opacity = "1";
}

function reversedFunc() {
  const inpts = document.querySelectorAll(".nest input");
  const outputP = document.querySelector(".output p");
  let checkedCount = 0;

  inpts.forEach((inp) => {
    if (inp.checked) {
      checkedCount++;
    }
  });
  if (checkedCount < 2) {
    outputP.innerHTML =
      "Please choose from tube number and small cable number too";
  } else {
    const tubeColor = +document
      .querySelector(".tube-color input:checked")
      .id.match(/\d+/g)[0];
    const smallColor = +document
      .querySelector(".small-color input:checked")
      .id.match(/\d+/g)[0];
    let sCN = (tubeColor - 1) * 12 + smallColor;

    outputP.innerHTML = `رقم الفرعة في كابل ال 144 فرعة: ${sCN}`;
  }
}

function startRecord() {
  isSpeechActive = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    // Extract numbers from the transcript using a regular expression
    const numbers =
      transcript.match(/\b(?:[1-9][0-9]?|1[0-3][0-9]|14[0-4])\b/g) || [];

    // Process the extracted numbers
    numbers.forEach((number) => {
      const parsedNumber = parseInt(number, 10);
      // console.log("Valid number:", parsedNumber);
      firstInput.value = parsedNumber;
      calculateColor();
      // You can perform further actions with the numbers here
    });
  });

  recognition.addEventListener("end", () => {
    if (isSpeechActive) {
      recognition.start();
    }
  });

  if (isSpeechActive) {
    recognition.start();
  }
}

function stopRecord() {
  isSpeechActive = false;
  if (recognition) {
    recognition.stop();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial focus animation for the first input field
  firstInput.focus();
  firstInput.select();

  document
    .getElementById("smallCable")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        calculateColor();
      }
    });

  const tabs = document.querySelectorAll(".up li");
  const conts = document.querySelectorAll(".down > div");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((e) => {
        e.classList.remove("active");
      });
      tab.classList.add("active");

      conts.forEach((e) => {
        e.classList.remove("active");
      });

      document
        .querySelector(`.${tab.getAttribute("data-for")}`)
        .classList.add("active");
    });
  });

  micBtn.addEventListener("click", () => {
    if (!isSpeechActive) {
      startRecord();
      micBtn.classList.add("active");
    } else {
      stopRecord();
      micBtn.classList.remove("active");
    }
  });
});

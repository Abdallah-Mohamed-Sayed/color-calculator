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

  if (smallCable > 144) {
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

document.addEventListener("DOMContentLoaded", function () {
  // Initial focus animation for the first input field
  const firstInput = document.getElementById("smallCable");
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
});

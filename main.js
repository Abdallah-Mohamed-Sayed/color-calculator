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
  const cableType = parseInt(document.getElementById("cableType").value);
  const cableTypes = [4, 12, 36, 144];

  const smallCableInput = document.getElementById("smallCable");
  const smallCable = parseInt(smallCableInput.value);

  if (isNaN(cableType) || isNaN(smallCable)) {
    document.getElementById("output").innerText =
      "Please enter valid numeric values.";
    return;
  }

  if (!cableTypes.includes(cableType)) {
    document.getElementById("output").innerText =
      "This is an invalid cable type.";
  } else {
    if (smallCable > cableType) {
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

      // Focus on the next input field or submit the form if it's the last input
      const nextInput = smallCableInput.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      } else {
        document.getElementById("submitButton").click();
      }
    }
  }

  // Show output with fade-in animation
  document.getElementById("output").style.opacity = "1";
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial focus animation for the first input field
  const firstInput = document.getElementById("cableType");
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

  document
    .getElementById("cableType")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        document.getElementById("smallCable").focus();
      }
    });
});

window.addEventListener("load", function () {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  const controlsContainer = document.querySelector(".controls");
  const inputs = controlsContainer.querySelectorAll("input");
  const saveButton = controlsContainer.querySelector("#save");
  const eraserButton = controlsContainer.querySelector("#eraser");
  const bucketButton = controlsContainer.querySelector("#bucket");
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  let backgroundColor = "#ffffff";

  let drawing = false;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const controls = {
    strokeColor: "rgb(0,0,0)",
    strokeWidth: 10,
  };

  inputs.forEach((input) => {
    input.addEventListener("change", handleInputChange);
  });

  saveButton.addEventListener("click", saveImg);
  eraserButton.addEventListener("click", setToErase);
  bucketButton.addEventListener("click", setBackground);

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  function stopDrawing(e) {
    drawing = false;
    context.closePath();
    showHeader();
  }

  function startDrawing(e) {
    startX = e.clientX;
    startY = e.clientY;
    drawing = true;
    context.beginPath();
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = controls.strokeColor;
    context.lineWidth = controls.strokeWidth;
    context.moveTo(startX, startY);
  }

  function draw(e) {
    if (!drawing) return;

    if (e.clientY < 100) {
      hideHeader();
    } else {
      showHeader();
    }

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
  }

  function handleInputChange() {
    controls[this.name] = this.value;
    saveButton.style.borderColor = controls.strokeColor;
    eraserButton.style.borderColor = controls.strokeColor;
    controlsContainer.style.borderColor = controls.strokeColor;
  }

  function saveImg() {
    const fakeTag = document.createElement("a");
    fakeTag.href = canvas.toDataURL();
    fakeTag.alt = "Download!";
    fakeTag.setAttribute("download", "Dev off drawing!");
    fakeTag.innerText = "Download";
    fakeTag.click();
  }

  function setToErase() {
    controls.strokeColor = backgroundColor;
  }

  function hideHeader() {
    controlsContainer.style.transform = "translateY(-100px)";
  }

  function showHeader() {
    controlsContainer.style.transform = "translateY(0)";
  }

  function setBackground() {
    context.fillStyle = controls.strokeColor;
    backgroundColor = controls.strokeColor;
    context.fillRect(0, 0, WIDTH, HEIGHT);
  }
});

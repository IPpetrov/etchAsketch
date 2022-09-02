
const slider = document.getElementById("myRange")
const sliderOutpost = document.querySelector("#sliderValue")
const choiceButtons = document.querySelectorAll('.choice')
const clearButton = document.querySelector(".clear-button")

let colorChoice = "black"

choiceButtons.forEach(button => {
  button.addEventListener('click', (e) => {
      colorChoice = button.value
    })
})

let mouseDown = false;

document.body.onmousedown = function() {
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

createGrid()
drawing()

function createGrid() {
    for (let i = 0; i < slider.value ** 2; i++) {
        const div = document.createElement("div")
        div.setAttribute('draggable', "false")
        div.classList.add('grid')
        div.style.height = 450 / slider.value + "px"
        div.style.width = 450 / slider.value + "px"
        document.querySelector('.inside').appendChild(div)
    }
  } 

function drawing() {
    const drawDiv = document.querySelectorAll(".grid")
    drawDiv.forEach(div => {
      div.addEventListener("mouseover", () => {
        if (mouseDown){
          if (colorChoice == "rainbow") {
            div.style.backgroundColor = rainbow()
          } else if (colorChoice == "grayscale") {
            let currentOpacity = Number(div.style.backgroundColor.slice(-4, -1));
            if (currentOpacity < 1) {
                div.style.backgroundColor = "rgba(0, 0, 0, " + (currentOpacity + 0.1) + ")"
            } else if (div.style.backgroundColor == 'rgb(0, 0, 0)') {
            return
            } else {
                div.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
          } else {
            div.style.backgroundColor = "black"
          }
        }
      })
    })
}

slider.oninput = function() {
  document.querySelector(".inside").innerHTML = ""
  sliderOutpost.textContent = slider.value + "x" + slider.value
  createGrid()
  drawing()
  }

function rainbow() {
  let colorOne = Math.floor(Math.random() * 255)
  let colorTwo = Math.floor(Math.random() * 255)
  let colorThree = Math.floor(Math.random() * 255)
  let finalColor = "rgb(" + colorOne + "," + colorTwo + "," + colorThree + ")"
  return finalColor
}


clearButton.addEventListener("click", function() {
  const gridCells = document.querySelectorAll(".grid")
  for(i = 0; i < gridCells.length ; i++) {
    gridCells[i].style.backgroundColor = "rgb(236, 236, 236)"
  }
})

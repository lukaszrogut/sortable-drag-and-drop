const RICHEST_PEOPLE = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Larry Page",
  "Lukasz Rogut",
]

const draggableList = document.getElementById("draggable-list")
const check = document.getElementById("check")

// Store the list items
const listItems = []

let dragStartIndex

createList()
addEventListeners()

function dragStart(e) {
  console.log("start")
  dragStartIndex = +this.closest("li").getAttribute("data-index")
  console.log("start index", dragStartIndex)
}

function dragEnter() {
  console.log("enter")
  this.classList.add("over")
}

function dragLeave() {
  console.log("leave")
  this.classList.remove("over")
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index")
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove("over")
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable")
  const itemTwo = listItems[toIndex].querySelector(".draggable")
  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function dragOver(e) {
  e.preventDefault()
}

function createList() {
  ;[...RICHEST_PEOPLE]
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((person, index) => {
      const listItem = document.createElement("li")
      listItem.setAttribute("data-index", index)
      listItem.innerHTML = `<span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person.value}</p>
    </div>
    `
      listItems.push(listItem)
      draggableList.appendChild(listItem)
    })
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable")
  const dragListItems = document.querySelectorAll(".draggable-list li")

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart)
  })

  dragListItems.forEach((dragListItem) => {
    dragListItem.addEventListener("dragover", dragOver)
    dragListItem.addEventListener("drop", dragDrop)
    dragListItem.addEventListener("dragenter", dragEnter)
    dragListItem.addEventListener("dragleave", dragLeave)
  })
}

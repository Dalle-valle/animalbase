"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let sortDirection = false;

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  document.querySelectorAll(".filterbutton button").forEach((button) => {
    button.addEventListener("click", filtering);
  });
  document.querySelector("#sorting > th:nth-child(1)").addEventListener("click", sortingName);
  document.querySelector("#sorting > th:nth-child(2)").addEventListener("click", sortingType);
  document.querySelector("#sorting > th:nth-child(3)").addEventListener("click", sortingDescription);
  document.querySelector("#sorting > th:nth-child(4)").addEventListener("click", sortingAge);

  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    allAnimals = jsonData.map(preapareObject);

    // TODO: This might not be the function we want to call first

    const cleanedData = Object.create(Animal);

    const [name, the, desc, type] = jsonObject.fullname.split(" ");

    cleanedData.name = name;
    cleanedData.type = type;
    cleanedData.desc = desc;
    allAnimals.push(cleanedData);
    console.log(allAnimals);
  });
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
function isDog(animal) {
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}

function isCat(animal) {
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

function isDragon(animal) {
  if (animal.type === "dragon") {
    return true;
  } else {
    return false;
  }
}

function isHorse(animal) {
  if (animal.type === "horse") {
    return true;
  } else {
    return false;
  }
}

function filtering(filter) {
  let animals = allAnimals.slice(); // default list all animals
  filter = this.dataset.filter;
  if (filter === "cat") {
    animals = allAnimals.filter((animal) => animal.type === "cat");
  } else if (filter === "dog") {
    animals = allAnimals.filter((animal) => animal.type === "dog");
  } else if (filter === "dragon") {
    animals = allAnimals.filter((animal) => animal.type === "dragon");
  } else if (filter === "horse") {
    animals = allAnimals.filter((animal) => animal.type === "horse");
  }
  console.table(animals);

  displayList(animals);
}
function removeShit() {
  document.querySelector("#sorting > th:nth-child(1)").classList = "";
  document.querySelector("#sorting > th:nth-child(2)").classList = "";
  document.querySelector("#sorting > th:nth-child(3)").classList = "";
  document.querySelector("#sorting > th:nth-child(4)").classList = "";
  document.querySelector("#sorting > th:nth-child(1) i").classList = "";
  document.querySelector("#sorting > th:nth-child(2) i").classList = "";
  document.querySelector("#sorting > th:nth-child(3) i").classList = "";
  document.querySelector("#sorting > th:nth-child(4) i").classList = "";
}
function sortingName() {
  let animals = allAnimals.slice(); // default list all animals

  animals.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  removeShit();
  this.querySelector("i").classList.add("arrow");
  this.querySelector("i").classList.add("down");
  this.classList.add("active");
  displayList(animals);
}

function sortingAge() {
  let animals = allAnimals.slice(); // default list all animals
  animals.sort(function (a, b) {
    if (a.age < b.age) {
      return 1;
    }
    if (a.age > b.age) {
      return -1;
    }
    return 0;
  });
  removeShit();
  this.querySelector("i").classList.add("arrow");
  this.querySelector("i").classList.add("down");
  displayList(animals);
}
function sortingType() {
  let animals = allAnimals.slice(); // default list all animals
  animals.sort(function (a, b) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
  });
  removeShit();
  this.querySelector("i").classList.add("arrow");
  this.querySelector("i").classList.add("down");
  this.classList.add("active");
  displayList(animals);
}
function sortingDescription() {
  let animals = allAnimals.slice(); // default list all animals

  animals.sort(function (a, b) {
    if (a.desc < b.desc) {
      return -1;
    }
    if (a.desc > b.desc) {
      return 1;
    }
    return 0;
  });

  removeShit();
  this.querySelector("i").classList.add("arrow");
  this.querySelector("i").classList.add("down");
  this.classList.add("active");
  displayList(animals);
}

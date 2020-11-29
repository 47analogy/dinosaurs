const { Dinos } = require('./dino.json');

class Tile {
  constructor(name, image, weight, diet) {
    this.name = name;
    this.image = image;
    this.weight = weight;
    this.diet = diet;
  }
}

/** Create Dino Constructor
 * @description Represents a Dino
 * @constructor
 * @param {string} name - The name of the Dino
 * @param {string} image - The relative path to the image of the Dino
 */
class Dino extends Tile {
  constructor(name, image, weight, height, diet, where, when, fact) {
    super(name, image, weight, diet);
    this.height = height;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

let listOfDinoObjs = [];

// // Use IIFE to create Dino Objects
(function () {
  listOfDinoObjs = Dinos.map((dino) => {
    const instance = `${dino.species
      .charAt(0)
      .toLowerCase()}${dino.species.slice(1)}`.replace(/\s/g, '');

    return (this[instance] = new Dino(
      dino.species,
      `./images/${instance}.png`,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact
    ));
  });
})(this);

console.log('list', listOfDinoObjs);

/** Create Human Class
 * @description Represents a Human
 * @constructor
 * @param {string} name - The name of the Human
 * @param {string} image - The relative path to the image of the human
 * @param {number} heightFoot - The height foot portion of the human
 * @param {number} heightInch - The height inches portion of the human
 * @param {number} weight - The weight of the human
 * @param {string} diet - The diet of the human
 */
class Human extends Tile {
  constructor(name, image, weight, diet, heightFoot, heightInch) {
    super(name, image, weight, diet);
    this.heightFoot = heightFoot;
    this.heightInch = heightInch;
  }
}

// Use IIFE to get human data from form
(function () {
  const form = document.querySelector('#dino-compare');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const image = './images/human.png';
    const heightFoot = document.querySelector('#feet').value;
    const heightInch = document.querySelector('#inches').value;
    const weight = document.querySelector('#weight').value;
    const diet = document.querySelector('#diet').value;

    // store the data
    const human = new Human(name, image, weight, diet, heightFoot, heightInch);
    console.log('form submit', human);
    // compareWeight(human.weight);
    createTileData(listOfDinoObjs, human);
  });
})();

// TODO: VALIDATION
function formValidate() {}

/** Create compare method
 * @description Represents a method to compare dino and human facts
 * @param {array} dinos - Array of objects for dinos
 * @param {obj} human - Object containing human facts
 * @return {obj} speciesName, weight
 */

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (humanWeight) {
  if (this.weight > humanWeight) {
    this.weightCompare = `${this.name}s are ${
      this.weight - humanWeight
    } lbs heavier than humans`;
  } else if (this.weight < humanWeight) {
    this.weightCompare = `${this.name}s are ${
      humanWeight - this.weight
    } lbs lighter than humans`;
  } else {
    this.weightCompare = `${this.name}s are the same weight as humans`;
  }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (humanHeight) {
  if (this.height > humanHeight) {
    this.heightCompare = `${this.name}s are ${
      this.height - humanHeight
    } inches taller than humans`;
  } else if (this.height < humanHeight) {
    this.weightCompare = `${this.name}s are ${
      humanHeight - this.height
    } inches shorter than humans`;
  } else {
    this.heightCompare = `${this.name}s are the same height as humans`;
  }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (humanDiet) {
  this.dietCompare = `${this.name}s are ${this.diet}s, humans are ${humanDiet}`;
};

// create an array of objects for each dino, human

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

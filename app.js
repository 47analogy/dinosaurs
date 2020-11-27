// Create Dino Constructor
class Dino {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
}

// Create Dino Objects
const anklyosaurus = new Dino('anklyosaurus', './images/anklyosaurus.png');
const brachiosaurus = new Dino('brachiosaurus', './images/brachiosaurus.png');
const telasmosaurus = new Dino('telasmosaurus', './images/telasmosaurus.png');
const pigeon = new Dino('pigeon', './images/pigeon.png');
const pteranodon = new Dino('pteranodon', './images/pteranodon.png');
const stegosaurus = new Dino('stegosaurus', './images/stegosaurus.png');
const tracks = new Dino('tracks', './images/tracks.png');
const triceratops = new Dino('triceratops', './images/triceratops.png');
const tyrannosaurusRex = new Dino('anklyosaurus', './images/anklyosaurus.png');

// Create Human Object
class Human extends Dino {
  constructor(name, image, heightFoot, heightInch, weight, diet) {
    super(name, image);
    this.heightFoot = heightFoot;
    this.heightInch = heightInch;
    this.weight = weight;
    this.diet = diet;
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
    const human = new Human(name, image, heightFoot, heightInch, weight, diet);
    console.log('form submit', human);
  });
})();

// TODO: VALIDATION
function formValidate() {}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

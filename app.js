const { Dinos } = require('./dino.json');

/** Create TileCharacter Constructor
 * @description Represents a TileCharacter
 * @constructor
 * @param {string} name - The name of the TileCharacter
 * @param {string} image - The relative path to the image of the TileCharacter
 * @param {string} weight - The weight of the TileCharacter
 * @param {string} diet - The diet of the TileCharacter
 */
class TileCharacter {
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
 * @param {string} weight - The weight of the Dino
 * @param {string} height - The height of the Dino
 * @param {string} diet - The diet of the Dino
 * @param {string} where - The location of the Dino
 * @param {string} when - The period of the Dino
 * @param {string} fact - The fun fact of the Dino
 */
class Dino extends TileCharacter {
  constructor(name, image, weight, height, diet, where, when, fact) {
    super(name, image, weight, diet);
    this.height = height;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

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
class Human extends TileCharacter {
  constructor(name, image, weight, diet, heightFoot, heightInch) {
    super(name, image, weight, diet);
    this.heightFoot = heightFoot;
    this.heightInch = heightInch;
  }
}

// Use IIFE to create Dino Objects
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

// Create Dino Compare Method 1
/**compareWeight()
 * @description Represents a Dino class method to compare dino and human weights
 * Both weights are in lbs
 * @param {humanWeight} human - weight of human
 * @return {string} - string comparison fact (Dino object property)
 */
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
/**compareHeight()
 * @description Represents a Dino class method to compare dino and human heights
 * Dino heights are in inches, human height is ft and inches
 * @param {humanHeightFt} human - height of human feet portion
 * @param {humanHeightInch} human - height of human feet portion
 * @return {string} - string comparison fact (Dino object property)
 */
Dino.prototype.compareHeight = function (humanHeightFt, humanHeightInch) {
  const humanHeight = humanHeightFt * 12 + humanHeightInch; // convert to inches

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
/**compareDiet()
 * @description Represents a Dino class method to compare dino and human diets
 * @param {humanDiet} human - diet of human
 * @return {string} - string comparison fact (Dino object property)
 */
Dino.prototype.compareDiet = function (humanDiet) {
  this.dietCompare = `${this.name}s are ${this.diet}s, humans are ${humanDiet}`;
};

// create an random array of objects for each dino, human
function createTileData(dinoArr, humanObject) {
  // loop thru each dino and add 3 compare methods
  dinoArr.map((dino) => {
    let { name } = dino;
    name = `${name.charAt(0).toLowerCase()}${name.slice(1)}`.replace(/\s/g, '');
    this[name].compareWeight(humanObject.weight);
    this[name].compareHeight(humanObject.heightFoot, humanObject.heightInch);
    this[name].compareDiet(humanObject.diet);
  });
  // add everything to array
  const tilesArr = [...dinoArr, humanObject];
  console.log('tiles', tilesArr);
  //create random order - look into Fisher-Yates shuffle
  const randomTilesArr = tilesArr.sort(() => Math.random() - 0.5);
  generateTiles(randomTilesArr);
}

// Generate Tiles for each Dino in Array
function generateTiles(arr) {
  arr.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    const tileTitle = document.createElement('h3');
    const tileImage = document.createElement('img');
    const tileFact = document.createElement('p');

    tileElement.classList.add('grid-item');

    grid.appendChild(tileElement);

    tileElement.id = index; // temp
    tileTitle.innerHTML = tile.name || '';
    tileImage.src = 'https://placeimg.com/140/180/any';
    // tileImage.src = tile.image; // TODO: FIX ISSUE (not showing)
    tileImage.alt = `${tile.name} Image`;
    tileFact.innerHTML = tile.fact || ''; // TODO: Generate random facts
    tileElement.appendChild(tileTitle);
    tileElement.appendChild(tileImage);
    tileElement.appendChild(tileFact);
  });
  // drawTiles(board);
}

// Remove form from screen

// On button click, prepare and display infographic

// // Add tiles to DOM
// function drawTiles(board) {
//   const grid = document.querySelector('#grid');
//   grid.appendChild(board);
// }

// dino_img = `../images/${dinoObject.image}`
// grid.innerHTML = `
//      <div class="grid">
//          <h3></h3>
//          <img src="${image_path}"
//          <p></p>
//      </div>
// `

// // Create Dino Compare Method 3
// // NOTE: Weight in JSON file is in lbs, height in inches.
// Dino.prototype.diet = function (humanDiet) {
//     // filter species, weight
//     // return array
//     // `xxx are xxx lbs heavier than humans'
//     // `xxx are xxx lbs lighter than humans than humans'
//     //};

//     const dinoDiet = [];
//     const dinoDietFacts = [];

//     for (let dino of Dinos) {
//       dinoDiet.push({ speciesName: dino.species, height: dino.height });
//     }

//     // console.log(dinoDiet);
//     for (let dino of dinoDiets) {
//       const dinoDiet = dino.diet;
//       const species = dino.speciesName;

//       //console.log(`${species} are xxx lbs lighter than humans`);
//       dinoDietFacts.push(`${species} are ${dinoDiet}, humans are ${humanDiet}`);

//       // console.log(dinoDietFacts);
//       return dinoDietFacts;
//     }
//   };

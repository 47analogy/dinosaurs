import { Dinos } from './dino.json';
import images from './images/*.png';

/** Create TileCharacter Class
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

/** Create Dino Class
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

/**compareWeight() - Create Dino Compare Method 1
 * @description Represents a Dino class method to compare dino and human weights (both are in lbs)
 * @param {humanWeight} human - weight of human
 * @return {string} - string comparison fact (Dino object property)
 */
Dino.prototype.compareWeight = function (humanWeight) {
  if (this.weight > humanWeight) {
    this.weightCompare = `${this.name} is ${
      this.weight - humanWeight
    } lbs heavier than human`;
  } else if (this.weight < humanWeight) {
    this.weightCompare = `${this.name} is ${
      humanWeight - this.weight
    } lbs lighter than human`;
  } else {
    this.weightCompare = `${this.name} is the same weight as human`;
  }
};

/**compareHeight() - Create Dino Compare Method 2
 * @description Represents a Dino class method to compare dino and human heights
 * @param {humanHeightFt} human - height of human feet portion
 * @param {humanHeightInch} human - height of human inch portion
 * @return {string} - string comparison fact (Dino object property)
 */
Dino.prototype.compareHeight = function (humanHeightFt, humanHeightInch) {
  const humanHeight = Number(humanHeightFt) * 12 + Number(humanHeightInch); // convert to inches

  if (this.height > humanHeight) {
    this.heightCompare = `${this.name} is ${
      this.height - humanHeight
    } inches taller than human`;
  } else if (this.height < humanHeight) {
    this.heightCompare = `${this.name} is ${
      humanHeight - this.height
    } inches shorter than human`;
  } else {
    this.heightCompare = `${this.name} is the same height as human`;
  }
};

/**compareDiet() - Create Dino Compare Method 3
 * @description Represents a Dino class method to compare dino and human diets
 * @param {humanDiet} human - diet of human
 * @return {string} - string comparison fact (Dino object property)
 */
Dino.prototype.compareDiet = function (humanDiet) {
  this.dietCompare = `${this.name} are ${this.diet}s, the human is a ${humanDiet}`;
};

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

/** Create Display
 * @description Represents User Interface
 * @method getFormData() - get form data
 * @method getDinoData() - create dino and human objects
 * @method createTileData() - create the tiles
 * @method getRandomFact() - random fact generator
 * @method getRandomTileOrder() - orders tiles randomly
 * @method generateTiles() - add tiles to DOM
 * @method toggleForm() - toggle form
 */
class Display {
  // create objects for dinos
  getDinoData() {
    this.dinosList = Dinos.map((dino) => {
      const instance = `${dino.species
        .charAt(0)
        .toLowerCase()}${dino.species.slice(1)}`.replace(/\s/g, '');

      return (this[instance] = new Dino(
        dino.species,
        images[instance],
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      ));
    });
  }

  // get data from form
  getFormData() {
    const form = document.querySelector('#dino-compare');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.querySelector('#name').value;
      const image = images['human'];
      const heightFoot = document.querySelector('#feet').value;
      const heightInch = document.querySelector('#inches').value;
      const weight = document.querySelector('#weight').value;
      const diet = document.querySelector('#diet').value;

      // create human object
      const human = new Human(
        name,
        image,
        weight,
        diet,
        heightFoot,
        heightInch
      );
      this.createTileData(human);
      this.toggleForm();
    });
  }

  // create an random array of objects for each dino, human
  createTileData(humanData) {
    // loop thru each dino and add 3 compare methods
    this.dinosList.map((dino) => {
      dino.compareWeight(humanData.weight);
      dino.compareHeight(humanData.heightFoot, humanData.heightInch);
      dino.compareDiet(humanData.diet);
      dino.height = `Height: ${dino.height} inches tall`;
      dino.weight = `Weight: ${dino.weight} lbs`;
    });

    // add everything to array
    const tilesArr = [...this.dinosList, humanData];

    this.getRandomTileOrder(tilesArr);
  }

  // choose random fact
  getRandomFact() {
    let randomFact;
    let num = Math.floor(Math.random() * 6) + 1;

    // 1 of 6 possible facts
    switch (num) {
      case 1:
        randomFact = 'height';
        break;
      case 2:
        randomFact = 'weight';
        break;
      case 3:
        randomFact = 'fact';
        break;
      case 4:
        randomFact = 'heightCompare';
        break;
      case 5:
        randomFact = 'weightCompare';
        break;
      case 6:
        randomFact = 'dietCompare';
        break;
    }
    return randomFact;
  }

  // creates a random tile order
  getRandomTileOrder(arr) {
    const humanTile = arr.splice(arr.length - 1, 1);
    const randomTilesArr = arr.sort(() => Math.random() - 0.5);
    randomTilesArr.splice(4, 0, humanTile[0]); // add human tile to middle of array
    this.generateTiles(arr);
  }

  // appends tiles to DOM
  generateTiles(arr) {
    arr.forEach((tile, index) => {
      const tileElement = document.createElement('div');
      tileElement.setAttribute('class', 'grid-item');

      // helper - to display same pigeon fact every time
      const displayFact = (tileType) => {
        if (tileType === 'Pigeon') {
          return tile.fact;
        } else {
          return tile[this.getRandomFact(tile.name)];
        }
      };

      tileElement.innerHTML = `
         <h3>${tile.name || ''}</h3>
         <img src=${tile.image} alt="tile character"></img>
         <p>${index === 4 ? '' : displayFact(tile.name)}</p>
      `; // don't display fact for human tile (index = 4)

      grid.appendChild(tileElement);
    });
  }

  // resets and hides form when submitted
  toggleForm() {
    const form = document.querySelector('#dino-compare');
    form.parentNode.removeChild(form);
  }
}

// driver
const init = () => {
  const start = new Display();
  start.getDinoData();
  start.getFormData();
};

init();

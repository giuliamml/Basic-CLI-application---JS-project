const fs = require("fs");

const dbFilename = "db.json";

function readDb() {
  return JSON.parse(fs.readFileSync(`./${dbFilename}`));
}

function writeDb(data) {
  fs.writeFileSync(`./db.json`, JSON.stringify(data));
}

function read(name) {
  let data = readDb();
  return data.find((el) => {
    return el.name == name;
  });
}

function create(recipe) {
  let data = readDb();
  recipe.id = Math.floor(Math.random() * 100000000);
  data.push(recipe);
  writeDb(data);
}

function destroy(name) {
  let data = readDb();
  let idx = data.findIndex((el) => el.name == name);

  data.splice(idx, 1);
  writeDb(data);
}

function update(newRecipe) {
  let data = readDb();
  let idx = data.findIndex((el) => el.name == newRecipe.name);

  data.splice(idx, 1, newRecipe);
  writeDb(data);
}

function addReview(name, review) {
  recipe = read(name);
  recipe.reviews.push(review);
  update(recipe);
}

module.exports = {
  readDb: readDb,
  read: read,
  create: create,
  destroy: destroy,
  update: update,
  addReview: addReview,
};

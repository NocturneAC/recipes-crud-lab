const fs = require("fs");

const action = process.argv[2];

function readAllRecipes() {
    fs.readFile("./recipea-data.json", "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        console.log("Here are all your recipes:\n\n");
        for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i].name + "\n");
            console.log(recipes[i].cookingMethod + "\n");
            console.log(recipes[i].ingredients + "\n");
        }
        console.log(recipes.length);
    });
}

function readRecipe(id) {
    fs.readFile("./recipea-data.json", "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        console.log("Here's that recipe:\n\n");
        for (let i = 0; i < recipes.length; i++) {
            if (i === id) {
                console.log(recipes[i].name + "\n");
                console.log(recipes[i].cookingMethod + "\n");
                console.log(recipes[i].ingredients + "\n");
            }
        }
    });
}

function createRecipe(newRecipe) {
    fs.readFile("./recipea-data.json", "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        recipes.push(newRecipe);
        const jsonVersion = JSON.stringify(recipes, null, 2);
        fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
            console.log("Recipe successfully added to the box!");
        });
    });
}

function deleteRecipe(id) {
    fs.readFile("./recipea-data.json", "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        // Deletes 1 recipe start at index `id`
        // Follow up on splice array method for memory refresh if needed:
        recipes.splice(id, 1);
        const jsonVersion = JSON.stringify(recipes, null, 2);
        fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
            console.log("Successfully deleted recipe.");
        });
    });
}

function updateRecipe(id, replacingRecipe) {
    fs.readFile("./recipea-data.json", "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        recipes.splice(id, 1, replacingRecipe);
        const jsonVersion = JSON.stringify(recipes, null, 2);
        fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
            console.log("Recipe successfully updated and stored in the box!")
        });
    });
}

if (action === "read") {
    const id = process.argv[3];
    if (id === undefined) {
        readAllRecipes();
    } else {
        readRecipe(Number(id));
    }
} else if (action === "create") {
    const name = process.argv[3];
    const cookingMethod = process.argv[4];
    const ingredients = process.argv[5];
    const newRecipe = { name: name, cookingMethod: cookingMethod, ingredients: ingredients };
    createRecipe(newRecipe);
} else if (action === "delete") {
    const id = Number(process.argv[3]);
    deleteRecipe(id);
} else if (action === "update") {
    const id = Number(process.argv[3]);
    const name = process.argv[4];
    const cookingMethod = process.argv[5];
    const ingredients = process.argv[6];
    const replacingRecipe = { name: name, cookingMethod: cookingMethod, ingredients: ingredients };
    updateRecipe(id, replacingRecipe);
} else {
    console.log(`Valid actions are "create", "read", "update", and "delete". Also, any emotions you may have are equally valid.`);
}
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "../shared/recipe.model";

import { ShoppingListService } from "./shopping-list.service";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipeChanged: Subject<Array<Recipe>> = new Subject<Array<Recipe>>()

    constructor(private shoppingListService: ShoppingListService) { }

    // private recipe: Array<Recipe> = [
    //     new Recipe('Panner Curry With Rice',
    //         'This is a rice dish topped with a delicious panner curry!',
    //         'https://www.thespruceeats.com/thmb/yK8psUDvXdEKOvzFtLtx-n4ETuQ=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg',
    //         [
    //             new Ingredient('Panner', 8),
    //             new Ingredient('Rice', 5),
    //             new Ingredient('Tomatoes', 4),
    //             new Ingredient('Corriander', 2),
    //         ]
    //     ),
    //     new Recipe('Butter Chicken With Rice',
    //         'This is a rice dish topped with the famous Indian butter chicken!',
    //         'https://www.simplyrecipes.com/thmb/1SXZ_F1GC6ww_ppWnrdbKgHi9fQ=/2000x1333/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__01__Butter-Chicken-LEAD-2-6ca76f24bbe74114a09958073cb9c76f.jpg',
    //         [
    //             new Ingredient('Chicken', 8),
    //             new Ingredient('Rice', 5),
    //             new Ingredient('Tomatoes', 4),
    //             new Ingredient('Corriander', 2),
    //         ]
    //     )
    // ]

    private recipe: Array<Recipe> = []

    setRecipes(recipes: Recipe[]) {
        this.recipe = recipes
        this.recipeChanged.next(this.recipe.slice())
    }

    getRecipes() {
        return this.recipe.slice()
    }

    getRecipeByID(index: number) {
        return this.recipe[index]
    }

    addRecipe(newReci: Recipe) {
        this.recipe.push(newReci)
        this.recipeChanged.next(this.recipe.slice())
    }

    updateRecipe(newReci: Recipe, index: number) {
        this.recipe.splice(index, 1, newReci)
        this.recipeChanged.next(this.recipe.slice())
    }

    deleteRecipe(index: number) {
        this.recipe.splice(index, 1,)
        this.recipeChanged.next(this.recipe.slice())
    }

    addIngredientToShoppingList(ingre: Ingredient[]) {
        this.shoppingListService.fromRecipeToShoppingList(ingre)
    }

}
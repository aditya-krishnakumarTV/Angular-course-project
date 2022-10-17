import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientChanged: Subject<Array<Ingredient>> = new Subject<Array<Ingredient>>()

    onEditIngredientStart: Subject<number> = new Subject<number>()

    private Ingredients: Array<Ingredient> = []

    getIngredients() {
        return this.Ingredients.slice()
    }

    getIngredientByIndex(index: number) {
        return this.Ingredients[index]
    }

    addIngredient(ingre: Ingredient) {
        this.Ingredients.push(ingre)
        this.ingredientChanged.next(this.Ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.Ingredients.splice(index, 1)
        this.ingredientChanged.next(this.Ingredients.slice())
    }

    updateIngredient(ingre: Ingredient, index: number) {
        this.Ingredients.splice(index, 1, ingre)
        this.ingredientChanged.next(this.Ingredients.slice())
    }

    fromRecipeToShoppingList(ingre: Ingredient[]) {
        this.Ingredients.push(...ingre)
        this.ingredientChanged.next(this.Ingredients.slice())
    }
}
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientChanged: Subject<Array<Ingredient>> = new Subject<Array<Ingredient>>()

    private Ingredients: Array<Ingredient> = []

    getIngredients() {
        return this.Ingredients.slice()
    }

    addIngredient(ingre: Ingredient) {
        this.Ingredients.push(ingre)
        this.ingredientChanged.next(this.Ingredients.slice())
    }

    fromRecipeToShoppingList(ingre: Ingredient[]) {
        this.Ingredients.push(...ingre)
        this.ingredientChanged.next(this.Ingredients.slice())
    }
}
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientChanged: EventEmitter<Array<Ingredient>> = new EventEmitter<Array<Ingredient>>()

    private Ingredients: Array<Ingredient> = [
        new Ingredient('Onion', 4),
        new Ingredient('Tomatoes', 5)
    ]

    getIngredients() {
        return this.Ingredients.slice()
    }

    addIngredient(ingre: Ingredient) {
        this.Ingredients.push(ingre)
        this.ingredientChanged.emit(this.Ingredients.slice())
    }
}
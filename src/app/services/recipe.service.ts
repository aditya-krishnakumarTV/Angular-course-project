import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "../shared/recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>()

    private recipe: Array<Recipe> = [
        new Recipe('A test recipe', 'Test description', 'https://www.thespruceeats.com/thmb/yK8psUDvXdEKOvzFtLtx-n4ETuQ=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg')
    ]

    getRecipes() {
        return this.recipe.slice()
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { Recipe } from "../shared/recipe.model";

import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) { }

    storeRecipies() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://angular-course-project-176a4-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(value => {
                console.log(value)
            })
    }

    fetchRecipes() {
        this.http.get<Array<Recipe>>('https://angular-course-project-176a4-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] }
                })
            }))
            .subscribe(value => {
                this.recipeService.setRecipes(value)
            })
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";

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
        return this.http.get<Array<Recipe>>('https://angular-course-project-176a4-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
            .pipe(map(recipes => {
                // map is like Array.map but it returns an Observable
                return recipes.map(recipe => {
                    // simple Array.map
                    return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] }
                })
            }),
                tap(value => {
                    // tap helps to carry put some code function without actually changing it
                    // The tap operator allows us to execute some code here in place without altering the data that is funneled through that observable.
                    this.recipeService.setRecipes(value)
                })
            )
    }

}
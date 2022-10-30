import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Recipe } from "../shared/recipe.model";

import { DataStorageService } from "./data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
    // Resolver help to maintain or check if there is any data needed for a perticular route when it being loaded
    // A resolver is essentially some code that runs before a route is loaded to ensure that certain data the route depends on is there.

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipe = this.recipeService.getRecipes()
        if (recipe.length === 0) {
            return this.dataStorageService.fetchRecipes()
        } else {
            return recipe
        }
    }

}
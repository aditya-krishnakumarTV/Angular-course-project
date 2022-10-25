import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe('', '', '')
  id: number = 0

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id']
      this.recipe = this.recipeService.getRecipeByID(this.id)
    })

  }

  sendToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredient)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id)
  }

}

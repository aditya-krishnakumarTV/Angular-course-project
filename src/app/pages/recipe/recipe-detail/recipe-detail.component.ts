import { Component, Input, OnInit } from '@angular/core';

import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe('', '', '')

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  sendToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredient)
  }

}

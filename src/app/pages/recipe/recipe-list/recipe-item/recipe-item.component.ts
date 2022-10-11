import { Component, Input, OnInit } from '@angular/core';

import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe('', '', '')

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelectedRecipe() {
    this.recipeService.selectedRecipe.emit(this.recipe)
  }

}

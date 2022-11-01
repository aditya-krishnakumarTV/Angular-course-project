import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipe: Array<Recipe> = []
  
  private recChangedSub: Subscription

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipes()
    this.recChangedSub = this.recipeService.recipeChanged.subscribe((value: Recipe[]) => {
      this.recipe = value
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.recChangedSub.unsubscribe()
  }

}

import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe('', '', '')
  @Input() index: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}

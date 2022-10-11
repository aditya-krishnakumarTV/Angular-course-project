import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Array<Ingredient> = []

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.ingredientChanged.subscribe((value: Ingredient[]) => {
      this.ingredients = value
    })
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Array<Ingredient> = []
  ingreChangedSub: Subscription = new Subscription()

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingreChangedSub = this.shoppingListService.ingredientChanged.subscribe((value: Ingredient[]) => {
      this.ingredients = value
    })
  }

  ngOnDestroy(): void {
    this.ingreChangedSub.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Array<Ingredient> = [
    new Ingredient('Onion', 4),
    new Ingredient('Tomatoes', 5)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient(form: NgForm) {
    if(form.invalid){
      return
    }
    console.log(form)
    const ing = { name: form.value.name, amount: form.value.amount }
    this.shoppingListService.addIngredient(ing)
  }

  clearForm(form: NgForm){
    form.reset()
  }

}

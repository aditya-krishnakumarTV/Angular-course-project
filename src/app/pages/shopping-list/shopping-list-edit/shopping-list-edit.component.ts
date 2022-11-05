import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingForm', { static: false }) shoppingListForm: NgForm

  private ingSubscription: Subscription = new Subscription()

  editMode: boolean = false
  editIndex: number = 0
  editingIngredient: Ingredient

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingSubscription = this.shoppingListService.onEditIngredientStart.subscribe((index: number) => {
      this.editMode = true
      this.editIndex = index
      this.editingIngredient = this.shoppingListService.getIngredientByIndex(index)
      this.shoppingListForm.setValue({
        name: this.editingIngredient.name,
        amount: this.editingIngredient.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    const ing = { name: form.value.name, amount: form.value.amount }
    if (this.editMode) {
      this.shoppingListService.updateIngredient(ing, this.editIndex)
    } else {
      this.shoppingListService.addIngredient(ing)
    }
    this.editMode = false
    form.reset()
  }

  onDeleteIng() {
    this.clearForm()
    this.shoppingListService.deleteIngredient(this.editIndex)
  }

  clearForm() {
    this.shoppingListForm.reset()
    this.editMode = false
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe()
  }

}

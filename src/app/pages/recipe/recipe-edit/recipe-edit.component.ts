import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number = 0
  editMode: boolean = false

  recipeForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id']
      this.editMode = param['id'] != null
      this.onEditInitForm()
    })

  }

  get nameField(): FormControl {
    return this.recipeForm.get('name') as FormControl
  }
  get imageField(): FormControl {
    return this.recipeForm.get('imageUrl') as FormControl
  }
  get descriptionField(): FormControl {
    return this.recipeForm.get('description') as FormControl
  }
  get ingredientsField(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray
  }

  private onEditInitForm() {
    this.recipeForm = this.fb.group({
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'imageUrl': [null, [Validators.required]],
      'ingredients': this.fb.array([])
    })

    if (this.editMode) {
      let editRecipe = this.recipeService.getRecipeByID(this.id)

      //Used patch because of fb and the form is already initialised and we are pushing the ingredients direct into the array
      this.recipeForm.patchValue({
        'name': editRecipe.name,
        'imageUrl': editRecipe.imagePath,
        'description': editRecipe.desc
      })

      if (editRecipe['ingredient']) {
        for (let ingre of editRecipe.ingredient) {
          this.ingredientsField.push(
            this.fb.group({
              'name': this.fb.control(ingre.name, [Validators.required]),
              'amount': this.fb.control(ingre.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return
    }
    const rec = new Recipe(
      this.nameField.value,
      this.descriptionField.value,
      this.imageField.value,
      this.ingredientsField.value
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(rec, this.id)
    } else {
      this.recipeService.addRecipe(rec)
    }
    this.onCancel()
  }

  onAddNewIngredient() {
    this.ingredientsField.push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      })
    )
  }

  deleteIngredient(index: any) {
    this.ingredientsField.removeAt(index)
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route })
  }

}

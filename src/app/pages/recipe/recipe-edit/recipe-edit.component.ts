import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';

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
      'name': ['', [Validators.required]],
      'imageUrl': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'ingredients': this.fb.array([])
    })

    if (this.editMode) {
      let editRecipe = this.recipeService.getRecipeByID(this.id)

      if (editRecipe['ingredient']) {
        for (let ingre of editRecipe.ingredient) {
          this.ingredientsField.push(
            this.fb.group({
              'name': this.fb.control(ingre.name, [Validators.required]),
              'amount': this.fb.control(ingre.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
            })
          )
        }
      }

      this.recipeForm.setValue({
        'name': editRecipe.name,
        'imageUrl': editRecipe.imagePath,
        'description': editRecipe.desc,
        'ingredients': this.ingredientsField
      })

    }
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

}

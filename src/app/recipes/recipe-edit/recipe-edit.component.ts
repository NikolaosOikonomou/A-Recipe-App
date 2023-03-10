import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  
  get recipeIngredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService, 
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancelForm();
  }
  
  recipeIngredients: FormArray = this.fb.array([])
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
  
    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          this.recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    })
  }

  onAddIngredient() {
    this.recipeIngredientsArray.push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index: number) {
    this.recipeIngredientsArray.removeAt(index);
  }

  onCancelForm() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

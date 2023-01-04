import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-edit/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe!',
      'simply a test',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1513288060%2Fvegetarian-bolognese-1801-ck.jpg%3Fitok%3Dqzd9xdfa&w=800&c=sc&poi=face&q=60',
      [new Ingredient('Pasta', 1), new Ingredient('Sauce', 1)]
    ),
    new Recipe(
      'Another test recipe!',
      'simply a test2',
      'https://www.allrecipes.com/thmb/u_vrhzebU3If_I3PpDlzBAVSChA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/25473-the-perfect-basic-burger-ddmfs-4x3-1350-1-f65d5518ecc0435f9791d453ee9cd78f.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Bread', 1)]
    ),
  ];

  constructor(private shopService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shopService.addIngredients(ingredient);
  }
}

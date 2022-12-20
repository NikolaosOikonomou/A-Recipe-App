import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipy',
      'simply a test',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1513288060%2Fvegetarian-bolognese-1801-ck.jpg%3Fitok%3Dqzd9xdfa&w=800&c=sc&poi=face&q=60'
    ),
    new Recipe(
      'A test recipy2',
      'simply a test2',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1513288060%2Fvegetarian-bolognese-1801-ck.jpg%3Fitok%3Dqzd9xdfa&w=800&c=sc&poi=face&q=60'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}

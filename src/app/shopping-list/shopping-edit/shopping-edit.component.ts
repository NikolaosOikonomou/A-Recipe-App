import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') incredientName!: ElementRef;
  @ViewChild('amountInput') incredientAmount!: ElementRef;

  constructor(private shopService: ShoppingListService) {}

  ngOnInit(): void {}

  onIncredientAdded() {
    const ingName = this.incredientName.nativeElement.value;
    const ingAmount = this.incredientAmount.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shopService.addIngredient(newIngredient);

  }
}

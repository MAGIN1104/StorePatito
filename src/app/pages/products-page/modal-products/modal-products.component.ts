import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size } from '../../../enum/size.enum';
import { ProductServiceService } from '../../../services/product-service.service';
import {
  IProductDto,
  IProductUpdateDto,
} from '../../../interface/product.interface';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.scss'],
})
export class ModalProductsComponent implements OnInit {
  @Input() data: IProductDto | null = null;
  @Output() outputData = new EventEmitter<boolean>();
  listSize: Array<any> = [
    { value: Size.XLarge, description: Size.XLarge },
    { value: Size.Large, description: Size.Large },
    { value: Size.Medium, description: Size.Medium },
    { value: Size.Small, description: Size.Small },
    { value: Size.XSmall, description: Size.XSmall },
  ];
  listColors: Array<any> = [
    { value: 'Rojo' },
    { value: 'Verde' },
    { value: 'Amarillo' },
    { value: 'Negro' },
  ];
  form: FormGroup | any;
  constructor(
    private _fb: FormBuilder,
    private _productService: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.initialForm();
    if (this.data) {
      this.form.patchValue(this.data)
      this.form.get('size').disable();
      this.form.get('color').disable();
      this.form.controls['amount'].setValidators([Validators.required]);
      this.form.controls['price'].setValidators([Validators.required]);
      this.form.controls['amount'].updateValueAndValidity();
      this.form.controls['price'].updateValueAndValidity();
    } else {
      this.form.reset();
    }
  }

  initialForm() {
    this.form = this._fb.group({
      color: ['', [Validators.required]],
      size: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  validateForm() {
    console.log(this.data)
    if (this.form.valid) {
      if (!this.data) {
        this._productService.createProduct(this.form.value).subscribe((_) => {
          this.outputData.emit(false);
        });
      } else {
        let update: IProductUpdateDto = this.form.value;
        this._productService
          .updateProduct(this.data!.id, update)
          .subscribe((_) => {
            this.outputData.emit(false);
          });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  clickButton() {
    this.validateForm();
  }
}

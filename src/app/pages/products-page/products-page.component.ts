import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalProductsComponent } from './modal-products/modal-products.component';
import { ProductServiceService } from '../../services/product-service.service';
import { IProductDto } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  @ViewChild(ModalProductsComponent) modalProduct: ModalProductsComponent | any;
  modalOpen: boolean = false;
  listProduct: Array<IProductDto> = [
    {
      id: 1,
      color: 'Negro',
      size: 'Large',
      price: 30.5,
      amount: 3,
    },
  ];
  currentProduct: any | null;
  constructor(private _productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.listProduct = [];
    this._productService.loadProducts().subscribe((resp) => {
      this.listProduct = resp;
    });
  }

  actionsTable(product: any, action: string) {
    this.currentProduct = product;
    switch (action) {
      case 'update':
        this.modalOpen = true;
        break;
      case 'delete':
        this._productService
          .deleteProduct(this.currentProduct.id)
          .subscribe((_) => {
            this.getProducts();
          });
        break;

      default:
        break;
    }
  }
}

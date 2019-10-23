import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  newFavourite(product: Product) {
    this.favouriteService.addToFavourites(product);
  }

  delete(id: number) : void {
    if(window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product was deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not delete product! '+ error)
      )
    }
  }

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this
      .productService
      .products$
      .pipe(
        map(products => products.find(p => p.id == id))
      )
      .subscribe(
        result => this.product = result
      )
  }

}

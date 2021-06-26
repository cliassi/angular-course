import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { LoaderService } from './@services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showOverlay = false;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.loaderService.counter$.subscribe((res) => {
      this.showOverlay = res;
    });
  }
}

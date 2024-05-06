import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}

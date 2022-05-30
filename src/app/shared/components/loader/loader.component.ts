import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
//Input propert
//ao usar <app-loader> é possivel utillizar
//<app-loader label="Carregando diarios ..."></app-loader>
 @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input()
  table: string = "item";

   ngOnInit(): void {
     //this.pegarValor
  }

  pegarValor(value: string) : string {
    console.log(value);
    return value;
  }
}
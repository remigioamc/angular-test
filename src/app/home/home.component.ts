import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url: string = "https://media2.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif?cid=e95f8462ebdc2adc4fe4c5d07436f578e4c4186b77cb03dc&rid=giphy.gif"
  constructor() { }

  ngOnInit(): void {
  }

}

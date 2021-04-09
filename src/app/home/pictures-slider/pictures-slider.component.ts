import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-pictures-slider',
  templateUrl: './pictures-slider.component.html',
  styleUrls: ['./pictures-slider.component.scss']
})
export class PicturesSliderComponent {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/944/900/500`);
  
}





import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})

export class HighlightDirective implements OnChanges{

    constructor(private renderer: Renderer2, private elRef: ElementRef){}
    @Input() defaultColor: string = 'white';
    @HostBinding('style.color') color: string = 'white';
    shadesOfGreen = 255;

    @HostListener('mouseenter') mouseover(){//same hover made with directive as in scss class
        this.renderer.setStyle(this.elRef.nativeElement, 'transition', '0.3s');     
        this.color = '#ccc';
    }
    
    @HostListener('mouseleave') mouseleave(){
        this.color = this.defaultColor;
    }
    
    ngOnchangesCount = 0;
    
    ngOnChanges(){

        if(this.ngOnchangesCount === 0){
            localStorage.setItem('ShadesOfGreen', JSON.stringify(this.shadesOfGreen))
        }
    
        this.shadesOfGreen = JSON.parse(localStorage.getItem('ShadesOfGreen'));
        this.defaultColor = `rgb(${this.shadesOfGreen}, 255, ${this.shadesOfGreen})`;
        this.color = this.defaultColor;
        
        if(this.shadesOfGreen > 0 && this.ngOnchangesCount > 0){//will not be fired at first input
            this.shadesOfGreen -= 40;
            this.defaultColor = `rgb(${this.shadesOfGreen}, 255, ${this.shadesOfGreen})`;
            this.color = this.defaultColor;
            localStorage.setItem('ShadesOfGreen', JSON.stringify(this.shadesOfGreen))
        }
        this.ngOnchangesCount++;
    }


}

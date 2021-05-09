import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

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
    
        this.defaultColor = `rgb(${this.shadesOfGreen}, 255, ${this.shadesOfGreen})`;
        this.color = this.defaultColor;
        
        if(this.shadesOfGreen > 0 && this.ngOnchangesCount > 0){
            this.shadesOfGreen -= 40;
            this.defaultColor = `rgb(${this.shadesOfGreen}, 255, ${this.shadesOfGreen})`;
            this.color = this.defaultColor;
        }
        this.ngOnchangesCount++;
    }


}

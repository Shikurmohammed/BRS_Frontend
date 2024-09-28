import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class TestDirectiveDirective {

  constructor(private el:ElementRef, renderer:Renderer2) { 
    renderer.setStyle(el.nativeElement, 'background',' yellow')
   // this.el.nativeElement.style.backgroundColor='red'
  }

}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitOnly]',
})
export class DigitOnlyDirective {
  regexStr = '^[0-9.]*$';
  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event']) onKeyPress(event: any) {
    var result = new RegExp(this.regexStr).test(event.key);
    if (result) {
      const value = parseInt(this.el.nativeElement.value);
      if (value > 1000) {
        this.el.nativeElement.value = 999;
      }
    }
    return result;
  }
}

import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollDown]',
})
export class ScrollDownDirective {
  @Output() additionalPokemonsEvent = new EventEmitter<boolean>();

  constructor() {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.additionalPokemonsEvent.emit(true);
    }
  }
}

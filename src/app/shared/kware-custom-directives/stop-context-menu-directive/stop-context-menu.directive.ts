import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[dsStopContextMenu]'
})
export class StopContextMenuDirective {

  @HostListener('mousedown', ['$event'])
  public onClick(event: any): void {
    event.preventDefault();
  }
}

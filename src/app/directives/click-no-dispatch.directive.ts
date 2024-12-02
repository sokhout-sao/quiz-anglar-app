import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[click-no-dispatch]",
  standalone: true,
})
export class ClickNoDispatchDirective {
  @HostListener("click", ["$event"])
  public onClick($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}

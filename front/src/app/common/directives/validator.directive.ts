import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValidator]',
  standalone: true
})
export class ValidatorDirective {

  @Input() appValidator:boolean=false;

  constructor(private elementRef:ElementRef<HTMLInputElement>) { }

  @HostListener("keyup") keyup()
  {
    if(!this.appValidator)
    {
      this.elementRef.nativeElement.className="form-control is-invalid";
    }
    else
    {
      this.elementRef.nativeElement.className="form-control is-valid";
    }
  }

}

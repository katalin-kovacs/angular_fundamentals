import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, FormControl } from "@angular/forms";
import { emailValidator } from "../utils/email-validator";

@Directive({
  selector: "[appEmailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(c: FormControl) {
    return emailValidator(c);
  }
}

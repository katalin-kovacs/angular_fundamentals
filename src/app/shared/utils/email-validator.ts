import { FormControl } from "@angular/forms";

export function emailValidator(c: FormControl) {
  let EMAIL_REGEXP =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let isValid = EMAIL_REGEXP.test(c.value);

  return isValid
    ? null
    : {
        validateEmail: {
          valid: false,
        },
      };
}

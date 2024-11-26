import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function samePOLPODValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pol = control.get('POLId')?.value;
    const pod = control.get('PODId')?.value;

    return pol && pod && pol === pod ? { samePOLPOD: true } : null;
  };
}

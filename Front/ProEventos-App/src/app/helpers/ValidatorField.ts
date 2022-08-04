import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {
  static MustMatch(controlName: string, matchingControlName: string): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true})
      }
      else {
        matchingControl.setErrors(null)
      }
      return null
    }
  }

  static ValidDate(controlName: string) : any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup
      const control = formGroup.controls[controlName]

      if (control.errors && !control.errors.validDate) {
        return null
      }

      if (new Date(control.value) < new Date()) {
        control.setErrors({ validDate: true })
      }
      else {
        control.setErrors(null)
      }

      return null
    }
  }
}

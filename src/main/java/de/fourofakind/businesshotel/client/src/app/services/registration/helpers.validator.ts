import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function checkPasswordMatch(controlName: string, matchingControlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

export function validateEmail()
{
  return (formGroup: FormGroup) =>
  {

    const control = formGroup.controls["emailAddress"];

    if (control.errors && !control.errors.emailInvalid) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value.length !== 0)
    {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (control.value.match(re))
      {
        control.setErrors(null)
      }
      else
      {
        control.setErrors({emailInvalid: true})
      }

    }
  }
}

export function validatePhoneNumber()
{
  return (formGroup: FormGroup) =>
  {


    const control = formGroup.controls["phoneNumber"];

    if (control.errors && !control.errors.phoneNumberInvalid) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (control.value.length !== 0)
    {
      const phoneRegex:RegExp=/^\+(?:[0-9] ?){6,14}[0-9]$/;
      if (control.value.match(phoneRegex))
      {
        control.setErrors(null)
      }
      else
      {
        control.setErrors({phoneNumberInvalid: true})
      }

    }
  }
}

export function validateIban()
{
  return (formGroup: FormGroup) =>
  {

    const rootControll = formGroup.controls["paymentMethod"];




    const control = formGroup.controls["paymentCredentials"];

    if (control) {
      if (control.errors && !control.errors.ibanInvalid) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      if (control.value.length !== 0)
      {
        var paymentCredentialsRegex:RegExp=/^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/;

        if (rootControll.value === "paypal") {
          paymentCredentialsRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        } else if (rootControll.value === "debit") {
          paymentCredentialsRegex=/^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/
        }

        if (control.value.match(paymentCredentialsRegex))
        {
          control.setErrors(null)
        }
        else
        {
          control.setErrors({ibanInvalid: true})
        }

      }
    }


  }
}

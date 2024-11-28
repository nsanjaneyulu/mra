import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Esavalidators {
    static onlyAlphaNumericAllow(control: AbstractControl) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
        if (!regex.test(control.value)) {
            return { onlyAlphaNumericAllow: true };
        } else {
            return null;
        }
    }

    static dateGreaterThan(fromDateControlName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const fromDate = control.root.get(fromDateControlName)?.value;
            const selectedDate = control.value;
            if (fromDate && selectedDate && new Date(selectedDate) <= new Date(fromDate)) {
                return { dateGreaterThan: true }; // Validation failed
            }
            return null; // Validation passed
        };
    }

    static validateAndPushToArray(array: any[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (array.includes(value)) {
                return { 'alreadyExists': true };
            }
            array.push(value);
            return null;
        };
    }
}
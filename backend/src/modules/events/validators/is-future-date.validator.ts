import {
    registerDecorator,
    ValidationOptions,
} from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return (object, propertyName: string) => {
        registerDecorator({
            name: "isFutureDate",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    const date = new Date(value);
                    return !isNaN(date.getTime()) && date > new Date();
                },
                defaultMessage() {
                    return "Event date must be in the future";
                }
            }
        });
    };
}
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export const IsOrderPending = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isOrderPending',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    // Assuming 'orderStatus' is a property of the same object
                    return obj.orderStatus === 'pending';
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Order can only be updated if it is in pending state.';
                }
            }
        });
    };
}
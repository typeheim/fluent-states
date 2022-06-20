export function SelectState(modelProperty: string): PropertyDecorator {
    return (target: any, propertyKey): void => {
        target[propertyKey] = target[modelProperty]?.state
    }
}


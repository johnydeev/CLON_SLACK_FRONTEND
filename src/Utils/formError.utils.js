export class FormError extends Error {
    constructor(message, value) {
        super(message);
        this.value = value;
    }
}

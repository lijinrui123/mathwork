export class PdfContent {
    alignment?: string;
    columns?: any[];
    text?: any;
    constructor(json?: any) {
        Object.assign(this, json);
    }
}
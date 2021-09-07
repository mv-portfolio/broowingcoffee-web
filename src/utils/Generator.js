export default class Generator {
  static #invoiceId = 0;

  static getInvoiceId() {
    return (this.#invoiceId += 1);
  }

  static resetInvoiceId() {
    this.#invoiceId = 0;
  }
}

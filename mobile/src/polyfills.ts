if (typeof global.DOMException === 'undefined') {
  global.DOMException = class DOMException extends Error {
    code: number
    constructor(message?: string, name?: string) {
      super(message)
      this.name = name ?? 'DOMException'
      this.code = 0
    }
  } as unknown as typeof DOMException
}

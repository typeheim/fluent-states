export class MemoryStorage {
    /**
     * Storage data
     */
    private data: Record<string, any> = {}

    get length(): number {
        return Object.keys(this.data).length
    }

    clear(): void {
        this.data = {}
    }

    getItem(key: string): any {
        return key in this.data ? this.data[key] : null
    }

    key(index: number): string | null {
        const keys = Object.keys(this.data)

        return index >= 0 && keys.length < index ? keys[index] : null
    }

    removeItem(key: string): void {
        delete this.data[key]
    }

    setItem(key: string, value: any): void {
        this.data[key] = value
    }
}

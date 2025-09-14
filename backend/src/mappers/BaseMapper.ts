export class BaseMapper {
  /**
   * Converte snake_case para camelCase
   */
  public static toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /**
   * Converte camelCase para snake_case
   */
  public static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * Converte um objeto de snake_case para camelCase
   */
  public static toCamelCaseObject<T = any>(obj: any): T {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.toCamelCaseObject(item)) as T;
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const camelKey = this.toCamelCase(key);
        result[camelKey] = this.toCamelCaseObject(value);
      }
      return result;
    }

    return obj;
  }

  /**
   * Converte um objeto de camelCase para snake_case
   */
  public static toSnakeCaseObject<T = any>(obj: any): T {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.toSnakeCaseObject(item)) as T;
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const snakeKey = this.toSnakeCase(key);
        result[snakeKey] = this.toSnakeCaseObject(value);
      }
      return result;
    }

    return obj;
  }
}

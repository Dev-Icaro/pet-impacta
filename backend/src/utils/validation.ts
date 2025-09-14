export class ValidationUtils {
  public static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  public static sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  public static isValidAge(age: number): boolean {
    return age >= 0 && age <= 30;
  }

  public static isValidWeight(weight: number): boolean {
    return weight > 0 && weight <= 200;
  }
}

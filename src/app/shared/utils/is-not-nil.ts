/**
 * Функция-'type guard', проверяющая не является ли переданное значение null
 * или undefined.
 *
 * @param value Значение для проверки.
 */
export function isNotNil<T>(value: null | undefined | T): value is T {
  return value !== null && value !== undefined;
}

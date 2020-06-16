/**
 * @file Type Definitions - Component Library Globals
 */

/**
 * Type capturing null, undefined, and empty strings.
 */
export type NonExistent = '' | null | undefined

/**
 * Type capturing primitive value types.
 */
export type Primitive = boolean | number | string

/**
 * Type capturing an object with strings for key, and where values can be any
 * type.
 */
export type Obj = Record<string, any>

/**
 * Unknown undefined values represented as primitives.
 */
export const Unknown = {
  Boolean: (undefined as unknown) as boolean,
  Number: (undefined as unknown) as number,
  String: (undefined as unknown) as string
}

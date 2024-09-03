import { ExtendedTaskCreationDto } from "./dtos"

/**
 * Type that represents page data as array
 */
export type PageData<T> = Array<T>

/**
 * Type that represents incoming page data
 */
export type User = {
    id: string
    username: string
    age: number
}
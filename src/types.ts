import { ConfigService } from "@nestjs/config"
import { ExtendedTaskCreationDto } from "./dtos"

export type PageData<T> = Array<T>

export type User = {
    id: string
    username: string
    age: number
}

export type ReportGeneratorOpts = {
    taskOpts: ExtendedTaskCreationDto
    maxRequests: number
}
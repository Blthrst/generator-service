export class TaskCreationDTO {
    serviceName: string
    endpoint: string
    columns: string[]
}

export class TaskStatusDTO {
    status: TaskStatusDTO
    url?: string
}
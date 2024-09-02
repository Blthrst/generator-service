import { Inject, Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class DownloadsService {
    constructor(@Inject() private tasksService: TasksService) {}

    async getDocumentUrl(id: string): Promise<string> {
        const {documentUrl} = await this.tasksService.findById(id)

        return documentUrl
    }

}

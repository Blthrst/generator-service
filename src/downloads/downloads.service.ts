import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class DownloadsService {
    constructor(@Inject() private tasksService: TasksService) {}

    /**
     * Gets document URL by ID
     * @param id Document ID
     * @returns Document URL
     */
    async getDocumentUrl(id: string): Promise<string> {
        const {documentUrl} = await this.tasksService.findById(id)

        if (!documentUrl) 
            throw new NotFoundException()

        return documentUrl
    }

}

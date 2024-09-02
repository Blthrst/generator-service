import { Controller, Get, Param } from '@nestjs/common';

@Controller('downloads/:id')
export class DownloadsController {
    @Get()
    async downloadReport(@Param("id") id: string) {
        
    }
}

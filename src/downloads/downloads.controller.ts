import { Controller, Get, Header, Inject, Param, StreamableFile } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { createReadStream } from 'fs';

/**
 * Controller that handles requests to `/downloads` endpoint
 */
@Controller('downloads')
export class DownloadsController {
  constructor(@Inject() private donwloadsService: DownloadsService) {}


  /**
   * Sends file by specified ID
   * @param id File id
   * @returns Streamable file that client downloads
   */
  @Get("/:id")
  @Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  async downloadReport(@Param('id') id: string): Promise<StreamableFile> {
    const url = await this.donwloadsService.getDocumentUrl(id);
    const file = createReadStream(url);
    return new StreamableFile(file);
  }
}

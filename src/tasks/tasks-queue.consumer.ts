import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { Workbook } from 'exceljs';
import { existsSync, mkdir } from 'fs';
import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';

import { ExtendedTaskCreationDto } from 'src/dtos';
import { TaskStatus } from 'src/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { getPage } from 'src/utils/getPage';

@Processor('tasks')
export class TasksConsumer extends WorkerHost {
  constructor(
    @Inject() private tasksService: TasksService,
    @Inject() private configService: ConfigService,
  ) {
    super();
  }

  /**
   * Method that generates report
   * @param job Job from `tasks` queue
   * @param _ 
   * @returns 
   */
  async process(job: Job<ExtendedTaskCreationDto>, _: any): Promise<any> {
    const p = join(process.cwd(), 'reports');
    if (!existsSync(p)) {
      mkdir(p, (err) => {
        if (err) {
          throw new Error(err.message);
        }
      });
    }

    try {
      /**
       * Excel workbook
       */
      const wb = new Workbook();

      /**
       * Resource URL
       */
      const url = job.data.serviceName + job.data.endpoint;

      // Sends requests until `i` less than `GEN_MAX_REQUESTS` env variable
      for (let i = 0; i < this.configService.get<number>("GEN_MAX_REQUESTS"); i++) {
        const data = await getPage(url, i);
        if (data.length === 0) {
          break;
        }

        /**
         * Excel worksheet
         */
        const ws = wb.addWorksheet(`${i + 1}`, {
          pageSetup: {
            verticalCentered: true,
            horizontalCentered: true,
          },
        });
        const temp = [];
        for (const key of job.data.columns) {
          temp.push({
            header: `${key[0].toUpperCase() + key.substring(1)}`,
            key,
            width: 30,
            border: true,
          });
        }

        ws.columns = temp;

        ws.getRow(1).eachCell(
          (c) => (c.alignment = { vertical: 'middle', horizontal: 'center' }),
        );

        /**
         * Allocated rows for generating report
         */
        const rows = ws.getRows(2, data.length);

        for (let i = 0; i < data.length; i++) {
          rows[i].values = data[i];
          rows[i].eachCell(
            //styling 
            (c) => (c.alignment = { vertical: 'middle', horizontal: 'center' }),
          );
        }
      }
      /**
       * Path to generated report
       */
      const documentUrl = resolve(p, `${job.data.id}.xlsx`)
      await wb.xlsx.writeFile(documentUrl);

      await this.tasksService.updateStatusAndUrl(job.data.id, TaskStatus.DONE, documentUrl)
    } catch (err) {
      throw new Error(err.message);
    }

    return
  }
}

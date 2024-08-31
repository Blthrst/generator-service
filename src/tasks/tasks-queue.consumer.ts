import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { Workbook } from 'exceljs';
import fs from 'fs';
import path from 'path';

import { ExtendedTaskCreationDto } from 'src/dtos';
import { TaskStatus } from 'src/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { getPage } from 'src/utils/getPage';

@Processor('tasks')
export class TasksConsumer extends WorkerHost {
  constructor(@Inject() private tasksService: TasksService) {
    super();
  }

  async process(job: Job<ExtendedTaskCreationDto>, _: any): Promise<any> {
    // await this.tasksService.updateStatus(job.data.id, TaskStatus.DONE); //fix: all tasks get DONE
    const p = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(p)) {
      fs.mkdir(p, (err) => {
        if (err) {
          throw new Error(err.message);
          //todo
        }
      });
    }

    try {
      const wb = new Workbook();
      const url = job.data.serviceName + job.data.endpoint;
      //set respective value instead of 100
      for (let i = 0; i < 100; i++) {
        const ws = wb.addWorksheet(`${i + 1}`);
        const data = getPage();
      }

      await wb.xlsx.writeFile(path.join(p, `${job.data.id}.xlsx`));
    } catch (err) {
      throw new Error(err.message);
      //todo
    }

    return;
  }
}

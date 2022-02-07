import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService {
  index = 'app_monitoring';

  private readonly logger = new Logger(AppService.name);

  constructor(private readonly elasticService: ElasticsearchService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async applyModification(dto: Record<string, any>) {
    this.logger.debug('Send error to Elasticsearch search');
    await this.elasticService.index({
      index: this.index,
      body: {
        timestamp: Date.now(),
        level: dto.errorType,
        message: dto.message,
        service: dto.service,
      },
    });
  }
}

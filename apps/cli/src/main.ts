import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli.module';
import { CLI } from 'cliffy';
import { CliController } from './cli.controller';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule);
  const controller = await app.resolve(CliController);
  new CLI()
    .setDelimiter('cli# ')
    .addCommand('gen_product', {
      description: 'Generate data product',
      parameters: [
        {
          label: 'num',
          type(val) {
            return Number(val) || 5;
          },
          description: 'number product will generated',
        },
      ],
      action: controller.generateProduct.bind(controller),
    })
    .showHelp()
    .show();
}
bootstrap();

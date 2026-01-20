import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //(Cross-Origin Resource Sharing)

  await app.listen(process.env.PORT ?? 3001); //Chnage from 3000 to 3001 since next.js use 3000
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

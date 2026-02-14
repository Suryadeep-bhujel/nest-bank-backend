import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/TransformInterceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn'],
    });

    const config = new DocumentBuilder()
    .setTitle('Bank App')
    .setDescription('API documentation for Bank App')
    .setVersion('1.0')
    .addBearerAuth() // Optional: for JWT support
    .setBasePath("http://localhost:3000/")
    .build();


    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // 👈 IMPORTANT: enables query -> class instance conversion
            whitelist: true,
            // forbidNonWhitelisted: false, // make true if want to restrict non-whitelisted properties in request payload
            // enableDebugMessages: true,
        }),
    );
    app.enableCors({
        // origin: 'http://localhost:3000', // or your frontend domain
        origin: ['http://localhost:5173', 'http://frontend:5173'],
        credentials: true,
      });
    // app.use
    app.useGlobalInterceptors(new TransformInterceptor());
    // app.useGlobalFilters(new)
    app.setGlobalPrefix('api');
    const swaggerOptions :SwaggerDocumentOptions= {
        operationIdFactory : (controllerKey: string, methodKey :string) => methodKey
    }
    const document = SwaggerModule.createDocument(app, config, swaggerOptions);
    SwaggerModule.setup('api-docs', app, document);
    //http://localhost:3000/api-docs-json
    writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server is running on port=${process.env.PORT ?? 3000}`, '✅');
}
bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '94.143.141.230',
      port: 5432,
      username: 'backendclient',
      password: 'mypassword',
      database: 'listacompra',
      entities: [Product], // Aquí añades tus entidades
      synchronize: true, // ¡Cuidado! En desarrollo crea las tablas automáticamente, en producción se usa false.
    }),
    ProductsModule,
  ],
})
export class AppModule {}

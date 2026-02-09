import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'El nombre es demasiado corto' })
  name: string;

  @IsNumber()
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  price: number;
  
  @IsNumber()
  stock: number;
}

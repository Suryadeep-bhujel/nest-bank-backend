import { Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";
import { Decimal128 } from "typeorm";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: any, next: any): any {
    return next.handle().pipe(
      map((data: T) => this.transform(data))
    );
  }
  private transform(data: any): any {
    return data;
    Object.keys(data ||[]).forEach((key) => {
      const value = data[key];
     
    }
    );
  }
}
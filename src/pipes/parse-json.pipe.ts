import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  constructor(private readonly metatype: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
  
    if (this.isObject(value)) {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          value[key] = this.transform(value[key], metadata);
        }
      }
    } else if (this.isString(value)) {
      value = this.parseJson(value);
    }

    return plainToInstance(this.metatype, value);
  }

  private isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  private isString(value: any): boolean {
    return typeof value === 'string';
  }

 private parseJson(value: any): any {
  try {
    const parsedValue = JSON.parse(value);

    const isNumberValue = typeof parsedValue === 'number' && this.isString(value);
    if (isNumberValue) {
      return value;
    }
    return parsedValue;
  } catch (e) {
    return value;
  }
}
}
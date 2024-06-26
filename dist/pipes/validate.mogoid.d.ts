import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ParseMongoId implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): string;
}

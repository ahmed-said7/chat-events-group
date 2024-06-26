import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class FileInterceptorImage implements NestInterceptor {
    private folder;
    constructor(folder: string);
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}

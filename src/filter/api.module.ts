import { Module } from "@nestjs/common";
import { apiFeatures } from "./api.service";


@Module({
    exports:[apiFeatures],
    providers:[apiFeatures]
})
export class ApiModule {};
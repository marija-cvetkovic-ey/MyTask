import { IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.entity";


export class UpdateTaskDto {

    @IsOptional()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    status: TaskStatus;
}
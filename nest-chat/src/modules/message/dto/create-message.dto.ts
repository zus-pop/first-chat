import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Message } from "../../../../generated/prisma";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    senderId: number;
    
    @IsNumber()
    @IsNotEmpty()
    conversationId: number;

    @IsOptional()
    timestamp?: Date;
}
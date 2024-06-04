import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";
import { QuestionService } from "./question.service";
import { CreateContactDto } from "./dto/create.contact.dto";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { UpdateQuestionDto } from "./dto/update.question.dto";


@Controller()
export class QuestionController {
    constructor( private questionService:QuestionService ){};
    @Post("contact")
    @UseGuards(Protected)
    createContact(
        @Body() body:CreateContactDto
    ){
        return this.questionService.addContact(body);
    };
    @Get("contact")
    @UseGuards(Protected)
    getAllContact(){
        return this.questionService.getAllContacts();
    };
    @Post("question")
    @UseGuards(Protected)
    createQuestion(
        @Body() body:CreateQuestionDto,
        @AuthUser() user:UserDoc
    ){
        return this.questionService.createQuestion(body,user);
    };
    @Get("question")
    @UseGuards(Protected)
    getAllQuestions(){
        return this.questionService.getAllQuestions();
    };
    @Delete("question/:questionId")
    @UseGuards(Protected)
    deleteQuestion(
        @Param("questionId",ParseMongoId) questionId:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.questionService.deleteQuestion(questionId,user);
    };
    @Patch("question/:questionId")
    @UseGuards(Protected)
    updateQuestion(
        @Param("questionId",ParseMongoId) questionId:mongodbId,
        @AuthUser() user:UserDoc,
        @Body() body:UpdateQuestionDto
    ){
        return this.questionService.updateQuestion(body,questionId,user);
    };
}
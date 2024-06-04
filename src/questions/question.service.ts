import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { QuestionDoc } from "src/schema.factory/question.schema";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { mongodbId } from "src/group/group.service";
import { UpdateQuestionDto } from "./dto/update.question.dto";
import { CreateMessageDto } from "src/message/dto/create.message.dto";
import { ContactDoc } from "src/schema.factory/contact.schema";



@Injectable()
export class QuestionService {
    constructor( 
        @InjectModel(Models.Question) private questionModel:Model<QuestionDoc>,
        @InjectModel(Models.Contact) private contactModel:Model<ContactDoc>
    ){};
    async createQuestion(body:CreateQuestionDto){
        const question=await this.questionModel.create(body);
        return { question };
    };
    async deleteQuestion(id:mongodbId){
        const question=await this.questionModel.findByIdAndDelete(id);
        if(! question ){
            throw new HttpException("question not found",400);
        }; 
        return { status:"deleted" };
    };
    async getAllQuestions(){
        const questions=await this.questionModel.find().sort("-createdAt");
        return { questions };
    };
    async updateQuestion(body:UpdateQuestionDto,questionId:mongodbId){
        const question=await this.questionModel
            .findByIdAndUpdate(questionId,body,{new:true});
        if(!question){
            throw new HttpException("question not found",400);
        };
        return { question };
    }
    async addContact(body:CreateMessageDto){
        const contact=await this.contactModel.create(body);
        return { status : "contact sent" };
    };
};
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { QuestionDoc } from "src/schema.factory/question.schema";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { mongodbId } from "src/group/group.service";
import { UpdateQuestionDto } from "./dto/update.question.dto";
import { ContactDoc } from "src/schema.factory/contact.schema";
import { CreateContactDto } from "./dto/create.contact.dto";
import { UserDoc } from "src/schema.factory/user.schema";
export declare class QuestionService {
    private questionModel;
    private contactModel;
    constructor(questionModel: Model<QuestionDoc>, contactModel: Model<ContactDoc>);
    createQuestion(body: CreateQuestionDto, user: UserDoc): Promise<{
        question: import("mongoose").Document<unknown, {}, QuestionDoc> & QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteQuestion(id: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getAllQuestions(): Promise<{
        questions: (import("mongoose").Document<unknown, {}, QuestionDoc> & QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updateQuestion(body: UpdateQuestionDto, questionId: mongodbId, user: UserDoc): Promise<{
        question: import("mongoose").Document<unknown, {}, QuestionDoc> & QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addContact(body: CreateContactDto): Promise<{
        status: string;
    }>;
    getAllContacts(): Promise<{
        contacts: (import("mongoose").Document<unknown, {}, ContactDoc> & ContactDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}

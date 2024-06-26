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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { QuestionService } from "./question.service";
import { CreateContactDto } from "./dto/create.contact.dto";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { UpdateQuestionDto } from "./dto/update.question.dto";
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    createContact(body: CreateContactDto): Promise<{
        status: string;
    }>;
    getAllContact(): Promise<{
        contacts: (import("mongoose").Document<unknown, {}, import("../schema.factory/contact.schema").ContactDoc> & import("../schema.factory/contact.schema").ContactDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createQuestion(body: CreateQuestionDto, user: UserDoc): Promise<{
        question: import("mongoose").Document<unknown, {}, import("../schema.factory/question.schema").QuestionDoc> & import("../schema.factory/question.schema").QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllQuestions(): Promise<{
        questions: (import("mongoose").Document<unknown, {}, import("../schema.factory/question.schema").QuestionDoc> & import("../schema.factory/question.schema").QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deleteQuestion(questionId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    updateQuestion(questionId: mongodbId, user: UserDoc, body: UpdateQuestionDto): Promise<{
        question: import("mongoose").Document<unknown, {}, import("../schema.factory/question.schema").QuestionDoc> & import("../schema.factory/question.schema").QuestionDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}

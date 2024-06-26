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
import { PostService } from "./post.service";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreatePostDto } from "./dto/post.create.dto";
import { mongodbId } from "src/group/group.service";
import { UpdatePostDto } from "./dto/post.update.dto";
import { CreateCommentDto } from "./dto/comment.create.dto";
declare class QueryDto {
    page: number;
    limit: number;
}
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getPostComments(user: UserDoc, postId: mongodbId): Promise<{
        comments: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        }[];
    }>;
    addPostComment(body: CreateCommentDto, user: UserDoc, postId: mongodbId): Promise<{
        status: string;
        comment: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    updatePostComment(body: CreateCommentDto, user: UserDoc, postId: mongodbId, commentId: mongodbId): Promise<{
        status: string;
        comment: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    deletePostComment(user: UserDoc, postId: mongodbId, commentId: mongodbId): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addLike(user: UserDoc, postId: mongodbId): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    removeLike(user: UserDoc, postId: mongodbId): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getLike(user: UserDoc, postId: mongodbId): Promise<{
        likes: import("mongoose").Schema.Types.ObjectId[];
    }>;
    createPost(user: UserDoc, body: CreatePostDto): Promise<{
        post: import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getGroupPosts(user: UserDoc, groupId: mongodbId, query: QueryDto): Promise<{
        posts: (import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deletePost(user: UserDoc, postId: mongodbId): Promise<{
        status: string;
    }>;
    updatePost(user: UserDoc, postId: mongodbId, body: UpdatePostDto): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, import("../schema.factory/post.schema").PostDoc> & import("../schema.factory/post.schema").PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
export {};

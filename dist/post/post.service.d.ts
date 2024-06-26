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
import { mongodbId } from "src/group/group.service";
import { GroupDoc } from "src/schema.factory/group.schema";
import { PostDoc } from "src/schema.factory/post.schema";
import { UserDoc } from "src/schema.factory/user.schema";
interface CreatePost {
    content: string;
    image: string;
    user?: mongodbId;
    group: mongodbId;
}
interface UpdatePost {
    content?: string;
    image?: string;
}
interface CreateComment {
    content: string;
    user?: mongodbId;
}
interface UpdateComment {
    content?: string;
}
export declare class PostService {
    private postModel;
    private groupModel;
    constructor(postModel: Model<PostDoc>, groupModel: Model<GroupDoc>);
    createPost(body: CreatePost, user: UserDoc): Promise<{
        post: import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deletePost(postId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    updatePost(body: UpdatePost, postId: mongodbId, user: UserDoc): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getGroupPosts(groupId: mongodbId, user: UserDoc, page?: number, limit?: number): Promise<{
        posts: (import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    addLike(postId: mongodbId, user: UserDoc): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private validateGroup;
    removeLike(postId: mongodbId, user: UserDoc): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getLikes(postId: mongodbId, user: UserDoc): Promise<{
        likes: import("mongoose").Schema.Types.ObjectId[];
    }>;
    addComment(body: CreateComment, postId: mongodbId, user: UserDoc): Promise<{
        status: string;
        comment: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    removeComment(postId: mongodbId, commentId: mongodbId, user: UserDoc): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateComment(body: UpdateComment, postId: mongodbId, commentId: mongodbId, user: UserDoc): Promise<{
        status: string;
        comment: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    getComments(postId: mongodbId, user: UserDoc): Promise<{
        comments: {
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
            _id?: import("mongoose").Schema.Types.ObjectId;
        }[];
    }>;
}
export {};

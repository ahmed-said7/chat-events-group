import { Controller, Get, Injectable, Query, UseGuards } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { FeedService } from "./feed.service";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";



@Controller("feed")
@UseGuards(Protected)
export class FeedController {
    constructor(private feedService: FeedService){};
    @Get()
    getFeed(
        @AuthUser() user:UserDoc,
        @Query("page") page:string 
    ){
        return this.feedService.getFeed(user,page);
    };
    @Get("/new")
    getNewFeed(
        @AuthUser() user:UserDoc
    ){
        return this.feedService.getNewFeed(user);
    };
};
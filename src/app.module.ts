import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChatModule } from './chat/chat.module';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';
import { EventModule } from './events/events.module';
import { ApiModule } from './filter/api.module';
import { SchemaFactoryModule } from './schema.factory/schema.module';
import { SocketModule } from './websockets/websocket.module';
import { ServiceProviderModule } from './user services/userServices.module';
import { FeedModule } from './feed/feed.module';
import { APP_FILTER } from '@nestjs/core';
import { catchExceptionsFilter } from './errorHandler/base.filter';
import { AddresseModule } from './addresses/addresse.module';
import { QuestionModule } from './questions/question.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true  }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return { uri : config.get<string>("mongo") }
      },
      imports:[ConfigModule]
    }),
    SchemaFactoryModule,
    UserModule,GroupModule,ChatModule,
    PostModule,MessageModule,
    EventModule,ApiModule,SocketModule,ServiceProviderModule,
    FeedModule,AddresseModule,QuestionModule
  ],
  controllers: [],
  providers: [{
    provide:APP_FILTER,
    useClass:catchExceptionsFilter
  }]
})
export class AppModule {}

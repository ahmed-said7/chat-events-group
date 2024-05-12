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
    UserModule,GroupModule,ChatModule,
    PostModule,MessageModule,
    EventModule,ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

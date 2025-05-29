import { Module } from '@nestjs/common';
// 🛡️ Décommentez les lignes ci-dessous si vous souhaitez activer les guards globalement
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/auth/guards/role.guard';
import { AuthModule } from 'src/auth/auth.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from 'src/comment/comment.module';
import { LikeModule } from 'src/like/like.module';
import { ThumbnailModule } from 'src/thumbnail/thumbnail.module';
import { CategoryModule } from 'src/category/category.module';
import { VideoModule } from 'src/video/video.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre ConfigModule accessible globalement
      envFilePath: '.env', // Charger les variables d'environnement
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // correspond au dossier "uploads" à la racine du projet
      serveRoot: '/uploads', // accessible via http://localhost:3900/uploads/...
    }),
    CommentModule,

    LikeModule,

    ThumbnailModule,

    CategoryModule,

    VideoModule,
    ChannelModule,

    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    // 🛡️ Décommentez ces lignes pour appliquer les guards à toutes les routes automatiquement
    /*
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 🛡️ AuthGuard global
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // 🛡️ RoleGuard global
    },
    */

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 🔁 Global interceptor pour structurer les réponses
    },
    AppService,
  ],
})
export class AppModule {}

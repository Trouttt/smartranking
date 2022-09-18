import { Module } from '@nestjs/common';
import { ChallengersService } from './challengers.service';
import { ChallengersController } from './challengers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengerSchema } from './interface/challenger.schema';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenger', schema: ChallengerSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengersController],
  providers: [ChallengersService],
})
export class ChallengersModule {}

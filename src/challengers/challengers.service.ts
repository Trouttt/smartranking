import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengerDto } from './dto/create-challenger.dto';
import { UpdateChallengerDto } from './dto/update-challenger.dto';
import { Challenger } from './interface/challenger.interface';
import { ChallengerSchema } from './interface/challenger.schema';

@Injectable()
export class ChallengersService {
  constructor(
    @InjectModel('ChallengerSchema')
    private readonly challengerModel: Model<Challenger>,

    private readonly playerService: PlayersService,

    private readonly categoryService: CategoriesService,
  ) {}
  async create(createChallengerDto: CreateChallengerDto) {
    const { players, requester, dateHourChallenger } = createChallengerDto;
    const foundPlayers = await this.playerService.findAllPlayers();
    const categories = await this.categoryService.findAllCategories();
    if (foundPlayers.length !== players.length) {
      throw new BadRequestException(
        `One or more players don't exist in database`,
      );
    }

    if (!players.includes(requester)) {
      throw new BadRequestException(`The requester don't existe in players `);
    }

    const categoryThatRequesterIsRegistered = categories.map((category) => {
      if (category.players.includes(requester)) {
        return category;
      }
    });

    if (categoryThatRequesterIsRegistered.length === 0) {
      throw new BadRequestException(`The requester don't existe in category`);
    }

    await new this.challengerModel(createChallengerDto).save();

    return `The player's category: ${categoryThatRequesterIsRegistered[0].category}, Date and hour of challenger: ${dateHourChallenger}`;
  }

  findAll() {
    return `This action returns all challengers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenger`;
  }

  update(id: number, updateChallengerDto: UpdateChallengerDto) {
    return `This action updates a #${id} challenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenger`;
  }
}

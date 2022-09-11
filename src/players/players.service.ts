import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(
        `Player with e-mail ${email} already registered`,
      );
    }
    const playerCreated = new this.playerModel(createPlayerDto);
    return await playerCreated.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with id: ${_id} is not found`);
    }

    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
      .exec();
  }
  async findAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async findPlayerById(_id: string): Promise<Player | null> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with id ${_id} não encontrado`);
    }

    return playerFound;
  }

  async deletePlayer(_id: string): Promise<unknown> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with id ${_id} não encontrado`);
    }
    return await this.playerModel.deleteOne({ _id }).exec();
  }
}

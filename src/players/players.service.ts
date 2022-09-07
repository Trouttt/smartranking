import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const playerFound = await this.players.find(
      (player) => player.email === email,
    );

    if (playerFound) {
      this.update(playerFound, createPlayerDto);
    }
    {
      this.create(createPlayerDto);
    }

    this.create(createPlayerDto);
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async findPlayerByEmail(email: string): Promise<Player | null> {
    const playerFound = await this.players.find(
      (player) => player.email === email,
    );

    if (!playerFound) {
      throw new NotFoundException('Player not found!!!');
    }

    return playerFound;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = await this.players.find(
      (player) => player.email === email,
    );

    this.players = this.players.filter(
      (player) => player.email !== playerFound.email,
    );
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;

    const player: Player = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRank: 1,
      urlPhotoPlayer: 'www.google.com.br/photo123.jpg',
    };
    this.players.push(player);
  }

  private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;

    playerFound.name = name;
  }
}

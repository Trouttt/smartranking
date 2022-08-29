import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`createPlayerDto: ${createPlayerDto}`);

    this.create(createPlayerDto);
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
}

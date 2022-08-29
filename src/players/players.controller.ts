import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayer: CreatePlayerDto): Promise<Player> {
    await this.playersService.createUpdatePlayer(CreatePlayerDto);
  }
}

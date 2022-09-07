import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayer: CreatePlayerDto): Promise<void> {
    return this.playersService.createUpdatePlayer(createPlayer);
  }

  @Get()
  async findPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.findPlayerByEmail(email);
    }
    return this.playersService.findAllPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}

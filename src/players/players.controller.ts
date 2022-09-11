import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interface/players.interface';
import { PlayersService } from './players.service';
import { PlayersValidationParamPipe } from './pipes/players-validation-params.pipe';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayer: CreatePlayerDto): Promise<Player> {
    return this.playersService.createPlayer(createPlayer);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('_id', PlayersValidationParamPipe) _id: string,
    @Body()
    updatePlayer: UpdatePlayerDto,
  ): Promise<void> {
    return this.playersService.updatePlayer(_id, updatePlayer);
  }

  @Get()
  async findPlayers(): Promise<Player[]> {
    return this.playersService.findAllPlayers();
  }

  @Get('/:_id')
  async findPlayerById(
    @Param('_id', PlayersValidationParamPipe) _id: string,
  ): Promise<Player> {
    return this.playersService.findPlayerById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParamPipe) _id: string,
  ): Promise<void> {
    this.playersService.deletePlayer(_id);
  }
}

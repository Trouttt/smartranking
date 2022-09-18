import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from '../players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;

    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (categoryFound) {
      throw new BadRequestException(
        `Category ${categoryFound} already registered`,
      );
    }

    const categoryCreated = new this.categoryModel(createCategoryDto);
    return categoryCreated.save();
  }

  async findAllCategories(): Promise<Array<Category>> {
    return this.categoryModel.find().populate('players').exec();
  }

  async findCategoryById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    console.log(categoryFound);

    if (!categoryFound)
      throw new NotFoundException(`Category ${category} not found!!`);

    return categoryFound;
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (!categoryFound)
      throw new NotFoundException(`Category ${categoryFound} not found!!`);

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDto })
      .exec();
  }

  async assignCategoryPlayer(params: Array<string>): Promise<void> {
    const category = params['category'];
    const idPlayer = params['idPlayer'];

    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    const playerAlreadyExistsInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(idPlayer)
      .exec();

    await this.playersService.findPlayerById(idPlayer);

    if (!categoryFound)
      throw new BadRequestException(`Category ${category} not found!!`);

    if (playerAlreadyExistsInCategory.length > 0)
      throw new BadRequestException(
        `Player ${idPlayer} exist in category ${category}`,
      );

    categoryFound.players.push(idPlayer);

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryFound })
      .exec();
  }
}

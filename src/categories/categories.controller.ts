import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findCategories(): Promise<Array<Category>> {
    return this.categoriesService.findAllCategories();
  }

  @Get('/:category')
  async findCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return this.categoriesService.findCategoryById(category);
  }

  @Put('/:category')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoriesService.updateCategory(category, updateCategoryDto);
  }

  @Post('/:category/players/:idPlayer')
  async assignCategoryPlayer(@Param() params: string[]): Promise<void> {
    await this.categoriesService.assignCategoryPlayer(params);
  }
}

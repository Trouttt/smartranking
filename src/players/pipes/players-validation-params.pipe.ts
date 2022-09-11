import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PlayersValidationParamPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `o valor do parâmetro ${metadata.data} deve ser informado`,
      );
    }

    return value;
  }
}

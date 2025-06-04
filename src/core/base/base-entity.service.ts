import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class BaseEntityService<EntityRdo extends object> {
  protected constructor(
    private readonly entityDto: ClassConstructor<EntityRdo>,
  ) {}

  formatToRdo(entities: unknown[]): EntityRdo[];
  formatToRdo(entity: unknown): EntityRdo;
  formatToRdo(entity: unknown | unknown[]): EntityRdo | EntityRdo[] {
    return plainToInstance(this.entityDto, entity);
  }
}

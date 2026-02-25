import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoriesService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findAll() {
    return this.db.select().from(schema.helpCategories);
  }

  async findOne(id: number) {
    return this.db
      .select()
      .from(schema.helpCategories)
      .where(eq(schema.helpCategories.id, id));
  }
}

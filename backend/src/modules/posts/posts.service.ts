import { desc, eq } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findAll(categoryId?: number) {
    return this.db.query.posts.findMany({
      where: categoryId ? eq(schema.posts.category_id, categoryId) : undefined,
      with: {
        category: true,
      },

      orderBy: [desc(schema.posts.created_at)],
    });
  }
}

import { desc, eq, and, notInArray } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findAll(categoryId?: number) {
    return this.db.query.posts.findMany({
      where: and(
        notInArray(schema.posts.status, ['done', 'in_progress']),
        categoryId ? eq(schema.posts.category_id, categoryId) : undefined,
      ),

      with: {
        category: true,
      },

      orderBy: [desc(schema.posts.created_at)],
    });
  }
  async create(data: {
    author_id: number;
    title: string;
    description: string;
    category_name: string;
    location: string;
    contact: string;
    image_url?: string;
    additional_info?: string;
    event_time: string;
    event_date: string;
  }) {
    console.log('RECEIVED DATA:', data);
    if (!data.image_url) {
      data.image_url =
        'https://pub-cc401c48b031446b873c68956d2d8ae8.r2.dev/help.jpg';
    }

    const category = await this.db
      .select()
      .from(schema.helpCategories)
      .where(eq(schema.helpCategories.name, data.category_name))
      .limit(1);

    if (!category.length) {
      throw new Error('Category not found');
    }

    return this.db
      .insert(schema.posts)
      .values({
        author_id: data.author_id,
        title: data.title,
        contact: data.contact,
        additional_info: data.additional_info,
        description: data.description,
        location: data.location,
        event_time: data.event_time,
        event_date: data.event_date,
        image_url: data.image_url,
        category_id: category[0].id,
      })
      .returning();
  }

  async findByAuthorId(authorId: number) {
    return this.db.query.posts.findMany({
      where: eq(schema.posts.author_id, authorId),
      with: {
        category: true,
      },
      orderBy: [desc(schema.posts.created_at)],
    });
  }

  async markAsDone(postId: number) {
    await this.db
      .update(schema.posts)
      .set({ status: 'done' })
      .where(eq(schema.posts.id, postId));
  }

  async markAsInProgress(postId: number) {
    await this.db
      .update(schema.posts)
      .set({ status: 'in_progress' })
      .where(eq(schema.posts.id, postId));
  }

  async findOne(postId: number) {
    return await this.db.query.posts.findFirst({
      where: eq(schema.posts.id, postId),
      with: {
        category: true, // дістаємо категорію
        author: {
          columns: {
            firstName: true,
            lastName: true, // дістаємо прізвище
            photoUrl: true, // можна також взяти фото автора для солідності
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class NewsService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async getFeed(currentUserId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    return await this.db.query.news.findMany({
      limit: limit,
      offset: offset,
      with: {
        author: true,
        likes: {
          where: eq(schema.likes.user_id, currentUserId),
        },
        photos: true,
      },
      orderBy: (news, { desc }) => [desc(news.created_at), desc(news.id)],
    });
  }

  async createPost(data: {
    author_id: number;
    caption: string;
    location?: string;
    photos: string[];
  }) {
    return await this.db.transaction(async (tx) => {
      const [newPost] = await tx
        .insert(schema.news)
        .values({
          author_id: data.author_id,
          caption: data.caption,
          location: data.location,
        })
        .returning();

      if (data.photos.length > 0) {
        await tx
          .insert(schema.newsPhotos)
          .values(
            data.photos.map((url) => ({ news_id: newPost.id, photo_url: url })),
          );
      }

      return newPost;
    });
  }

  async toggleLike(articleId: number, userId: number) {
    return await this.db.transaction(async (tx) => {
      const existingLike = await tx.query.likes.findFirst({
        where: and(
          eq(schema.likes.article_id, articleId),
          eq(schema.likes.user_id, userId),
        ),
      });

      if (existingLike) {
        await tx
          .delete(schema.likes)
          .where(eq(schema.likes.id, existingLike.id));
        await tx
          .update(schema.news)
          .set({ likes_count: sql`${schema.news.likes_count} - 1` })
          .where(eq(schema.news.id, articleId));
        return { liked: false };
      } else {
        await tx
          .insert(schema.likes)
          .values({ article_id: articleId, user_id: userId });
        await tx
          .update(schema.news)
          .set({ likes_count: sql`${schema.news.likes_count} + 1` })
          .where(eq(schema.news.id, articleId));
        return { liked: true };
      }
    });
  }
}

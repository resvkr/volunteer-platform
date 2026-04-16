import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { eq, sql } from 'drizzle-orm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async findOne(email: string) {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return result[0];
  }

  async findProfileById(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
      with: {
        profile: true,
        receivedReviews: {
          with: {
            fromUser: true,
          },
          orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
        },
      },
    });

    if (!user) {
      console.log('No user found');
    }

    const publicUser = { ...user };
    delete publicUser.password;
    return publicUser;
  }

  async addReview(
    fromUserId: number,
    reviewData: { toUserId: number; rating: number; comment?: string },
  ) {
    return await this.db.transaction(async (tx) => {
      await tx.insert(schema.reviews).values({
        fromUserId,
        toUserId: reviewData.toUserId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      const [stats] = await tx
        .select({
          newAvg: sql<string>`avg(${schema.reviews.rating})`.mapWith(String),
          total: sql<number>`count(${schema.reviews.id})`.mapWith(Number),
        })
        .from(schema.reviews)
        .where(eq(schema.reviews.toUserId, reviewData.toUserId));

      await tx
        .update(schema.userProfiles)
        .set({
          averageRating: stats.newAvg?.toString() || '0.00',
          reviewCount: Number(stats.total),
        })
        .where(eq(schema.userProfiles.userId, reviewData.toUserId));

      return { success: true };
    });
  }

  async updateProfile(
    userId: number,
    updateData: {
      firstName?: string;
      lastName?: string;
      city?: string;
      photoUrl?: string;
      bio?: string;
      dream?: string;
    },
  ) {
    return await this.db.transaction(async (tx) => {
      await tx
        .update(schema.users)
        .set({
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          city: updateData.city,
          photoUrl: updateData.photoUrl,
          bio: updateData.bio,
        })
        .where(eq(schema.users.id, userId));
      await tx
        .update(schema.userProfiles)
        .set({
          dream: updateData.dream,
        })
        .where(eq(schema.userProfiles.userId, userId));

      return { success: true };
    });
  }

  async becomeVolunteer(userId: number, dream: string) {
    await this.db.transaction(async (tx) => {
      await tx
        .update(schema.users)
        .set({ role: 3 })
        .where(eq(schema.users.id, userId));
      await tx
        .update(schema.userProfiles)
        .set({ dream })
        .where(eq(schema.userProfiles.userId, userId));
    });

    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });

    const newToken = await this.authService.generateToken(user!);
    return { access_token: newToken };
  }
}

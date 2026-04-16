import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class VolunteersService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findAllVolunteers() {
    return await this.db
      .select({
        id: schema.users.id,
        firstName: schema.users.firstName,
        lastName: schema.users.lastName,
        city: schema.users.city,

        photo: schema.users.photoUrl,

        dream: schema.userProfiles.dream,
        rating: schema.userProfiles.averageRating,
        reviewCount: schema.userProfiles.reviewCount,
      })
      .from(schema.users)
      .innerJoin(
        schema.userProfiles,
        eq(schema.users.id, schema.userProfiles.userId),
      )
      .where(eq(schema.users.role, 3));
  }
}

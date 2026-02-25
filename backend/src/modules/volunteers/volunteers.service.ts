import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';

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
        dream: schema.volunteerProfiles.dream,
        rating: schema.volunteerProfiles.averageRating,
        photo: schema.userPhotos.photoUrl,
      })
      .from(schema.users)
      .innerJoin(
        schema.volunteerProfiles,
        eq(schema.users.id, schema.volunteerProfiles.userId),
      )
      .leftJoin(
        schema.userPhotos,
        and(
          eq(schema.users.id, schema.userPhotos.userId),
          eq(schema.userPhotos.isMain, true),
        ),
      );
  }
}

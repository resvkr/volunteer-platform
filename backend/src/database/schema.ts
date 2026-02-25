import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  text,
  decimal,
  integer,
  time,
  date,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  roleName: varchar('role_name', { length: 50 }).notNull().unique(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password').notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  role: integer('role')
    .references(() => roles.id)
    .default(2)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const volunteerProfiles = pgTable('volunteer_profiles', {
  userId: integer('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  dream: text('dream'),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 })
    .default('0.00')
    .notNull(),
  reviewCount: integer('review_count').default(0),
});

export const userPhotos = pgTable('user_photos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  photoUrl: text('photo_url').notNull(),
  isMain: boolean('is_main').default(false).notNull(),
});

export const helpCategories = pgTable('help_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  icon_key: varchar('icon_key').notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  category_id: integer('category_id')
    .references(() => helpCategories.id)
    .notNull(),
  author_id: integer('author_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  location: varchar('location'),
  image_url: varchar('image_url'),
  event_time: time('event_time'),
  event_date: date('event_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const postRelations = relations(posts, ({ one }) => ({
  category: one(helpCategories, {
    fields: [posts.category_id],
    references: [helpCategories.id],
  }),
}));

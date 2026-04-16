import { relations } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  decimal,
  integer,
  time,
  date,
  unique,
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
  bio: text('bio'),
  photoUrl: text('photo_url'),
  role: integer('role')
    .references(() => roles.id)
    .default(2)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userProfiles = pgTable('user_profiles', {
  userId: integer('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  dream: text('dream'),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 })
    .default('0.00')
    .notNull(),
  reviewCount: integer('review_count').default(0),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  fromUserId: integer('from_user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  toUserId: integer('to_user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  fromUser: one(users, {
    fields: [reviews.fromUserId],
    references: [users.id],
    relationName: 'sentReviews',
  }),
  toUser: one(users, {
    fields: [reviews.toUserId],
    references: [users.id],
    relationName: 'receivedReviews',
  }),
}));

export const helpCategories = pgTable('help_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  icon_key: varchar('icon_key').notNull(),
});

export const post_status = pgEnum('post_status', [
  'created',
  'in_progress',
  'done',
]);

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
  contact: varchar('contact').notNull(),
  additional_info: varchar('additional_info'),
  status: post_status('status').default('created').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const postRelations = relations(posts, ({ one }) => ({
  category: one(helpCategories, {
    fields: [posts.category_id],
    references: [helpCategories.id],
  }),
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  author_id: integer('author_id')
    .references(() => users.id)
    .notNull(),
  caption: text('caption').notNull(),
  location: varchar('location'),
  likes_count: integer('likes_count').default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const newsPhotos = pgTable('news_photos', {
  id: serial('id').primaryKey(),
  news_id: integer('news_id').references(() => news.id, {
    onDelete: 'cascade',
  }),
  photo_url: text('photo_url').notNull(),
});

export const newsRelations = relations(news, ({ one, many }) => ({
  author: one(users, { fields: [news.author_id], references: [users.id] }),
  photos: many(newsPhotos),
  likes: many(likes),
}));

export const newsPhotosRelations = relations(newsPhotos, ({ one }) => ({
  news: one(news, { fields: [newsPhotos.news_id], references: [news.id] }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  receivedReviews: many(reviews, { relationName: 'receivedReviews' }),
  sentReviews: many(reviews, { relationName: 'sentReviews' }),

  news: many(news),
  likes: many(likes),
}));

export const likes = pgTable(
  'likes',
  {
    id: serial('id').primaryKey(),
    article_id: integer('article_id').references(() => news.id, {
      onDelete: 'cascade',
    }),
    user_id: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
  },
  (t) => ({
    pk: unique().on(t.article_id, t.user_id),
  }),
);

export const likesRelations = relations(likes, ({ one }) => ({
  news: one(news, {
    fields: [likes.article_id],
    references: [news.id],
  }),
  user: one(users, {
    fields: [likes.user_id],
    references: [users.id],
  }),
}));

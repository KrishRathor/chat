import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('createdAt').defaultNow(),
  username: text('name').notNull().unique(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  password: text('password').notNull()
});

export const chatTable = pgTable('chat_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  fromUsername: text('from_username')
    .notNull()
    .references(() => usersTable.username),
  toUsername: text('to_username')
    .notNull()
    .references(() => usersTable.username),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type InsertChat = typeof chatTable.$inferInsert;
export type SelectChat = typeof chatTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;


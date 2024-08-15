import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('createdAt').defaultNow(),
  username: text('name').notNull().unique(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  password: text('password').notNull()
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;


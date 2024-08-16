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

export const fileTable = pgTable('file_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  fromUsername: text('from_username')
    .notNull()
    .references(() => usersTable.username),
  toUsername: text('to_username')
    .notNull()
    .references(() => usersTable.username),
  link: text('link').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});


export const statusTable = pgTable('status_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  fromUsername: text('from_username')
    .notNull()
    .references(() => usersTable.username),
  toUsername: text('to_username')
    .notNull()
    .references(() => usersTable.username),
  status: text('status'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type InsertStatus = typeof statusTable.$inferInsert;
export type SelectStatus = typeof statusTable.$inferSelect;

export type InsertChat = typeof chatTable.$inferInsert;
export type SelectChat = typeof chatTable.$inferSelect;

export type InsertFile = typeof fileTable.$inferInsert;
export type SelectFile = typeof fileTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;


CREATE TABLE IF NOT EXISTS "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"avatar" text,
	CONSTRAINT "users_table_name_unique" UNIQUE("name"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);

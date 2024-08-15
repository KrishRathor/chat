CREATE TABLE IF NOT EXISTS "chat_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_username" text NOT NULL,
	"to_username" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_table" ADD CONSTRAINT "chat_table_from_username_users_table_name_fk" FOREIGN KEY ("from_username") REFERENCES "public"."users_table"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_table" ADD CONSTRAINT "chat_table_to_username_users_table_name_fk" FOREIGN KEY ("to_username") REFERENCES "public"."users_table"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

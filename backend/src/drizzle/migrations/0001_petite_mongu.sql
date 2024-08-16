CREATE TABLE IF NOT EXISTS "status_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_username" text NOT NULL,
	"to_username" text NOT NULL,
	"status" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "status_table" ADD CONSTRAINT "status_table_from_username_users_table_name_fk" FOREIGN KEY ("from_username") REFERENCES "public"."users_table"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "status_table" ADD CONSTRAINT "status_table_to_username_users_table_name_fk" FOREIGN KEY ("to_username") REFERENCES "public"."users_table"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

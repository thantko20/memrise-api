ALTER TABLE "users" ADD COLUMN "created_at" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" date DEFAULT now();
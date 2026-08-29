CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text NOT NULL,
	`product_id` text NOT NULL,
	`product_name` text NOT NULL,
	`unit_price` real NOT NULL,
	`quantity` integer NOT NULL,
	`options_json` text DEFAULT '[]' NOT NULL,
	`line_total` real NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_order_items_order_id` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_number` text NOT NULL,
	`branch` text NOT NULL,
	`customer_name` text NOT NULL,
	`phone` text NOT NULL,
	`address` text NOT NULL,
	`floor_bell` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`payment_method` text DEFAULT 'cash' NOT NULL,
	`subtotal` real NOT NULL,
	`delivery_fee` real DEFAULT 0 NOT NULL,
	`total` real NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_orders_order_number` ON `orders` (`order_number`);--> statement-breakpoint
CREATE INDEX `idx_orders_status_created_at` ON `orders` (`status`,`created_at`);--> statement-breakpoint
PRAGMA optimize;

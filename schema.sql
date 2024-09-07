-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2024-09-08 05:35:12.2180
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."products";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int8 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "name" text NOT NULL,
    "shop_id" int8 NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."shop";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."shop" (
    "id" int8 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "name" text NOT NULL,
    "owner_id" int8 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int8 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "phone_number" text NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."warehouse_stock";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS warehouse_stock_id_seq;

-- Table Definition
CREATE TABLE "public"."warehouse_stock" (
    "id" int4 NOT NULL DEFAULT nextval('warehouse_stock_id_seq'::regclass),
    "shop_id" int4 NOT NULL,
    "warehouse_id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "quantity" int4 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."warehouses";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."warehouses" (
    "id" int8 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "shop_id" int8 NOT NULL,
    "name" text NOT NULL,
    "status" bool DEFAULT true,
    PRIMARY KEY ("id")
);

-- Column Comment
COMMENT ON COLUMN "public"."warehouses"."status" IS 'is warehouse active or not';

INSERT INTO "public"."products" ("id", "created_at", "name", "shop_id", "description") VALUES
(368, '2024-09-05 03:36:31.003876+00', 'Computer - magenta Fresh', 1, 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016'),
(369, '2024-09-05 03:36:31.04893+00', 'Keyboard - blue Fresh', 1, 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'),
(370, '2024-09-05 03:36:31.068922+00', 'Car - black Rubber', 1, 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design'),
(371, '2024-09-05 03:36:31.092106+00', 'Salad - white Frozen', 1, 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'),
(372, '2024-09-05 03:36:31.086845+00', 'Gloves - teal Bronze', 1, 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart'),
(373, '2024-09-05 03:36:31.105521+00', 'Towels - indigo Bronze', 1, 'The Football Is Good For Training And Recreational Purposes'),
(374, '2024-09-05 03:36:31.104477+00', 'Gloves - silver Fresh', 1, 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit'),
(375, '2024-09-05 03:36:31.110931+00', 'Mouse - tan Bronze', 1, 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design'),
(376, '2024-09-05 03:36:31.115248+00', 'Car - fuchsia Steel', 1, 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals'),
(377, '2024-09-05 03:36:31.116675+00', 'Bacon - plum Wooden', 1, 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J');

INSERT INTO "public"."shop" ("id", "created_at", "name", "owner_id") VALUES
(1, '2024-09-03 04:15:30.127041+00', 'trias shop', 1);

INSERT INTO "public"."users" ("id", "created_at", "name", "email", "phone_number", "password") VALUES
(1, '2024-09-03 03:02:03.150083+00', 'trias', 'triasbrata@gmail.com', '081122334455', '$2b$15$psVtzKIMPxRDax/4PlQlZ.q5EyKLiK2uJDozWNRWX6cZ6TMZwsB7O');

INSERT INTO "public"."warehouse_stock" ("id", "shop_id", "warehouse_id", "product_id", "price", "quantity", "created_at") VALUES
(243, 1, 32, 368, 1082.00, 87, '2024-09-05 03:36:31.373385+00'),
(244, 1, 32, 377, 16289.00, 52, '2024-09-05 03:36:31.379197+00'),
(245, 1, 32, 373, 6953.00, 46, '2024-09-05 03:36:31.379665+00'),
(246, 1, 32, 369, 19276.00, 68, '2024-09-05 03:36:31.398264+00'),
(247, 1, 32, 375, 9398.00, 10, '2024-09-05 03:36:31.402012+00'),
(248, 1, 32, 370, 10449.00, 93, '2024-09-05 03:36:31.431979+00'),
(249, 1, 32, 372, 578.00, 81, '2024-09-05 03:36:31.431979+00'),
(250, 1, 32, 374, 5196.00, 60, '2024-09-05 03:36:31.434705+00'),
(251, 1, 32, 376, 9557.00, 54, '2024-09-05 03:36:31.439809+00'),
(252, 1, 32, 371, 16704.00, 78, '2024-09-05 03:36:31.447559+00'),
(253, 1, 33, 371, 16794.00, 10, '2024-09-06 02:51:41.658747+00');

INSERT INTO "public"."warehouses" ("id", "created_at", "shop_id", "name", "status") VALUES
(32, '2024-09-05 03:29:10.475441+00', 1, 'default WH 1', 't'),
(33, '2024-09-06 02:50:42.284206+00', 1, 'another wh 1', 't');



-- Indices
CREATE UNIQUE INDEX products_name_key ON public.products USING btree (name);


-- Indices
CREATE UNIQUE INDEX shop_name_key ON public.shop USING btree (name);


-- Comments
COMMENT ON TABLE "public"."users" IS 'user tables';


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
CREATE UNIQUE INDEX users_phone_number_key ON public.users USING btree (phone_number);

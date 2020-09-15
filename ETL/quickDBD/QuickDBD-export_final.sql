-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "cost" (
    "hurricane_id" INT   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "damage_usd" numeric   NOT NULL,
    "norm_damage_usd" numeric   NOT NULL,
    "year" INT   NOT NULL
);

CREATE TABLE "fatver2" (
    "hurricane_id" INT   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "year" INT   NOT NULL,
    "deaths" INT   NOT NULL
);

CREATE TABLE "master" (
    "date" INT   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "time" INT   NOT NULL,
    "status" VARCHAR(25)   NOT NULL,
    "latitude" VARCHAR(255)   NOT NULL,
    "longitude" VARCHAR(255)   NOT NULL,
    "max_wind" INT   NOT NULL,
    "air_pressure" INT   NOT NULL,
    "latitude_decimal" numeric   NOT NULL,
    "longitude_decimal" numeric   NOT NULL,
    "year" INT   NOT NULL,
    "hurricane_id" INT   NOT NULL,
    "name_year" VARCHAR(255)   NOT NULL
);

CREATE TABLE "cost_state" (
    "state" VARCHAR(10)   NOT NULL,
    "total_damage" INT   NOT NULL
);

ALTER TABLE "cost" ADD CONSTRAINT "fk_cost_hurricane_id" FOREIGN KEY("hurricane_id")
REFERENCES "master" ("hurricane_id");

ALTER TABLE "fatver2" ADD CONSTRAINT "fk_fatver2_hurricane_id" FOREIGN KEY("hurricane_id")
REFERENCES "master" ("hurricane_id");


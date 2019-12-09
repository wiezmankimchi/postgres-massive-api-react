--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;



SET default_tablespace = '';

SET default_with_oids = false;


CREATE SCHEMA ysql;
SET search_path = ysql, public, pg_catalog;

CREATE TABLE products(
  id         bigserial PRIMARY KEY,
  created_at timestamp,
  category   text,
  ean        text,
  price      float,
  quantity   int default(5000),
  rating     float,
  title      text,
  vendor     text
);

CREATE TABLE users(
  id         bigserial PRIMARY KEY,
  created_at timestamp,
  name       text,
  email      text,
  address    text,
  city       text,
  state      text,
  zip        text,
  birth_date text,
  latitude   float,
  longitude  float,
  password   text,
  source     text
);

CREATE TABLE orders(
  id         bigserial PRIMARY KEY,
  created_at timestamp,
  user_id    bigint,
  product_id bigint,
  discount   float,
  quantity   int,
  subtotal   float,
  tax        float,
  total      float
);

CREATE TABLE reviews(
  id         bigserial PRIMARY KEY,
  created_at timestamp,
  reviewer   text,
  product_id bigint,
  rating     int,
  body       text
);

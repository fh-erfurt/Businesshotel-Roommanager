-- mysql script generated by mysql workbench
-- mon jun  7 14:16:58 2021
-- model: new model    version: 1.0
-- mysql workbench forward engineering

set @old_unique_checks=@@unique_checks, unique_checks=0;
set @old_foreign_key_checks=@@foreign_key_checks, foreign_key_checks=0;
set @old_sql_mode=@@sql_mode, sql_mode='only_full_group_by,strict_trans_tables,no_zero_in_date,no_zero_date,error_for_division_by_zero,no_engine_substitution';

-- -----------------------------------------------------
-- schema bh_room_db
-- -----------------------------------------------------
use `bh_room_db` ;
drop database if exists `bh_room_db`;
create schema if not exists `bh_room_db` default character set utf8 ;
use `bh_room_db` ;

-- -----------------------------------------------------
-- table `bh_room_db`.`room`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`room` (
    `room_no` int not null auto_increment,
    `room_name` varchar(45) null,
    `area_in_sqr_metre` float not null,
    `category` varchar(45) not null,
    `price_per_unit` decimal not null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    primary key (`room_no`))
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`role`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`role` (
    `role_name` varchar(45) not null,
    `is_enabled_to_manage_rooms` tinyint null,
    `is_enabled_to_manage_bookings` tinyint null,
    `is_enabled_to_manage_customer_data` tinyint null,
    `created_at` timestamp null default current_timestamp,
    `updated_at` varchar(45) null default 'null on update current_timestamp',
    primary key (`role_name`),
    unique index `role_name_unique` (`role_name` asc))
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`account_details`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`account_details` (
    `account_id` int not null auto_increment,
    `username` varchar(75) not null,
    `password_hash` varchar(255) not null,
    `created_at` timestamp not null default current_timestamp,
    `updated_at` timestamp null default null on update current_timestamp,
    primary key (`account_id`))
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`employee`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`employee` (
    `emp_no` int not null auto_increment,
    `emp_name` varchar(45) not null default 'maximilian',
    `given_role` varchar(45) not null default 'kundenverwalter',
    `account_id` int null,
    `created_at` timestamp not null default current_timestamp,
    `updated_at` timestamp null default null on update current_timestamp,
    primary key (`emp_no`),
    unique index `emp_no_unique` (`emp_no` asc),
    index `fk_employee_role1_idx` (`given_role` asc),
    index `fk_employee_account_details1_idx` (`account_id` asc),
    unique index `account_id_unique` (`account_id` asc),
    constraint `fk_employee_role1`
    foreign key (`given_role`)
    references `bh_room_db`.`role` (`role_name`)
    on delete no action
    on update no action,
    constraint `fk_employee_account_details1`
    foreign key (`account_id`)
    references `bh_room_db`.`account_details` (`account_id`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`contact_data`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`contact_data` (
    `contact_data_id` int not null auto_increment,
    `first_name` varchar(45) null,
    `last_name` varchar(45) null,
    `street_name` varchar(45) not null,
    `street_number` varchar(10) not null,
    `postal_code` varchar(10) not null,
    `city_name` varchar(60) not null,
    `phone` varchar(45) null,
    `mail_address` varchar(80) null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    primary key (`contact_data_id`),
    unique index `address_id_unique` (`contact_data_id` asc))
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`customer`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`customer` (
    `customer_id` int not null auto_increment,
    `payment_method` varchar(15) null,
    `contact_data_id` int not null,
    `account_id` int null,
    `created_at` timestamp not null default current_timestamp,
    `updated_at` timestamp null default null on update current_timestamp,
    primary key (`customer_id`),
    unique index `cust_id_unique` (`customer_id` asc),
    index `fk_customer_contact_data1_idx` (`contact_data_id` asc),
    index `fk_customer_account_details1_idx` (`account_id` asc),
    unique index `account_id_unique` (`account_id` asc),
    constraint `fk_customer_contact_data1`
    foreign key (`contact_data_id`)
    references `bh_room_db`.`contact_data` (`contact_data_id`)
    on delete no action
    on update no action,
    constraint `fk_customer_account_details1`
    foreign key (`account_id`)
    references `bh_room_db`.`account_details` (`account_id`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`booking`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`booking` (
    `booking_no` int not null auto_increment,
    `emp_no` int not null,
    `customer_id` int not null,
    `booking_date` timestamp not null default current_timestamp,
    `room_no` int not null,
    `booking_type` varchar(45) not null,
    `start_date` date not null,
    `end_date` date not null,
    `special_wishes` varchar(100) null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    primary key (`booking_no`),
    index `fk_booking_employee1_idx` (`emp_no` asc),
    index `fk_booking_customer1_idx` (`customer_id` asc),
    unique index `booking_no_unique` (`booking_no` asc),
    constraint `fk_booking_employee1`
    foreign key (`emp_no`)
    references `bh_room_db`.`employee` (`emp_no`)
    on delete no action
    on update no action,
    constraint `fk_booking_customer1`
    foreign key (`customer_id`)
    references `bh_room_db`.`customer` (`customer_id`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`booking_request`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`booking_request` (
    `req_id` int not null auto_increment,
    `booking_request_date` timestamp not null default current_timestamp,
    `amount_people` int not null,
    `price` decimal null,
    `room_no` int not null,
    `customer_id` int not null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    primary key (`req_id`),
    unique index `req_id_unique` (`req_id` asc),
    index `fk_booking_request_room1_idx` (`room_no` asc),
    index `fk_booking_request_customer1_idx` (`customer_id` asc),
    constraint `fk_booking_request_room1`
    foreign key (`room_no`)
    references `bh_room_db`.`room` (`room_no`)
    on delete no action
    on update no action,
    constraint `fk_booking_request_customer1`
    foreign key (`customer_id`)
    references `bh_room_db`.`customer` (`customer_id`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`room_has_booking`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`room_has_booking` (
    `room_no` int not null,
    `booking_id` int not null,
    primary key (`room_no`, `booking_id`),
    index `fk_room_has_booking_booking1_idx` (`booking_id` asc),
    index `fk_room_has_booking_room1_idx` (`room_no` asc),
    constraint `fk_room_has_booking_room1`
    foreign key (`room_no`)
    references `bh_room_db`.`room` (`room_no`)
    on delete no action
    on update no action,
    constraint `fk_room_has_booking_booking1`
    foreign key (`booking_id`)
    references `bh_room_db`.`booking` (`booking_no`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`hotel_room`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`hotel_room` (
    `bed_count` int not null,
    `has_speed_lan` tinyint null,
    `has_tv` tinyint null,
    `has_kitchen` tinyint null,
    `has_coffeemaker` tinyint null,
    `room_no` int not null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    index `fk_hotelroom_room1_idx` (`room_no` asc),
    constraint `fk_hotelroom_room1`
    foreign key (`room_no`)
    references `bh_room_db`.`room` (`room_no`)
    on delete no action
    on update no action)
    engine = innodb;


-- -----------------------------------------------------
-- table `bh_room_db`.`conference_room`
-- -----------------------------------------------------
create table if not exists `bh_room_db`.`conference_room` (
    `max_amount_of_participants` int not null,
    `amount_of_whiteboards` int null,
    `amount_of_beamer` int null,
    `has_screen` tinyint null,
    `has_computer` tinyint null,
    `has_tv` tinyint null,
    `room_no` int not null,
    `updated_at` timestamp null default null on update current_timestamp,
    `created_at` timestamp not null default current_timestamp,
    index `fk_conference_room_room1_idx` (`room_no` asc),
    constraint `fk_conference_room_room1`
    foreign key (`room_no`)
    references `bh_room_db`.`room` (`room_no`)
    on delete no action
    on update no action)
    engine = innodb;


set sql_mode=@old_sql_mode;
set foreign_key_checks=@old_foreign_key_checks;
set unique_checks=@old_unique_checks;

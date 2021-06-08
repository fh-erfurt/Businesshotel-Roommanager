-- MySQL Script generated by MySQL Workbench
-- Tue Jun  8 17:09:43 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bh_room_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bh_room_db` ;

-- -----------------------------------------------------
-- Schema bh_room_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bh_room_db` DEFAULT CHARACTER SET utf8 ;
USE `bh_room_db` ;

-- -----------------------------------------------------
-- Table `bh_room_db`.`account_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`account_details` (
  `account_id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(75) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`contact_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`contact_data` (
  `contact_data_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `street_name` VARCHAR(45) NOT NULL,
  `street_number` VARCHAR(10) NOT NULL,
  `postal_code` VARCHAR(10) NOT NULL,
  `city_name` VARCHAR(60) NOT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `mail_address` VARCHAR(80) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`contact_data_id`),
  UNIQUE INDEX `address_id_unique` (`contact_data_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`customer` (
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `payment_method` VARCHAR(15) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `contact_data_id` INT(11) NOT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`customer_id`, `contact_data_id`),
  UNIQUE INDEX `cust_id_unique` (`customer_id` ASC),
  INDEX `fk_customer_contact_data1_idx` (`contact_data_id` ASC),
  INDEX `fk_customer_account_details1_idx` (`account_id` ASC),
  CONSTRAINT `fk_customer_contact_data1`
    FOREIGN KEY (`contact_data_id`)
    REFERENCES `bh_room_db`.`contact_data` (`contact_data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_account_details1`
    FOREIGN KEY (`account_id`)
    REFERENCES `bh_room_db`.`account_details` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`role` (
  `role_name` VARCHAR(45) NOT NULL,
  `is_enabled_to_manage_rooms` TINYINT(4) NULL DEFAULT NULL,
  `is_enabled_to_manage_bookings` TINYINT(4) NULL DEFAULT NULL,
  `is_enabled_to_manage_customer_data` TINYINT(4) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` VARCHAR(45) NULL DEFAULT 'null on update current_timestamp',
  PRIMARY KEY (`role_name`),
  UNIQUE INDEX `role_name_unique` (`role_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`employee` (
  `emp_no` INT(11) NOT NULL AUTO_INCREMENT,
  `emp_name` VARCHAR(45) NOT NULL,
  `given_role` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `account_id` INT(11) NOT NULL,
  PRIMARY KEY (`emp_no`, `account_id`),
  UNIQUE INDEX `emp_no_unique` (`emp_no` ASC),
  INDEX `fk_employee_role1_idx` (`given_role` ASC),
  INDEX `fk_employee_account_details1_idx` (`account_id` ASC),
  CONSTRAINT `fk_employee_role1`
    FOREIGN KEY (`given_role`)
    REFERENCES `bh_room_db`.`role` (`role_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_account_details1`
    FOREIGN KEY (`account_id`)
    REFERENCES `bh_room_db`.`account_details` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`booking` (
  `booking_no` INT(11) NOT NULL AUTO_INCREMENT,
  `emp_no` INT(11) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  `booking_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `room_no` INT(11) NOT NULL,
  `booking_type` VARCHAR(45) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `special_wishes` VARCHAR(100) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `is_booking_request` TINYINT(4) NOT NULL,
  PRIMARY KEY (`booking_no`),
  UNIQUE INDEX `booking_no_unique` (`booking_no` ASC),
  INDEX `fk_booking_employee1_idx` (`emp_no` ASC),
  INDEX `fk_booking_customer1_idx` (`customer_id` ASC),
  CONSTRAINT `fk_booking_customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `bh_room_db`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_employee1`
    FOREIGN KEY (`emp_no`)
    REFERENCES `bh_room_db`.`employee` (`emp_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`room` (
  `room_no` INT(11) NOT NULL AUTO_INCREMENT,
  `room_name` VARCHAR(45) NULL DEFAULT NULL,
  `area_in_sqr_metre` FLOAT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `price_per_unit` DECIMAL(10,0) NOT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`room_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`conference_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`conference_room` (
  `max_amount_of_participants` INT(11) NOT NULL,
  `amount_of_whiteboards` INT(11) NULL DEFAULT NULL,
  `amount_of_beamer` INT(11) NULL DEFAULT NULL,
  `has_screen` TINYINT(4) NULL DEFAULT NULL,
  `has_computer` TINYINT(4) NULL DEFAULT NULL,
  `amount_of_tv` TINYINT(4) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `room_no` INT(11) NOT NULL,
  INDEX `fk_conference_room_room1_idx` (`room_no` ASC),
  CONSTRAINT `fk_conference_room_room1`
    FOREIGN KEY (`room_no`)
    REFERENCES `bh_room_db`.`room` (`room_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`hotel_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`hotel_room` (
  `bed_count` INT(11) NOT NULL,
  `has_speed_lan` TINYINT(4) NULL DEFAULT NULL,
  `has_tv` TINYINT(4) NULL DEFAULT NULL,
  `has_kitchen` TINYINT(4) NULL DEFAULT NULL,
  `has_coffeemaker` TINYINT(4) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `room_no` INT(11) NOT NULL,
  INDEX `fk_hotel_room_room1_idx` (`room_no` ASC),
  CONSTRAINT `fk_hotel_room_room1`
    FOREIGN KEY (`room_no`)
    REFERENCES `bh_room_db`.`room` (`room_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bh_room_db`.`room_has_booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bh_room_db`.`room_has_booking` (
  `room_no` INT(11) NOT NULL,
  `booking_id` INT(11) NOT NULL,
  PRIMARY KEY (`room_no`, `booking_id`),
  INDEX `fk_room_has_booking_booking1_idx` (`booking_id` ASC),
  INDEX `fk_room_has_booking_room1_idx` (`room_no` ASC),
  CONSTRAINT `fk_room_has_booking_booking1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `bh_room_db`.`booking` (`booking_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_room_has_booking_room1`
    FOREIGN KEY (`room_no`)
    REFERENCES `bh_room_db`.`room` (`room_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

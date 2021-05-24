-- MySQL Script generated by MySQL Workbench
-- Mon May 24 11:16:10 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Room` (
  `roomNo` INT NOT NULL AUTO_INCREMENT,
  `roomName` VARCHAR(45) NULL,
  `areaInSqrMetre` FLOAT NULL,
  `category` VARCHAR(45) NULL,
  `pricePerUnit` DECIMAL NULL,
  `lastUpdate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roomNo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Employee` (
  `empNo` INT NOT NULL AUTO_INCREMENT,
  `empName` VARCHAR(45) NOT NULL,
  `givenRole` VARCHAR(45) NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`empNo`),
  UNIQUE INDEX `empNo_UNIQUE` (`empNo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ContactData`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ContactData` (
  `contactDataId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `streetName` VARCHAR(45) NOT NULL,
  `streetNumber` VARCHAR(10) NOT NULL,
  `postalCode` VARCHAR(10) NOT NULL,
  `cityName` VARCHAR(60) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `mailAddress` VARCHAR(80) NULL,
  `lastUpdate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contactDataId`),
  UNIQUE INDEX `addressId_UNIQUE` (`contactDataId` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Customer` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `paymentMethod` VARCHAR(15) NULL,
  `lastUpdate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contactDataId` INT NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE INDEX `custId_UNIQUE` (`customerID` ASC),
  INDEX `fk_Customer_ContactData1_idx` (`contactDataId` ASC),
  CONSTRAINT `fk_Customer_ContactData1`
    FOREIGN KEY (`contactDataId`)
    REFERENCES `mydb`.`ContactData` (`contactDataId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Booking` (
  `bookingNo` INT NOT NULL AUTO_INCREMENT,
  `bookingDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `roomNo` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `startTime` VARCHAR(10) NULL,
  `endTime` VARCHAR(10) NULL,
  `specialWishes` VARCHAR(100) NULL,
  `Employee_empNo` INT NOT NULL,
  `Customer_customerID` INT NOT NULL,
  PRIMARY KEY (`bookingNo`),
  UNIQUE INDEX `bookingId_UNIQUE` (`bookingNo` ASC),
  INDEX `fk_Booking_Employee1_idx` (`Employee_empNo` ASC),
  INDEX `fk_Booking_Customer1_idx` (`Customer_customerID` ASC),
  CONSTRAINT `fk_Booking_Employee1`
    FOREIGN KEY (`Employee_empNo`)
    REFERENCES `mydb`.`Employee` (`empNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Booking_Customer1`
    FOREIGN KEY (`Customer_customerID`)
    REFERENCES `mydb`.`Customer` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BookingRequest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BookingRequest` (
  `reqId` INT NOT NULL AUTO_INCREMENT,
  `bookingRequestDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amountPeople` INT NOT NULL,
  `price` DECIMAL NULL,
  `Room_roomNo` INT NOT NULL,
  `Customer_customerID` INT NOT NULL,
  PRIMARY KEY (`reqId`),
  UNIQUE INDEX `reqId_UNIQUE` (`reqId` ASC),
  INDEX `fk_BookingRequest_Room1_idx` (`Room_roomNo` ASC),
  INDEX `fk_BookingRequest_Customer1_idx` (`Customer_customerID` ASC),
  CONSTRAINT `fk_BookingRequest_Room1`
    FOREIGN KEY (`Room_roomNo`)
    REFERENCES `mydb`.`Room` (`roomNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BookingRequest_Customer1`
    FOREIGN KEY (`Customer_customerID`)
    REFERENCES `mydb`.`Customer` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Room_has_Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Room_has_Booking` (
  `Room_roomNo` INT NOT NULL,
  `Booking_bookingId` INT NOT NULL,
  PRIMARY KEY (`Room_roomNo`, `Booking_bookingId`),
  INDEX `fk_Room_has_Booking_Booking1_idx` (`Booking_bookingId` ASC),
  INDEX `fk_Room_has_Booking_Room1_idx` (`Room_roomNo` ASC),
  CONSTRAINT `fk_Room_has_Booking_Room1`
    FOREIGN KEY (`Room_roomNo`)
    REFERENCES `mydb`.`Room` (`roomNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Room_has_Booking_Booking1`
    FOREIGN KEY (`Booking_bookingId`)
    REFERENCES `mydb`.`Booking` (`bookingNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

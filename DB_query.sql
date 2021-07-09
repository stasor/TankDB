create database TankDB;

CREATE TABLE `tankdb`.`tanks` (
  `idTanks` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lenght` FLOAT NOT NULL,
  `width` FLOAT NOT NULL,
  `height` FLOAT NOT NULL,
  `weight` FLOAT NOT NULL,
  PRIMARY KEY (`idTanks`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);
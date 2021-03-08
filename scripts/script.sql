
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


DROP SCHEMA IF EXISTS `evolve` ;

CREATE SCHEMA IF NOT EXISTS `evolve` DEFAULT CHARACTER SET utf8 ;
USE `evolve` ;

DROP TABLE IF EXISTS `evolve`.`Alimento` ;

CREATE TABLE IF NOT EXISTS `evolve`.`Alimento` (
  `idAlimento` INT NOT NULL AUTO_INCREMENT,
  `posicaoX` DOUBLE,
  `posicaoY` DOUBLE,
  `energia_alimento` DOUBLE,
  PRIMARY KEY (`idAlimento`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `evolve`.`Carnivoro` ;

CREATE TABLE IF NOT EXISTS `evolve`.`Carnivoro` (
  `idCarnivoro` INT NOT NULL AUTO_INCREMENT,
  `posicaoX` DOUBLE NOT NULL,
  `posicaoY` DOUBLE NOT NULL,
  `raio` DOUBLE NOT NULL,
  `velX` DOUBLE NOT NULL,
  `velY` DOUBLE NOT NULL,
  `vel_max` DOUBLE NOT NULL,
  `acelX` DOUBLE NOT NULL,
  `acelY` DOUBLE NOT NULL,
  `forca_max` DOUBLE NOT NULL,
  `cor` VARCHAR(16) NOT NULL,
  `raio_deteccao` DOUBLE NOT NULL,
  `energia_max` DOUBLE NOT NULL,
  `energia` DOUBLE NOT NULL,
  `taxa_gasto_energia` DOUBLE NOT NULL,
  `cansaco_max` DOUBLE NOT NULL,
  `tava_aum_cansaco` DOUBLE NOT NULL,
  PRIMARY KEY (`idCarnivoro`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `evolve`.`Herbivoro` ;

CREATE TABLE IF NOT EXISTS `evolve`.`Herbivoro` (
  `idHerbivoro` INT NOT NULL AUTO_INCREMENT,
  `posicaoX` DOUBLE NOT NULL,
  `posicaoY` DOUBLE NOT NULL,
  `raio` DOUBLE NOT NULL,
  `velX` DOUBLE NOT NULL,
  `velY` DOUBLE NOT NULL,
  `vel_max` DOUBLE NOT NULL,
  `acelX` DOUBLE NOT NULL,
  `acelY` DOUBLE NOT NULL,
  `forca_max` DOUBLE NOT NULL,
  `cor` VARCHAR(16) NOT NULL,
  `raio_deteccao` DOUBLE NOT NULL,
  `energia_max` DOUBLE NOT NULL,
  `energia` DOUBLE NOT NULL,
  `taxa_gasto_energia` DOUBLE NOT NULL,
  `cansaco_max` DOUBLE NOT NULL,
  `tava_aum_cansaco` DOUBLE NOT NULL,
  PRIMARY KEY (`idHerbivoro`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;





select count(idAlimento) from Alimento;

insert into Alimento (posicaoX, posicaoY, energia_alimento) values (0,0,20);

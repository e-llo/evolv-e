DROP SCHEMA IF EXISTS `evolve` ;

CREATE SCHEMA IF NOT EXISTS `evolve` DEFAULT CHARACTER SET utf8 ;
USE `evolve` ;

DROP TABLE IF EXISTS `evolve`.`Organismo` ;

CREATE TABLE IF NOT EXISTS `evolve`.`Organismo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `raio_min` DOUBLE NOT NULL,
  `vel_max` DOUBLE NOT NULL,
  `forca_max` DOUBLE NOT NULL,
  `cor` VARCHAR(16) NOT NULL,
  `raio_deteccao_min` DOUBLE NOT NULL,
  `energia_max` DOUBLE NOT NULL,
  `cansaco_max` DOUBLE NOT NULL,
  `taxa_aum_cansaco` DOUBLE NOT NULL,
  `tempo_vida_min` DOUBLE NOT NULL,
  `tempo_vida_max` DOUBLE NOT NULL,
  `tipo` CHAR NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

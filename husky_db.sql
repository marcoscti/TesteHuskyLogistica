
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema husky_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `husky_db` DEFAULT CHARACTER SET utf8 ;
USE `husky_db` ;

-- -----------------------------------------------------
-- Table `husky_db`.`tb_client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `husky_db`.`tb_client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `name_client` VARCHAR(255) NOT NULL,
  `phone_client` VARCHAR(15) NOT NULL,
  `email_client` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT current_timestamp,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id_client`))
ENGINE = InnoDB;
INSERT INTO `tb_client` (`name_client`, `phone_client`, `email_client`, `created_at`) VALUES ('Marcos Cordeiro Soares', '61 9 9999 8888', 'email@email.com', current_timestamp());

-- -----------------------------------------------------
-- Table `husky_db`.`tb_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `husky_db`.`tb_status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `situation` VARCHAR(15) NULL,
  `classe` VARCHAR(15) NULL,
  PRIMARY KEY (`id_status`))
ENGINE = InnoDB;
INSERT INTO `tb_status` (`id_status`, `situation`, `classe`) VALUES
(1, 'Novo', 'success'),
(2, 'Entregando', 'warning'),
(3, 'Finalizado', 'info'),
(4, 'Cancelado', 'danger');
-- -----------------------------------------------------
-- Table `husky_db`.`tb_deliveryman`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `husky_db`.`tb_deliveryman` (
  `id_deliveryman` INT NOT NULL AUTO_INCREMENT,
  `name_deliveryman` VARCHAR(255) NOT NULL,
  `phone_deliveryman` VARCHAR(15) NOT NULL,
  `email_deliveryman` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_deliveryman`))
ENGINE = InnoDB;
INSERT INTO `tb_deliveryman` (`name_deliveryman`, `phone_deliveryman`, `email_deliveryman`) VALUES ('Entregador Padrão', '61 9 9999-9999', 'default@email.com');

-- -----------------------------------------------------
-- Table `husky_db`.`tb_delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `husky_db`.`tb_delivery` (
  `id_delivery` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT current_timestamp,
  `updated_at` DATETIME NULL,
  `status_id` INT NOT NULL DEFAULT 1,
  `deliveryman_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `destiny` VARCHAR(255) NULL,
  `origin` VARCHAR(255) NULL,
  PRIMARY KEY (`id_delivery`),
  INDEX `fk_tb_delivery_tb_status1_idx` (`status_id` ASC),
  INDEX `fk_tb_delivery_tb_deliveryman1_idx` (`deliveryman_id` ASC),
  INDEX `fk_tb_delivery_tb_client1_idx` (`client_id` ASC),
  CONSTRAINT `fk_tb_delivery_tb_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `husky_db`.`tb_status` (`id_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_delivery_tb_deliveryman1`
    FOREIGN KEY (`deliveryman_id`)
    REFERENCES `husky_db`.`tb_deliveryman` (`id_deliveryman`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_delivery_tb_client1`
    FOREIGN KEY (`client_id`)
    REFERENCES `husky_db`.`tb_client` (`id_client`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
INSERT INTO tb_delivery(`status_id`, `deliveryman_id`, `client_id`, `destiny`, `origin`) VALUES (1, 1, 1, 'Destino da Entrega','Origem da Entrega');
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

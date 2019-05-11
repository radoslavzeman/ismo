DROP TABLE IF EXISTS `membership`;
DROP TABLE IF EXISTS `persons`;
DROP TABLE IF EXISTS `units`;

CREATE TABLE `persons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_state` int(11) DEFAULT NULL,
  `user_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `UC_Person` (`name`,`surname`,`date_of_birth`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `units` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `membership` (
  `person_id` int(10) unsigned NOT NULL,
  `unit_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`person_id`,`unit_id`),
  KEY `FK_membership_person` (`person_id`),
  KEY `FK_membership_unit` (`unit_id`),
  CONSTRAINT `FK_membership_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`),
  CONSTRAINT `FK_membership_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `persons`(`name`, `surname`, `date_of_birth`, `user_name`, `password`) VALUES ('Admin', 'Admin', '2000-01-01', 'admin', 'admin');
module.exports = {
  schema: [
    'DROP DATABASE IF EXISTS `small_school`;',
    'CREATE DATABASE `small_school`;',
    'USE `small_school`;',
  ],
  tables: [
    'CREATE TABLE IF NOT EXISTS `small_school`.`course_title` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(25) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS `small_school`.`course_stream` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `stream` VARCHAR(25) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS `small_school`.`course_type` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `type` VARCHAR(25) NOT NULL);',
    "CREATE TABLE IF NOT EXISTS `small_school`.`courses` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title_id` INT NOT NULL, `stream_id` INT NOT NULL, `type_id` INT NOT NULL, `description` VARCHAR(100) DEFAULT 'please add description', `start_date`  DATE NOT NULL DEFAULT '1900-01-01', `end_date`    DATE NOT NULL DEFAULT '1900-01-01', CONSTRAINT `courses_stream_id__stream_id` FOREIGN KEY (`stream_id`) REFERENCES `course_stream`(`id`), CONSTRAINT `courses_type_id__type_id` FOREIGN KEY (`type_id`) REFERENCES `course_type`(`id`), CONSTRAINT `courses_title_id__stream_id` FOREIGN KEY (`title_id`) REFERENCES `course_title`(`id`));",
    "CREATE TABLE IF NOT EXISTS `small_school`.`subjects`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(50) NOT NULL DEFAULT '', `details` VARCHAR(100) DEFAULT 'please add description');",
    "CREATE TABLE IF NOT EXISTS `small_school`.`trainers` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `first_name` VARCHAR(25) NOT NULL DEFAULT '', `last_name` VARCHAR(25) NOT NULL DEFAULT '', `subjects_id` INT, `courses_id` INT, CONSTRAINT `trainers_subjects_id__subjects_id` FOREIGN KEY (`subjects_id`) REFERENCES `subjects`(`id`), CONSTRAINT `trainers_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`)); ",
    "CREATE TABLE IF NOT EXISTS `small_school`.`students` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `first_name` VARCHAR(25) NOT NULL DEFAULT '', `last_name` VARCHAR(25) NOT NULL DEFAULT '', `tuition_fees` DECIMAL(6,2) NOT NULL DEFAULT 9999, `discount` SMALLINT NOT NULL DEFAULT 0, `total` DECIMAL(6,2) DEFAULT (tuition_fees), `date_of_birth` DATE NOT NULL DEFAULT '1900-01-01');",
    "CREATE TABLE IF NOT EXISTS `small_school`.`assignments_type` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `type` VARCHAR(25) NOT NULL DEFAULT '');",
    "CREATE TABLE IF NOT EXISTS `small_school`.`assignments` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(50) NOT NULL DEFAULT '', `description` VARCHAR(100) DEFAULT 'please add description', `assignments_type_id` INT NOT NULL, CONSTRAINT `assignments_assignments_type_id__assignments_type_id` FOREIGN KEY (`assignments_type_id`) REFERENCES `assignments_type`(`id`));",
    "CREATE TABLE IF NOT EXISTS `small_school`.`assignments_student` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `assignments_id`  INT NOT NULL, `students_id` INT NOT NULL, `courses_id` INT NOT NULL, `sub_date` DATETIME NOT NULL DEFAULT '1900-01-01 00:00:00', `oral_mark` DECIMAL(3,1) DEFAULT 0, `assignment_mark` DECIMAL(3,1) DEFAULT 0, `total_mark` DECIMAL(3,1) DEFAULT 0, CONSTRAINT `assignments_student_assignments_id__assignments_id` FOREIGN KEY (`assignments_id`) REFERENCES `assignments`(`id`), CONSTRAINT `assignments_student_students_id__students_id` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`), CONSTRAINT `assignments_student_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`));",
  ],
  views: [
    'CREATE VIEW `all_courses` AS SELECT  `courses`.`id` , `course_title`.`title`, `course_stream`.`stream`, `course_type`.`type`, `courses`.`start_date`, `courses`.`end_date` FROM `small_school`.`courses` LEFT JOIN `course_title` ON `course_title`.`id` = `courses`.`title_id` LEFT JOIN `course_stream` ON `course_stream`.`id` = `courses`.`stream_id` LEFT JOIN `course_type` ON `course_type`.`id` = `courses`.`type_id`;',
    'CREATE VIEW `all_students` AS SELECT `students`.`id`, `students`.`first_name`, `students`.`last_name`, `courses`.`description`, `students`.`date_of_birth`, `students`.`tuition_fees` FROM `courses` JOIN `course_title` ON `courses`.`title_id` = `course_title`.`id` JOIN `course_stream` ON `courses`.`stream_id` = `course_stream`.`id` JOIN `course_type` ON `courses`.`type_id` = `course_type`.`id` JOIN `assignments_student` ON `courses`.`id` = `assignments_student`.`courses_id` JOIN `students` ON `assignments_student`.`students_id`  = `students`.`id` GROUP BY `students`.`id`;',
    'CREATE VIEW `all_trainers` AS SELECT `trainers`.`id`, `trainers`.`first_name`, `trainers`.`last_name`, `subjects`.`id` AS `subjects_id`, `subjects`.`details`, `courses`.`id` AS `courses_id`, `courses`.`description` FROM `small_school`.`trainers` LEFT JOIN `subjects` ON `subjects`.`id` = `trainers`.`subjects_id` LEFT JOIN `courses` ON `courses`.`id` = `trainers`.`courses_id`;',
    'CREATE VIEW `all_assignments` AS SELECT `assignments`.`id`,`assignments`.`title`, `assignments`.`description`, `assignments_type`.`type` FROM `small_school`.`assignments` JOIN `assignments_type` ON `assignments_type`.`id` = `assignments`.`assignments_type_id`;',
  ],
  inserts: [
    "INSERT INTO `small_school`.`course_title`(`title`) VALUES ('CB11'),('CB12'),('CB13'),('CB14');",
    "INSERT INTO `small_school`.`course_type`(`type`) VALUES ('Full time'),('Part time');",
    "INSERT INTO `small_school`.`course_stream`(`stream`) VALUES ('Java'),('JavaScript'),('C#'),('Python');",
    "INSERT INTO `small_school`.`courses`(`title_id`, `stream_id`, `type_id`, `description`, `start_date`, `end_date`) VALUES (2, 2, 1, 'CB12 Javascript Full-time', '2020-06-01', '2021-01-01'),(3, 2, 2, 'CB13 Javascript Part-time', '2021-01-01', '2021-04-30'),(3, 1, 1, 'CB13 Java Full-time', '2021-01-01', '2021-09-22'),(4, 3, 2, 'CB14 C# Part-time', '2021-09-01', '2022-01-28'),(4, 4, 1, 'CB14 Python Full-time', '2021-09-01', '2022-03-28');",
    "INSERT INTO `small_school`.`students`(`first_name`, `last_name`, `tuition_fees`, `discount`, `total`, `date_of_birth`) VALUES ('Pok','Molaison','1030','10','927','1987-1-05'),('Johny', 'Mnemonic', '632','15','537.20','1966-11-02'),('Evan','Grasmick','1650','20','1320','1989-03-27'),('Ciara','Cobbley','2200','50','1100.00','1988-10-10'),('Alba','Mosseri','632','5','600','1987-08-12'),('Ulysses','Manzella','1000','10','900','1990-05-11');",
    "INSERT INTO `small_school`.`assignments_type`(`type`) VALUES ('Assignment'),('Individual project'),('Team project');",
    "INSERT INTO `small_school`.`assignments`(`assignments_type_id`, `title`) VALUES (1, 'Functional Programming I exercise'),(1, 'Functional Programming II exercise'),(1, 'OOP Programming I exercise'),(1, 'OOP Programming II exercise'),(1, 'Design a dentist webpage'),(1, 'Implement a random sorting algorithm'),(2, 'Make a private school application'),(3, 'Make a CMS');",
    "INSERT INTO `small_school`.`subjects` (`title`, `details`) VALUES ('FSD_1', 'Software design and development'),('FSD_2', 'Introduction to programming'),('FSD_3', 'Object oriented programming'),('FSD_4', 'Web design and development fundamentals'),('FSD_5', 'Relational databases'),('FSD_6', 'Web application development MVC'),('FSD_7', 'The testing cycle'),('FSD_8', 'UI/UX usability'),('FSD_9', 'Developers soft skills and teamwork');",
    "INSERT INTO `small_school`.`trainers`(`first_name`, `last_name`, `subjects_id`, `courses_id`) VALUES ('Don', 'Buchla',1 , 1),('Sai', 'Baba',2 , 1),('Marcelus', 'Wallace',3 , 1),('Costas', 'Simitis',1 , 2),('Marcellus','Wallace',2 , 2);",
  ],
};

const SQL_DATA = {
  
  schema: [
  "DROP DATABASE IF EXISTS `small_school`;"
  ,
  "CREATE DATABASE `small_school`;"
  ,
  "USE `small_school`;"
  ],

  tables: [
  "CREATE TABLE IF NOT EXISTS `small_school`.`course_title` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(25) NOT NULL);"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`course_stream` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `stream` VARCHAR(25) NOT NULL);"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`course_type` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `type` VARCHAR(25) NOT NULL);"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`courses` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title_id` INT NOT NULL, `stream_id` INT NOT NULL, `type_id` INT NOT NULL, `description` VARCHAR(100) DEFAULT 'please add description', `start_date`  DATE NOT NULL DEFAULT '1900-01-01', `end_date`    DATE NOT NULL DEFAULT '1900-01-01', CONSTRAINT `courses_stream_id__stream_id` FOREIGN KEY (`stream_id`) REFERENCES `course_stream`(`id`), CONSTRAINT `courses_type_id__type_id` FOREIGN KEY (`type_id`) REFERENCES `course_type`(`id`), CONSTRAINT `courses_title_id__stream_id` FOREIGN KEY (`title_id`) REFERENCES `course_title`(`id`));"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`subjects`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(50) NOT NULL DEFAULT '', `details` VARCHAR(100) DEFAULT 'please add description');"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`trainers` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `first_name` VARCHAR(25) NOT NULL DEFAULT '', `last_name` VARCHAR(25) NOT NULL DEFAULT '', `subjects_id` INT, `courses_id` INT, CONSTRAINT `trainers_subjects_id__subjects_id` FOREIGN KEY (`subjects_id`) REFERENCES `subjects`(`id`), CONSTRAINT `trainers_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`)); "
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`students` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `first_name` VARCHAR(25) NOT NULL DEFAULT '', `last_name` VARCHAR(25) NOT NULL DEFAULT '', `tuition_fees` DECIMAL(6,2) NOT NULL DEFAULT 2500, `date_of_birth` DATE NOT NULL DEFAULT '1900-01-01');"
  ,          
  "CREATE TABLE IF NOT EXISTS `small_school`.`assignments_type` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `type` VARCHAR(25) NOT NULL DEFAULT '');"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`assignments` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(50) NOT NULL DEFAULT '', `description` VARCHAR(100) DEFAULT 'please add description', `assignments_type_id` INT NOT NULL, CONSTRAINT `assignments_assignments_type_id__assignments_type_id` FOREIGN KEY (`assignments_type_id`) REFERENCES `assignments_type`(`id`));"
  ,
  "CREATE TABLE IF NOT EXISTS `small_school`.`assignments_student` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `assignments_id`  INT NOT NULL, `students_id` INT NOT NULL, `courses_id` INT NOT NULL, `sub_date` DATETIME NOT NULL DEFAULT '1900-01-01 00:00:00', `oral_mark` DECIMAL(3,1) DEFAULT 0, `assignment_mark` DECIMAL(3,1) DEFAULT 0, `total_mark` DECIMAL(3,1) DEFAULT 0, CONSTRAINT `assignments_student_assignments_id__assignments_id` FOREIGN KEY (`assignments_id`) REFERENCES `assignments`(`id`), CONSTRAINT `assignments_student_students_id__students_id` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`), CONSTRAINT `assignments_student_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`));"
  ],
  
  views: [
  'CREATE VIEW `all_courses` AS SELECT  `courses`.`id` , `course_title`.`title`, `course_stream`.`stream`, `course_type`.`type`, `courses`.`start_date`, `courses`.`end_date` FROM `small_school`.`courses` LEFT JOIN `course_title` ON `course_title`.`id` = `courses`.`title_id` LEFT JOIN `course_stream` ON `course_stream`.`id` = `courses`.`stream_id` LEFT JOIN `course_type` ON `course_type`.`id` = `courses`.`type_id`;'
  ,
  'CREATE VIEW `all_students` AS SELECT `students`.`id`, `students`.`first_name`, `students`.`last_name`, `courses`.`description`, `students`.`date_of_birth`, `students`.`tuition_fees` FROM `courses` JOIN `course_title` ON `courses`.`title_id` = `course_title`.`id` JOIN `course_stream` ON `courses`.`stream_id` = `course_stream`.`id` JOIN `course_type` ON `courses`.`type_id` = `course_type`.`id` JOIN `assignments_student` ON `courses`.`id` = `assignments_student`.`courses_id` JOIN `students` ON `assignments_student`.`students_id`  = `students`.`id` GROUP BY `students`.`id`;'
  ,
  'CREATE VIEW `all_trainers` AS SELECT `trainers`.`id`, `trainers`.`first_name`, `trainers`.`last_name`, `subjects`.`id` AS `subjects_id`, `subjects`.`title`, `subjects`.`details`, `courses`.`id` AS `courses_id`, `courses`.`description` FROM `small_school`.`trainers` LEFT JOIN `subjects` ON `subjects`.`id` = `trainers`.`subjects_id` LEFT JOIN `courses` ON `courses`.`id` = `trainers`.`courses_id`;'
  ,
  'CREATE VIEW `all_assignments` AS SELECT `assignments`.`id`,`assignments`.`title`, `assignments`.`description`, `assignments_type`.`type` FROM `small_school`.`assignments` JOIN `assignments_type` ON `assignments_type`.`id` = `assignments`.`assignments_type_id`;'
  ],
  
  inserts: [
  "INSERT INTO `small_school`.`course_title`(`title`) VALUES ('CB11'),('CB12'),('CB13'),('CB14');"
  ,
  "INSERT INTO `small_school`.`course_type`(`type`) VALUES ('Full time'),('Part time');"
  ,    
  "INSERT INTO `small_school`.`course_stream`(`stream`) VALUES ('Java'),('JavaScript'),('C#'),('Python');"
  ,
  "INSERT INTO `small_school`.`courses`(`title_id`, `stream_id`, `type_id`, `description`, `start_date`, `end_date`) VALUES (2, 2, 1, 'CB12 Javascript Full-time', '2020-06-01', '2021-01-01'),(3, 2, 2, 'CB13 Javascript Part-time', '2021-01-01', '2021-04-30'),(3, 1, 1, 'CB13 Java Full-time', '2021-01-01', '2021-09-22'),(4, 3, 2, 'CB14 C# Part-time', '2021-09-01', '2022-01-28'),(4, 4, 1, 'CB14 Python Full-time', '2021-09-01', '2022-03-28');"
  ,
  "INSERT INTO `small_school`.`students`(`first_name`, `last_name`, `tuition_fees`, `date_of_birth`) VALUES ('Pok','Molaison','632','1987-1-05'),('Johny', 'Mnemonic', '632', '1966-11-02'),('Aleshia','Rampy','632','1982-05-11'),('Evan','Grasmick','632','1989-03-27'),('France','Hisaw','632','1990-10-26'),('Ciara','Cobbley','632','1988-10-10'),('Alba','Mosseri','632','1987-08-12'),('Ulysses','Manzella','1000','1990-05-11'),('Sai','Baba','1000','1926-11-23'),('Eric','Writer','1000','1982-12-04'),('Martha','Teplica','1000','1990-09-13'),('Svetlana','Erm','1000','1988-01-02'),('Luis','Ear','1000','1983-07-11'),('Carrol','Kunimitsu','1000','1987-06-22'),('Kokos','Sanel','2500','1987-01-05'),('Luis','Bruch','2500','1982-11-11'),('Margurite','Spinello','2500','1982-05-11'),('Vernice','Teplica','2500','1990-06-09'),('John','Rambo','2500','1972-02-16'),('Tess','Sitra','2500','1989-09-17'),('Pedro','Aschoff','2500','1991-12-06');"
  ,
  "INSERT INTO `small_school`.`assignments_type`(`type`) VALUES ('Assignment'),('Individual project'),('Team project');"
  ,
  "INSERT INTO `small_school`.`assignments`(`assignments_type_id`, `title`) VALUES (1, 'Functional Programming I exercise'),(1, 'Functional Programming II exercise'),(1, 'OOP Programming I exercise'),(1, 'OOP Programming II exercise'),(1, 'Design a dentist webpage'),(1, 'Implement a random sorting algorithm'),(2, 'Make a private school application'),(3, 'Make a CMS');"
  ,
  "INSERT INTO `small_school`.`subjects` (`title`, `details`) VALUES ('FSD_1', 'Software design and development'),('FSD_2', 'Introduction to programming'),('FSD_3', 'Object oriented programming'),('FSD_4', 'Web design and development fundamentals'),('FSD_5', 'Relational databases'),('FSD_6', 'Web application development MVC'),('FSD_7', 'The testing cycle'),('FSD_8', 'UI/UX usability'),('FSD_9', 'Developers soft skills and teamwork');"
  ,
  "INSERT INTO `small_school`.`trainers`(`first_name`, `last_name`, `subjects_id`, `courses_id`) VALUES ('Don', 'Buchla',1 , 1),('Sai', 'Baba',2 , 1),('Marcelus', 'Wallace',3 , 1),('Dimitrios', 'Blachos',4 , 1),('Costas', 'Simitis',1 , 2),('Elbert','Drawe',2 , 2),('Monroe','Damato',3 , 2),('Brynn','Elkan',4 , 2),('Yun','Paletta',5 , 3),('Frankie','Marruffo',6 , 3),('Beth','Barbone',7 , 3),('Akid','Barbany',8 , 3),('Gaius', 'Octavius',5 , 4),('Isaac','Semrad',6 , 4),('Blu','Dic',7 , 4),('Red','Chic',8 , 4);"
  ,
  // "INSERT INTO `small_school`.`assignments_student` (`assignments_id`, `courses_id`, `students_id`, `sub_date`, `oral_mark`, `assignment_mark`) VALUES (1, 1, 1, '2020-08-01 23:59:00', 30 , 20),(2, 1, 1, '2020-08-11 23:59:00', 80 , 100),(3, 1, 1, '2020-09-01 23:59:00', 100 , 40),(8, 1, 1, '2020-12-05 23:59:00', 10 , 40),(1, 1, 2, '2020-08-01 23:59:00', 50 , 60),(2, 1, 2, '2020-08-11 23:59:00', 10 , 80),(3, 1, 2, '2020-09-01 23:59:00', 100 , 50),(8, 1, 2, '2020-12-05 23:59:00', 100 , 50),(1, 1, 3, '2020-08-01 23:59:00', 10 , 100),(2, 1, 3, '2020-08-11 23:59:00', 20 , 100),(3, 1, 3, '2020-09-01 23:59:00', 50 , 40),(8, 1, 3, '2020-12-05 23:59:00', 50 , 40),(1, 1, 4, '2020-08-01 23:59:00', 40 , 30),(2, 1, 4, '2020-08-11 23:59:00', 10 , 100),(3, 1, 4, '2020-09-01 23:59:00', 30 , 90),(8, 1, 4, '2020-12-05 23:59:00', 30 , 90),(1, 1, 5, '2020-08-01 23:59:00', 50 , 100),(2, 1, 5, '2020-08-11 23:59:00', 100 , 60),(3, 1, 5, '2020-09-01 23:59:00', 80 , 100),(8, 1, 5, '2020-12-05 23:59:00', 80 , 60),(1, 1, 6, '2020-08-01 23:59:00', 60 , 30),(2, 1, 6, '2020-08-11 23:59:00', 40 , 100),(3, 1, 6, '2020-09-01 23:59:00', 90 , 50),(8, 1, 6, '2020-12-05 23:59:00', 20 , 50),(1, 1, 7, '2020-08-01 23:59:00', 70 , 100),(2, 1, 7, '2020-08-11 23:59:00', 100 , 80),(3, 1, 7, '2020-09-01 23:59:00', 90 , 80),(8, 1, 7, '2020-12-05 23:59:00', 10 , 80),(4, 2, 8, '2021-02-01 23:59:00', 50 , 20),(5, 2, 8, '2021-03-01 23:59:00', 100 , 40),(6, 2, 8, '2021-04-04 23:59:00', 40 , 70),(8, 2, 8, '2021-04-24 23:59:00', 40 , 70),(4, 2, 9, '2021-02-01 23:59:00', 100 , 70),(5, 2, 9, '2021-03-01 23:59:00', 80 , 100),(6, 2, 9, '2021-04-04 23:59:00', 50 , 100),(8, 2, 9, '2021-04-24 23:59:00', 50 , 100),(4, 2, 10, '2021-02-01 23:59:00', 60 , 60),(5, 2, 10, '2021-03-01 23:59:00', 70 , 80),(6, 2, 10, '2021-04-04 23:59:00', 100 , 90),(8, 2, 10, '2021-04-24 23:59:00', 100 , 90),(4, 2, 11, '2021-02-01 23:59:00', 10 , 30),(5, 2, 11, '2021-03-01 23:59:00', 100 , 50),(6, 2, 11, '2021-04-04 23:59:00', 80 , 100),(8, 2, 11, '2021-04-24 23:59:00', 80 , 100),(4, 2, 12, '2021-02-01 23:59:00', 100 , 100),(5, 2, 12, '2021-03-01 23:59:00', 100 , 10),(6, 2, 12, '2021-04-04 23:59:00', 100 , 80),(8, 2, 12, '2021-04-24 23:59:00', 100 , 80),(4, 2, 13, '2021-02-01 23:59:00', 20 , 100),(5, 2, 13, '2021-03-01 23:59:00', 70 , 100),(6, 2, 13, '2021-04-04 23:59:00', 100 , 70),(8, 2, 13, '2021-04-24 23:59:00', 10 , 70),(4, 2, 14, '2021-02-01 23:59:00', 100 , 80),(5, 2, 14, '2021-03-01 23:59:00', 100 , 70),(6, 2, 14, '2021-04-04 23:59:00', 40 , 90),(8, 2, 14, '2021-04-24 23:59:00', 40 , 90),(2, 3, 15, '2021-02-21 23:59:00', 60 , 60),(2, 3, 15, '2021-03-11 23:59:00', 20 , 100),(2, 3, 15, '2021-03-24 23:59:00', 50 , 10),(8, 3, 15, '2021-05-05 23:59:00', 50 , 10),(1, 3, 16, '2021-02-21 23:59:00', 10 , 100),(2, 3, 16, '2021-03-11 23:59:00', 100 , 70),(5, 3, 16, '2021-03-24 23:59:00', 20 , 100),(8, 3, 16, '2021-05-05 23:59:00', 20 , 100),(1, 3, 17, '2021-02-21 23:59:00', 10 , 20),(2, 3, 17, '2021-03-11 23:59:00', 100 , 70),(5, 3, 17, '2021-03-24 23:59:00', 100 , 40),(8, 3, 17, '2021-05-05 23:59:00', 100 , 40),(1, 3, 18, '2021-02-21 23:59:00', 20 , 100),(2, 3, 18, '2021-03-11 23:59:00', 90 , 100),(5, 3, 18, '2021-03-24 23:59:00', 70 , 100),(8, 3, 18, '2021-05-05 23:59:00', 70 , 20),(1, 3, 19, '2021-02-21 23:59:00', 20 , 100),(2, 3, 19, '2021-03-11 23:59:00', 20 , 100),(5, 3, 19, '2021-03-24 23:59:00', 100 , 30),(8, 3, 19, '2021-05-05 23:59:00', 20 , 30),(1, 3, 20, '2021-02-21 23:59:00', 60 , 100),(2, 3, 20, '2021-03-11 23:59:00', 100 , 80),(5, 3, 20, '2021-03-24 23:59:00', 60 , 100),(8, 3, 20, '2021-05-05 23:59:00', 60 , 20),(1, 3, 21, '2021-02-21 23:59:00', 100 , 80),(2, 3, 21, '2021-03-11 23:59:00', 90 , 90),(5, 3, 21, '2021-03-24 23:59:00', 20 , 80),(8, 3, 21, '2021-05-05 23:59:00', 20 , 80);"
  ]
};

module.exports = { SQL_DATA };



DROP DATABASE IF EXISTS `university`;

CREATE DATABASE IF NOT EXISTS `university`;

USE `university`;

-- ******************************************* `course_title`

CREATE TABLE IF NOT EXISTS `course_title`
(`id` 	INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title` VARCHAR(25) NOT NULL);

-- ******************************************* `course_stream`

CREATE TABLE IF NOT EXISTS `course_stream`
(`id` 	 INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`stream` VARCHAR(25) NOT NULL);

-- ******************************************* `course_type`

CREATE TABLE IF NOT EXISTS `course_type`
(`id`  INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`type` VARCHAR(25) NOT NULL);

-- *********************************************** `courses`

CREATE TABLE IF NOT EXISTS `courses`
(`id`         INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title_id`    INT NOT NULL ,
`stream_id`   INT NOT NULL ,
`type_id`     INT NOT NULL ,
`description` VARCHAR(100) DEFAULT 'please add description' ,
`start_date`  DATE NOT NULL DEFAULT '1900-01-01' ,
`end_date`    DATE NOT NULL DEFAULT '1900-01-01' ,
CONSTRAINT `courses_stream_id__stream_id` FOREIGN KEY (`stream_id`) REFERENCES `course_stream`(`id`) ,
CONSTRAINT `courses_type_id__type_id` FOREIGN KEY (`type_id`) REFERENCES `course_type`(`id`) ,
CONSTRAINT `courses_title_id__stream_id` FOREIGN KEY (`title_id`) REFERENCES `course_title`(`id`));

-- ********************************************** `subjects`

CREATE TABLE IF NOT EXISTS `subjects`
(`id`     INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title`   VARCHAR(50) NOT NULL DEFAULT '' ,
`details` VARCHAR(100) DEFAULT 'please add description');

-- ********************************************** `trainers`

CREATE TABLE IF NOT EXISTS `trainers`
(`id`         INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`first_name`  VARCHAR(25) NOT NULL DEFAULT '' ,
`last_name`   VARCHAR(25) NOT NULL DEFAULT '' ,
`subjects_id` INT DEFAULT NULL,
`courses_id`  INT DEFAULT NULL,
CONSTRAINT `trainers_subjects_id__subjects_id` FOREIGN KEY (`subjects_id`) REFERENCES `subjects`(`id`) ,
CONSTRAINT `trainers_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`)); 

-- ********************************************** `students`

CREATE TABLE IF NOT EXISTS `students`
(`id`           INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`first_name`    VARCHAR(25) NOT NULL DEFAULT '' ,
`last_name`     VARCHAR(25) NOT NULL DEFAULT '' ,
`tuition_fees`  DECIMAL(6,2) NOT NULL DEFAULT 2500 ,
`date_of_birth` DATE NOT NULL DEFAULT '1900-01-01');

-- *************************************** `assignments_type`

CREATE TABLE IF NOT EXISTS `assignments_type`
(`id`  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`type` VARCHAR(25) NOT NULL DEFAULT '');

-- ******************************************** `assignments`

CREATE TABLE IF NOT EXISTS `assignments`
(`id`         	      INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title`       	      VARCHAR(50) NOT NULL DEFAULT '' ,
`description` 	      VARCHAR(100) DEFAULT 'please add description',
`assignments_type_id` INT NOT NULL ,
CONSTRAINT `assignments_assignments_type_id__assignments_type_id` FOREIGN KEY (`assignments_type_id`) REFERENCES `assignments_type`(`id`));

-- *********************************** `assignments_students`

CREATE TABLE IF NOT EXISTS `assignments_student`
(`id`             INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`assignments_id`  INT NOT NULL ,
`students_id`     INT NOT NULL ,
`courses_id`      INT NOT NULL ,
`sub_date`        DATETIME NOT NULL DEFAULT '1900-01-01 00:00:00' ,
`oral_mark` 	  INT DEFAULT NULL,
`assignment_mark` INT DEFAULT NULL,
`total_mark`      INT DEFAULT NULL,
CONSTRAINT `assignments_student_assignments_id__assignments_id` FOREIGN KEY (`assignments_id`) REFERENCES `assignments`(`id`) ,
CONSTRAINT `assignments_student_students_id__students_id` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ,
CONSTRAINT `assignments_student_courses_id__courses_id` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`));



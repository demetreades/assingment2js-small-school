DROP DATABASE IF EXISTS `small_school`;

CREATE DATABASE IF NOT EXISTS `small_school`;

USE `small_school`;

-- ******************************************* `course_title`

CREATE TABLE IF NOT EXISTS `course_title`
(`id` 		  TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`title` 	  VARCHAR(25) NOT NULL,
-- `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- ******************************************* `course_stream`

CREATE TABLE IF NOT EXISTS `course_stream`
(`id` 	 	  TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`stream` 	  VARCHAR(25) NOT NULL,
-- `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- ******************************************* `course_type`

CREATE TABLE IF NOT EXISTS `course_type`
(`id` 		  TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`type`		  VARCHAR(25) NOT NULL,
-- `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- *********************************************** `courses`

CREATE TABLE IF NOT EXISTS `courses`
(`id`         SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`title_id`    TINYINT  UNSIGNED NOT NULL,
`stream_id`   TINYINT  UNSIGNED NOT NULL,
`type_id`     TINYINT  UNSIGNED NOT NULL,
`description` VARCHAR(100) DEFAULT 'Please add description',
`start_date`  DATE NOT NULL DEFAULT '1900-01-01',
`end_date`    DATE NOT NULL DEFAULT '1900-01-01',
-- `status`       ENUM('tba','ongoing','finished'), DEFAULT 'tba' 
`created_at`  DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `courses_stream_id__stream_id` FOREIGN KEY (`stream_id`) REFERENCES `course_stream`(`id`),
CONSTRAINT `courses_type_id__type_id`     FOREIGN KEY (`type_id`)   REFERENCES `course_type`(`id`),
CONSTRAINT `courses_title_id__stream_id`  FOREIGN KEY (`title_id`)  REFERENCES `course_title`(`id`));

-- ********************************************** `subjects`

CREATE TABLE IF NOT EXISTS `subjects`
(`id`    	       TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`title`  	       VARCHAR(50) NOT NULL DEFAULT '',
`details` 	     VARCHAR(100) DEFAULT 'Please add description',
`created_at`     DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
-- `status`          ENUM('tba','ongoing','finished'), DEFAULT 'tba' 
`updated_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- ********************************************** `trainers`

CREATE TABLE IF NOT EXISTS `trainers`
(`id`            SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`first_name`     VARCHAR(25) NOT NULL DEFAULT '',
`last_name`      VARCHAR(25) NOT NULL DEFAULT '',
`avatar_picture` BLOB DEFAULT NULL, -- se arxeio
-- `status`          ENUM('registered','enrolled','paused', 'deleted'), DEFAULT 'registered' 
`created_at`     DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP); 

-- ********************************************** `subjects_trainers`

CREATE TABLE IF NOT EXISTS `subjects_trainer`
(`id`		  		       INT      UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`trainers_id` 		   SMALLINT UNSIGNED DEFAULT NULL,
`subjects_id` 		   TINYINT  UNSIGNED DEFAULT NULL,
`courses_id`  		   SMALLINT UNSIGNED DEFAULT NULL,
`subject_start_date` DATE NOT NULL DEFAULT '1900-01-01',
`subject_end_date`   DATE NOT NULL DEFAULT '1900-01-01',
`created_at`  		   DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`  		   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `subjects_trainer_trainers_id__trainers_id` FOREIGN KEY (`trainers_id`) REFERENCES `trainers`(`id`),
CONSTRAINT `subjects_trainer_subjects_id__subjects_id` FOREIGN KEY (`subjects_id`) REFERENCES `subjects`(`id`),
CONSTRAINT `subjects_trainer_courses_id__courses_id`   FOREIGN KEY (`courses_id`)  REFERENCES `courses`(`id`)); 

-- ********************************************** `students`

CREATE TABLE IF NOT EXISTS `students`
(`id`             SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`avatar_picture`  BLOB DEFAULT NULL, 
`first_name`      VARCHAR(25) NOT NULL DEFAULT '',
`last_name`       VARCHAR(25) NOT NULL DEFAULT '',
`tuition_fees`    DECIMAL(6,2) NOT NULL DEFAULT 2500,
`date_of_birth`   DATE NOT NULL DEFAULT '1900-01-01',
-- `credits`         total marks apota assignments olis tis diarkeias tou bootcamp -- me SUM()
-- `status`          ENUM('registered','enrolled','paused','graduated'), DEFAULT 'registered'
`created_at` 	    DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
-- lista me tis plirwmes kathe 15 tou minos -- me SP // mallon prepei nane neos pinakas `payments_per_students`

-- *************************************** `assignments_type`

CREATE TABLE IF NOT EXISTS `assignments_type`
(`id`  		 TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`type` 		 VARCHAR(25)  NOT NULL DEFAULT '',
-- `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- ******************************************** `assignments`

CREATE TABLE IF NOT EXISTS `assignments`
(`id`         	      SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`title`       	      VARCHAR(50)  NOT NULL DEFAULT '',
`description` 	      VARCHAR(100) DEFAULT 'Please add description',
`assignments_type_id` TINYINT  UNSIGNED NOT NULL,
`assignment_mark`     TINYINT  DEFAULT 100,
`created_at`  		    DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `assignments_assignments_type_id__assignments_type_id` FOREIGN KEY (`assignments_type_id`) REFERENCES `assignments_type`(`id`));

-- *********************************** `assignments_students`

CREATE TABLE IF NOT EXISTS `assignments_student`
(`id`              INT      UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`assignments_id`   SMALLINT UNSIGNED NOT NULL,
`students_id`      SMALLINT UNSIGNED NOT NULL,
`courses_id`       SMALLINT UNSIGNED NOT NULL,
`brief_date`	     DATETIME NOT NULL DEFAULT '1900-01-01 00:00:00',
`sub_date`         DATETIME NOT NULL DEFAULT '1900-01-01 00:00:00',
`oral_mark` 	     DEFAULT  NULL,
`assignment_mark`  TINYINT  DEFAULT NULL,
`total_mark`       TINYINT  DEFAULT NULL,
`finished_project` BLOB DEFAULT NULL,
`status`           ENUM('briefed','submitted','marked'), DEFAULT 'briefed'  mporei na thelei kai FK me ton parent table
-- `active`           BOOLEAN NOT NULL DEFAULT FALSE,
`created_at`  	   DATETIME NOT NULL, -- CURRENT_DATETIME ON UPDATE CURRENT_DATETIME,
`updated_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT `assignments_student_assignments_id__assignments_id` FOREIGN KEY (`assignments_id`) REFERENCES `assignments`(`id`),
CONSTRAINT `assignments_student_students_id__students_id`       FOREIGN KEY (`students_id`)    REFERENCES `students`(`id`),
CONSTRAINT `assignments_student_courses_id__courses_id`         FOREIGN KEY (`courses_id`)     REFERENCES `courses`(`id`));

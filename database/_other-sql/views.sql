
----------------------------------------------------------------

--  SELECT DATE_FORMAT(date_of_birth, '%d-%m-%Y') FROM students;

----------------------------------------------------------------


-- courses
CREATE VIEW `all_courses` AS 
SELECT  `courses`.`id` , `course_title`.`title`, `course_stream`.`stream`, `course_type`.`type` FROM `university`.`courses`
LEFT JOIN `course_title` ON `course_title`.`id` = `courses`.`title_id`
LEFT JOIN `course_stream` ON `course_stream`.`id` = `courses`.`stream_id`
LEFT JOIN `course_type` ON `course_type`.`id` = `courses`.`type_id`;
SELECT * FROM `all_courses`;

-- students
CREATE VIEW `all_students` AS
SELECT `students`.`id`, `students`.`first_name`, `students`.`last_name`, `courses`.`description` FROM `courses`
JOIN `course_title` ON `courses`.`title_id` = `course_title`.`id` 
JOIN `course_stream` ON `courses`.`stream_id` = `course_stream`.`id` 
JOIN `course_type` ON `courses`.`type_id` = `course_type`.`id` 
JOIN `assignments_student` ON `courses`.`id` = `assignments_student`.`courses_id` 
JOIN `students` ON `assignments_student`.`students_id`  = `students`.`id`
GROUP BY `students`.`id`;
SELECT * FROM `all_students`;

-- trainers
CREATE VIEW `all_trainers` 
AS SELECT 
`trainers`.`id`, `trainers`.`first_name`, `trainers`.`last_name`, 
`subjects`.`id` AS `subjects_id`, `subjects`.`title`, `subjects`.`details`, 
`courses`.`id` AS `courses_id`, `courses`.`description` 
FROM `university`.`trainers`
LEFT JOIN `subjects` ON `subjects`.`id` = `trainers`.`subjects_id`
LEFT JOIN `courses` ON `courses`.`id` = `trainers`.`courses_id`;
SELECT * FROM `all_trainers`;

-- assignments
CREATE VIEW `all_assignments` AS  
SELECT `assignments`.`id`,`assignments`.`title`, `assignments`.`description`, `assignments_type`.`type` FROM `university`.`assignments`
JOIN `assignments_type` ON `assignments_type`.`id` = `assignments`.`assignments_type_id`;
SELECT * FROM `all_assignments`;

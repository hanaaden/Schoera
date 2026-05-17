CREATE TABLE users(
    user_id SERIAL PRIMARY KEY ,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL
    CHECK (role IN ('admin', 'teacher', 'student')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faculty(
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(255) NOT NULL
);

CREATE TABLE classes(
class_id SERIAL PRIMARY KEY ,
class_name VARCHAR(255) NOT NULL,
faculty_id INTEGER NOT NULL,

FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);



CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    Roll_Number VARCHAR(255) NOT NULL UNIQUE,
    shift VARCHAR(255) NOT NULL,
    class_id INTEGER NOT NULL, 
    year INTEGER,

    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE course(
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    faculty_id INTEGER NOT NULL,

    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

CREATE TABLE class_course(
    class_courseid SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,

    FOREIGN KEY (class_id) REFERENCES classes(class_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);

CREATE TABLE enrollment(
  enrollment_id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  class_courseid INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (class_courseid) REFERENCES class_course(class_courseid)
);

CREATE TABLE attendance(
    attendance_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    attendance_date DATE NOT NULL,
    class_courseid INTEGER NOT NULL,
    status VARCHAR(8) NOT NULL,

    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (class_courseid) REFERENCES class_course(class_courseid)
    );



CREATE TABLE exam(
    exam_id SERIAL PRIMARY KEY,
    exam_name VARCHAR(255) NOT NULL,
    class_courseid INTEGER NOT NULL,
    acedamic_year INTEGER NOT NULL,
    semister VARCHAR(255) NOT NULL,
    FOREIGN KEY (class_courseid) REFERENCES class_course(class_courseid)
);

CREATE TABLE grade(
    grade_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    exam_id INTEGER NOT NULL,
    marks INTEGER NOT NULL,
    grade VARCHAR(10) NOT NULL,
    overall VARCHAR(25) NOT NULL,

    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id)
);

CREATE TABLE timetable(
    timetable_id SERIAL PRIMARY KEY,
    class_courseid INTEGER NOT NULL,
    day VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    FOREIGN KEY (class_courseid) REFERENCES class_course(class_courseid)
);

CREATE table event(
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    description TEXT
);

INSERT into users (username , password , email , role) VALUES
('admin1' , 'admin1234' , 'admin1@gmail.com' , 'admin');
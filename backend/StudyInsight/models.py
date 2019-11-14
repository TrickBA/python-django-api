from django.db import models


class Class(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    semester_id = models.ForeignKey(to='Semester', on_delete=models.CASCADE)
        

class CourseSemesterTeacher(models.Model):
    course_id = models.ForeignKey('Course', on_delete=models.CASCADE)
    semester_id = models.ForeignKey('Semester', on_delete=models.CASCADE)
    teacher_id = models.ForeignKey('Teacher', on_delete=models.CASCADE)


class Teacher(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    pcn = models.PositiveIntegerField()
    is_mentor = models.BooleanField()
    is_exam_board = models.BooleanField()


class Student(models.Model):
    student_number = models.PositiveIntegerField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    pcn = models.PositiveIntegerField()
    start_date = models.DateTimeField(auto_created=True)
    stream = models.CharField(max_length=50)
    credits = models.PositiveIntegerField()
    mentor_id = models.ForeignKey('Teacher', on_delete=models.CASCADE)
    class_id = models.ForeignKey('Class', on_delete=models.CASCADE)


class Semester(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    start_date = models.DateTimeField(auto_created=True)
    index = models.PositiveIntegerField()


class PassedSemester(models.Model):
    student_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    semester_id = models.ForeignKey('Semester', on_delete=models.CASCADE)


class Requirement(models.Model):
    semester_id = models.ForeignKey('Semester', on_delete=models.CASCADE)
    course_id = models.ForeignKey('Course', on_delete=models.CASCADE)
    depends_on_course_id = models.ForeignKey('CourseSemesterTeacher', on_delete=models.CASCADE)
    credits = models.PositiveIntegerField()


class Course(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    credits = models.PositiveIntegerField()


class Grade(models.Model):
    student_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    course_id = models.ForeignKey('Course', on_delete=models.CASCADE)
    evaluation_date = models.DateTimeField(auto_created=True)
    grade = models.CharField(max_length=50)

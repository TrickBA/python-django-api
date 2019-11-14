from rest_framework import serializers
from .models import *


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ('name', 'semester_id')


class CourseSemesterTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSemesterTeacher
        fields = ('course_id', 'semester_id', 'teacher_id')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'first_name', 'last_name', 'email', 'pcn', 'is_mentor', 'is_exam_board')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('student_number', 'first_name', 'last_name', 'email','pcn', 'start_date',
                  'stream', 'credits', 'mentor_id', 'class_id')


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'start_date', 'index')


class PassedSemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedSemester
        fields = ('student_id', 'semsester_id')


class RequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ('semester_id', 'course_id', 'depends_on_course_id', 'credits')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'credits')


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('student_id', 'course_id', 'evaluation_date', 'grade')

from rest_framework import serializers

from rest_framework.fields import SerializerMethodField
from .models import *


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'pcn', 'first_name', 'last_name', 'email', 'is_mentor', 'is_exam_board')


class StudentSerializer(serializers.ModelSerializer):
    mentor_id = TeacherSerializer(read_only=True)
    mentor_id_id = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all(), write_only=True)

    class_id = ClassSerializer(read_only=True)
    class_id_id = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), write_only=True)

    class Meta:
        depth = 1
        model = Student
        fields = ('pcn', 'student_number', 'first_name', 'last_name', 'email', 'start_date',
                  'stream', 'credits', 'mentor_id', 'mentor_id_id', 'class_id', "class_id_id")

    def create(self, validated_data):
        return Student.objects.create(**validated_data)


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('index', 'start_date')


class PassedSemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedSemester
        fields = ('student_id', 'semester_id')


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('evaluation_date', 'grade')


class ReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'sendDate', 'sender', 'receiver', 'approved')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'credits')


class CourseWithExtraSerializer(serializers.ModelSerializer):
    grades = SerializerMethodField()
    requirements = SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'credits', 'grades', 'requirements')

    def get_grades(self, obj):
        pcn = None
        request = self.context.get('request')
        if request:
            pcn = request.query_params.get('pcn', None)
            if pcn:
                grades = obj.grades.filter(student_id__pcn=pcn)
                return GradeSerializer(grades, many=True).data

        return GradeSerializer(obj.grades, many=True).data

    def get_requirements(self, obj):
        return RequirementsSerializer(obj.requirements, many=True).data


class CourseSemesterTeacherSerializer(serializers.ModelSerializer):
    course_id = CourseSerializer(many=False)

    class Meta:
        model = CourseSemesterTeacher
        fields = ('course_id',)


class CourseSemesterSerializer(serializers.ModelSerializer):
    course_id = CourseWithExtraSerializer(many=False)

    class Meta:
        model = CourseSemesterTeacher
        fields = ('course_id',)


class TreeSerializer(serializers.ModelSerializer):
    courses = CourseSemesterSerializer(many=True)

    class Meta:
        model = Semester
        fields = ('index', 'start_date', 'courses')


class RequirementsSerializer(serializers.ModelSerializer):
    depends_on_course_id = CourseSerializer(many=False)

    class Meta:
        model = Requirement
        fields = ('depends_on_course_id', 'credits')


class RequestSerializer(serializers.ModelSerializer):
    sender = StudentSerializer(many=False, read_only=True)

    class Meta:
        model = Request
        fields = "__all__"

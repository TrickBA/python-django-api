from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import *


# Create your views here.
@csrf_exempt
def get_list(request, modeltype):
    obj = None
    ser = None
    if modeltype == 'classes':
        obj = Class
        ser = ClassSerializer
    elif modeltype == 'teachers':
        obj = Teacher
        ser = TeacherSerializer
    elif modeltype == 'students':
        obj = Student
        ser = StudentSerializer
    elif modeltype == 'semesters':
        obj = Semester
        ser = SemesterSerializer
    elif modeltype == 'courses':
        obj = Course
        ser = CourseSerializer
    elif modeltype == 'grades':
        obj = Grade
        ser = GradeSerializer
    if request.method == 'GET':
        model = obj.objects.all()
        serializer = ser(model, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def get_detail(request, modeltype, pk):
    obj = None
    ser = None
    if modeltype == 'classes':
        obj = Class
        ser = ClassSerializer
    elif modeltype == 'teachers':
        obj = Teacher
        ser = TeacherSerializer
    elif modeltype == 'students':
        obj = Student
        ser = StudentSerializer
    elif modeltype == 'semesters':
        obj = Semester
        ser = SemesterSerializer
    elif modeltype == 'courses':
        obj = Course
        ser = CourseSerializer
    elif modeltype == 'grades':
        obj = Grade
        ser = GradeSerializer
    try:
        model = obj.objects.get(pk=pk)
    except obj.DoesNotExist:
        return JsonResponse([], safe=False)
    except ValueError:
        return HttpResponse(status=420)

    if request.method == 'GET':
        serializer = ser(model)
        return JsonResponse(serializer.data)


@csrf_exempt
def get_grades(request, modeltype, identifier):
    try:
        if modeltype == 'student':
            grades = Grade.objects.filter(student_id=identifier)
        elif modeltype == 'course':
            grades = Grade.objects.filter(course_id=identifier)
        else:
            return HttpResponse(status=420)
    except ValueError:
        return HttpResponse(status=420)

    if request.method == 'GET':
        serializer = GradeSerializer(grades, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def get_students(request, modeltype, identifier):
    try:
        if modeltype == 'mentor':
            students = Student.objects.filter(mentor_id=identifier)
        elif modeltype == 'class':
            students = Student.objects.filter(class_id=identifier)
        elif modeltype == 'stream':
            students = Student.objects.filter(stream=identifier)
        else:
            return HttpResponse(status=420)
    except ValueError:
        return HttpResponse(status=420)

    if request.method == 'GET':
        serializer = StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def get_courses(request, modeltype, identifier):
    try:
        if modeltype == 'teacher':
            courses = Course.objects.filter(coursesemesterteacher__teacher_id=identifier)
        elif modeltype == 'semester':
            courses = Course.objects.filter(coursesemesterteacher__semester_id__id=identifier)
        else:
            return HttpResponse(status=420)
    except ValueError:
        return HttpResponse(status=420)

    if request.method == 'GET':
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def get_courses(request, modeltype, identifier):
    try:
        if modeltype == 'course':
            courses = Requirement.objects.filter(course_id=identifier)
        elif modeltype == 'semester':
            courses = Requirement.objects.filter(semester_id=identifier)

        else:
            return HttpResponse(status=420)
    except ValueError:
        return HttpResponse(status=420)

    if request.method == 'GET':
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

# region All Requests
# @csrf_exempt
# def class_list(request):
#     if request.method == 'GET':
#         classes = Class.objects.all()
#         serializer = ClassSerializer(classes, many=True)
#         return JsonResponse(serializer.data, safe=False)
#
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = ClassSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
#
#
# @csrf_exempt
# def class_detail(request, pk):
#     try:
#         aclass = Class.objects.get(pk=pk)
#     except Class.DoesNotExist:
#         return HttpResponse(status=404)
#
#     if request.method == 'GET':
#         serializer = ClassSerializer(aclass)
#         return JsonResponse(serializer.data)
#
#     elif request.method == 'POST':
#         aclass.delete()
#         return HttpResponse(status=204)
#
#     elif request.method == 'DELETE':
#         aclass.delete()
#         return HttpResponse(status=204)
# endregion

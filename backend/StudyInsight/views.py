import io

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, generics
from rest_framework.parsers import JSONParser
from .serializers import *


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @csrf_exempt
    def retrieve(self, request, pk=None):
        try:
            if pk == 'mentor':
                pcn = self.request.query_params.get('pcn', None)
                students = Student.objects.filter(mentor_id__pcn=pcn)
            elif pk == 'course':
                pcn = self.request.query_params.get('pcn', None)
                course_id = self.request.query_params.get('course_id', None)
                students = Student.objects.filter(class_id__semester_id__courses__course_id=course_id,
                                                  class_id__semester_id__courses__teacher_id__pcn=pcn)
            else:
                return HttpResponse(status=420)
        except ValueError:
            return HttpResponse(status=420)

        serializer = StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)

    @csrf_exempt
    def create(self, request, *args, **kwargs):
        if request.method == "POST":
            stream = io.BytesIO(request.body)
            data = JSONParser().parse(stream)

            fhict_class = Class.objects.filter(name=data["class_name"]).get()
            data.pop("class_name")
            data["class_id_id"] = fhict_class.id

            serializer = StudentSerializer(data=data)
            if serializer.is_valid():
                serializer.save(mentor_id_id=data["mentor_id_id"], class_id_id=fhict_class.id)
                response = JsonResponse(serializer.data, safe=False)
                response["Access-Control-Allow-Origin"] = "*"

            else:
                print(serializer.errors)
                existing_student = StudentSerializer(Student.objects.get(student_number=data["student_number"]))
                response = JsonResponse(existing_student.data, safe=False)

            return response


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @csrf_exempt
    def retrieve(self, request, pk=None):
        try:
            if pk == 'teacher':
                pcn = self.request.query_params.get('pcn', None)
                courses = Course.objects.filter(coursesemesterteacher__teacher_id__pcn=pcn)
            elif pk == 'semester':
                semester_id = self.request.query_params.get('id', None)
                courses = Course.objects.filter(coursesemesterteacher__semester_id__id=semester_id)
            else:
                return HttpResponse(status=420)
        except ValueError:
            return HttpResponse(status=420)

        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)


class RequirementViewSet(viewsets.ModelViewSet):
    queryset = Requirement.objects.all()
    serializer_class = RequirementsSerializer

    @csrf_exempt
    def retrieve(self, request, pk=None):
        try:
            if pk == 'course':
                course_id = self.request.query_params.get('id', None)
                requirements = Requirement.objects.filter(course_id=course_id)
            elif pk == 'semester':
                semester_id = self.request.query_params.get('id', None)
                requirements = Requirement.objects.filter(semester_id=semester_id)
            else:
                return HttpResponse(status=420)
        except ValueError:
            return HttpResponse(status=420)

        page = self.paginate_queryset(requirements)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(requirements, many=True)
        return JsonResponse(serializer.data, safe=False)


class TreeViewSet(viewsets.GenericViewSet):
    serializer_class = TreeSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    @csrf_exempt
    def list(self, request):
        pcn = self.request.query_params.get('pcn', None)
        student = Student.objects.get(pcn=pcn)
        if student:
            passed_semesters = Semester.objects.filter(passedsemester__student_id=student.student_number) \
                .order_by('index')
            last_semester = passed_semesters.last()
            if last_semester:
                future_semesters = Semester.objects.filter(start_date__gt=last_semester.start_date,
                                                           index__gt=last_semester.index)
                passed_serializer = self.get_serializer(passed_semesters, many=True)
                future_serializer = self.get_serializer(future_semesters, many=True)
                return JsonResponse({
                    'passed_semesters': passed_serializer.data,
                    'future_semesters': future_serializer.data,
                })
        return HttpResponse(status=420)


class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def get_student_request(self, id):
        try:
            student = Student.objects.filter(pcn__contains=id).get()
            query = Request.objects.filter(sender_id__exact=student.student_number)
            if query is not None:
                query_json = RequestSerializer(query, many=True)
                return JsonResponse(query_json.data, safe=False)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    def get_student_request_count(self, id):
        try:
            student = Student.objects.filter(pcn__contains=id).get()
            query = Request.objects.filter(sender_id__exact=student.student_number)
            if query is not None:
                return query.count()
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    def get_mentor_request(self, id):
        try:
            teacher = Teacher.objects.filter(pcn__contains=id).get()
            query = Request.objects.filter(receiver_id__exact=teacher)
            if query is not None:
                query_json = RequestSerializer(query, many=True)
                return JsonResponse(query_json.data, safe=False)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    # def get_mentor_request_count(self):
    #     try:
    #         teacher = Teacher.objects.filter(pcn__contains=id).get()
    #         query = Request.objects.filter(receiver_id=teacher)
    #         if query is not None:
    #             return query.count()
    #         else:
    #             HttpResponse(status=404)
    #     except ValueError:
    #         HttpResponse(status=404)

    def get_exam_board_request(self):
        try:
            query = Request.objects.filter(approved_mentor=1)
            if query is not None:
                query_json = RequestSerializer(query, many=True)
                return JsonResponse(query_json.data, safe=False)
            else:
                HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    # def get_exam_board_request_count(self):
    #     try:
    #         query = Request.objects.filter(approved_mentor=1)
    #         if query is not None:
    #             return query.count()
    #         else:
    #             HttpResponse(status=404)
    #     except ValueError:
    #         HttpResponse(status=404)

    def approve_request_mentor(self, id):
        try:
            request = Request.objects.filter(id__exact=id).get()
            if request is not None:
                request.approved_mentor = 1
                if request.approved_mentor is 1:
                    request.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=404)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    def approve_request_exam_board(self, id):
        try:
            request = Request.objects.filter(id__exact=id).get()
            if request is not None:
                request.approved_examboard = 1
                if request.approved_examboard is 1:
                    request.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=404)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    def reject_request_mentor(self, id):
        try:
            request = Request.objects.filter(id__exact=id).get()
            if request is not None:
                request.approved_mentor = -1
                if request.approved_mentor is -1:
                    request.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=404)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)

    def reject_request_exam_board(self, id):
        try:
            request = Request.objects.filter(id__exact=id).get()
            if request is not None:
                request.approved_examboard = -1
                if request.approved_examboard is -1:
                    request.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=404)
            else:
                return HttpResponse(status=404)
        except ValueError:
            HttpResponse(status=404)


@csrf_exempt
def get_grades(request, modeltype, identifier):
    try:
        if modeltype == 'student':
            grades = Grade.objects.filter(student_id__pcn=identifier)
        elif modeltype == 'course':
            grades = Grade.objects.filter(course_id=identifier)
        else:
            return HttpResponse(status=404)
    except ValueError:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = GradeSerializer(grades, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def post_teacher(request):
    if request.method == "POST":
        stream = io.BytesIO(request.body)
        data = JSONParser().parse(stream)

        print(data)
        serializer = TeacherSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = JsonResponse(serializer.data, safe=False)
            response["Access-Control-Allow-Origin"] = "*"
        else:
            print(serializer.errors)
            existing_teacher = TeacherSerializer(Teacher.objects.get(id=data["id"]))
            response = JsonResponse(existing_teacher.data, safe=False)

        return response

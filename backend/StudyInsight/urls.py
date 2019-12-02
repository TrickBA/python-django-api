from django.urls import include, path
from rest_framework import routers
from StudyInsight import views

router = routers.DefaultRouter()
router.register(r'classes', views.ClassViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'semesters', views.SemesterViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'requirements', views.RequirementViewSet)
router.register(r'requests', views.RequestViewSet)
router.register(r'tree', views.TreeViewSet, basename='tree')

urlpatterns = [
    path('', include(router.urls)),
    path('grades/<str:modeltype>/<str:identifier>', views.get_grades),
    path('requests/student/<int:id>/', views.RequestViewSet.get_student_request),
    path('requests/student/<int:id>/count/', views.RequestViewSet.get_student_request_count),
    path('requests/mentor/<int:id>/', views.RequestViewSet.get_mentor_request),
    # path('requests/mentor/<int:id>/count/', views.RequestViewSet.get_mentor_request_count),
    path('requests/mentor/<int:id>/approve/', views.RequestViewSet.approve_request_mentor),
    path('requests/mentor/<int:id>/reject/', views.RequestViewSet.reject_request_mentor),
    path('requests/examboard/all/', views.RequestViewSet.get_exam_board_request),
    # path('requests/examboard/<int:id>/count/', views.RequestViewSet.get_exam_board_request_count),
    path('requests/examboard/<int:id>/approve/', views.RequestViewSet.approve_request_exam_board),
    path('requests/examboard/<int:id>/reject/', views.RequestViewSet.reject_request_exam_board),
    path('teachers/add/', views.post_teacher),
]

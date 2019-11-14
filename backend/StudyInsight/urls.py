from django.urls import path
from StudyInsight import views


urlpatterns = [
    path('<str:modeltype>/', views.get_list),
    path('<str:modeltype>/<str:pk>/', views.get_detail),
    path('grades/<str:modeltype>/<str:identifier>', views.get_grades),
    path('students/<str:modeltype>/<str:identifier>', views.get_students),
    path('courses/<str:modeltype>/<str:identifier>', views.get_courses)
]

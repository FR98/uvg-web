"""babiesManagerDjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf.urls import url, include
from rest_framework import routers
# from rest_framework_jwt.views import (
#     obtain_jwt_token,
#     refresh_jwt_token
# )

from parents.views import ParentViewSet
from babies.views import BabyViewSet
from events.views import EventViewSet


router = routers.DefaultRouter()
router.register(r'parents', ParentViewSet)
router.register(r'babies', BabyViewSet)
router.register(r'events', EventViewSet)

# elapp.com/babies
# elapp.com/api/v1/babies
# elapp.com/parents
# elapp.com/api/v1/parents

urlpatterns = [
    url('admin/', admin.site.urls),
    # url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/', include(router.urls)),
    # url(r'^api/v1/token-auth/', obtain_jwt_token),
    # url(r'^api/v1/token-refresh/', refresh_jwt_token),
]

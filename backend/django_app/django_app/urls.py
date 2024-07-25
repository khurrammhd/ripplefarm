from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django_app.views import RegisterView

urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("api/token/", TokenObtainPairView.as_view(), name="obtain_token"),
        path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
        path("api/register/", RegisterView.as_view(), name="register"),
        path("api/courses/", include("courses.urls")),
        path("api/chatbot/", include("chatbot.urls")),
        path("api/food-pricing/", include("food_pricing.urls")),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)

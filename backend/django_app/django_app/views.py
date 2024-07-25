from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED

from django_app.serializers import UserSerializer


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        User.objects.create_user(
            username=request.data["username"],
            email=request.data.get("email", ""),
            password=request.data["password"],
        )
        return Response("ok", status=HTTP_201_CREATED)

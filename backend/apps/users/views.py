from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.core.mail import send_mail
from .models import User, BuyerProfile, SellerProfile
from .serializers import (
    LoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    PasswordChangeSerializer,
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

User = get_user_model()

class UserRegistrationViewSet(viewsets.ModelViewSet):
    """ViewSet for user registration."""
    
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class UserDetailViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for retrieving user details."""
    
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
class PasswordChangeViewSet(viewsets.ViewSet):  
    """ViewSet for changing user password."""
    
    serializer_class = PasswordChangeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'old_password': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)

class PasswordResetRequestViewSet(viewsets.ViewSet):
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"
            send_mail(
                subject='Password Reset Request',
                message=f'Click the link to reset your password:\n{reset_url}',
                from_email='no-reply@farmket.com',
                recipient_list=[email],
                fail_silently=False,
            )

        except User.DoesNotExist:
            pass  # Prevent email enumeration

        return Response(
            {'detail': 'If an account with that email exists, a password reset link has been sent.'},
            status=status.HTTP_200_OK
        )

class PasswordResetConfirmViewSet(viewsets.ViewSet):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = urlsafe_base64_decode(serializer.validated_data['uid']).decode()
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, serializer.validated_data['token']):
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()

            return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'detail': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginViewSet(viewsets.ViewSet):
    """ViewSet for user login."""
    
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
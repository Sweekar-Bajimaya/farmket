from django.urls import path, include
from .views import UserRegistrationViewSet, UserDetailViewSet, PasswordChangeViewSet, PasswordResetRequestViewSet, PasswordResetConfirmViewSet, LoginViewSet

urlpatterns = [
    path('register/', UserRegistrationViewSet.as_view({'post': 'create'}), name='user-register'),
    path('me/', UserDetailViewSet.as_view({'get': 'retrieve'}), name='user-detail'),
    path('change-password/', PasswordChangeViewSet.as_view({'put': 'update'}), name='change-password'),
    path('password-reset/', PasswordResetRequestViewSet.as_view({'post': 'create'}), name='password-reset'),
    path('password-reset-confirm/', PasswordResetConfirmViewSet.as_view({'post': 'create'}), name='password-reset-confirm'),
    path('login/', LoginViewSet.as_view({'post': 'create'}), name='user-login'),
]

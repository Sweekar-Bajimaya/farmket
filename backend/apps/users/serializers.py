from rest_framework import serializers
from .models import User, BuyerProfile, SellerProfile
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    business_name = serializers.CharField(write_only=True, required=False)
    business_description = serializers.CharField(write_only=True, required=False)
    token = serializers.SerializerMethodField(read_only=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'token',
            'email',
            'first_name',
            'last_name',
            'password',
            'user_type',
            'business_name',
            'business_description',
        ]

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            user_type=validated_data['user_type']
        )
        
        if user.user_type == 'seller':
            SellerProfile.objects.create(
                user=user,
                business_name=validated_data.get('business_name', ''),
                business_description=validated_data.get('business_description', '')
            )
        elif user.user_type == 'buyer':
            BuyerProfile.objects.create(user=user)
        return user
    
class UserSerializer(serializers.ModelSerializer):
    """Serializer for user details."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'user_type', 'is_active', 'is_verified']
        
class PasswordChangeSerializer(serializers.Serializer):
    """Serializer for changing user password."""
    
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    
class PasswordResetSerializer(serializers.Serializer):
    """Serializer for resetting user password."""
    
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for confirming password reset."""
    
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid login credentials")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")
        refresh = RefreshToken.for_user(user)
        data['token'] = str(refresh.access_token)     
        data['user'] = user
        return data
    

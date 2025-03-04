# views.py

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from .models import Enquiry, Technician, Complaint, UserProfile
from .serializers import (
    RegisterSerializer, TokenObtainPairSerializer, EnquirySerializer,
    TechnicianSerializer, ComplaintSerializer, UserProfileSerializer
)
from .logging import log_user_action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

User = get_user_model()

# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
        
#         if serializer.is_valid():
#             user = serializer.save()

#             # Generate JWT tokens
#             refresh = RefreshToken.for_user(user)
#             access = refresh.access_token

#             # Log user action (assuming you have a logging function)
#             # log_user_action(user, "REGISTER", "UserProfile", "New user registered")

#             return Response({
#                 "user": serializer.data,
#                 "refresh": str(refresh),
#                 "access": str(access),
#             }, status=status.HTTP_201_CREATED)

#         # Log failure (assuming you have a logging function)
#         # log_user_action(request.user, "REGISTER_FAIL", "UserProfile", "User registration failed")

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            log_user_action(request.user, "TOKEN_OBTAIN", "UserProfile", "Token obtained successfully")
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        log_user_action(request.user, "TOKEN_OBTAIN_FAIL", "UserProfile", "Token obtain failed")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Enquiry CRUD
class EnquiryCreateView(generics.CreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        enquiry = serializer.save()
        log_user_action(self.request.user, "CREATE", "Enquiry", f"Created Enquiry ID: {enquiry.id}")

class EnquiryRetrieveView(generics.ListAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        log_user_action(request.user, "RETRIEVE", "Enquiry", "Retrieved list of enquiries")
        return response

# Technician Create View
class TechnicianCreateView(generics.CreateAPIView):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        technician = serializer.save()
        log_user_action(self.request.user, "CREATE", "Technician", f"Created Technician ID: {technician.id}")

# Complaint Views
class ComplaintCreateView(generics.CreateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        complaint = serializer.save()
        log_user_action(self.request.user, "CREATE", "Complaint", f"Created Complaint ID: {complaint.id}")

class ComplaintListView(generics.ListAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        log_user_action(request.user, "RETRIEVE", "Complaint", "Retrieved list of complaints")
        return response

class ComplaintRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        complaint = serializer.save()
        log_user_action(self.request.user, "UPDATE", "Complaint", f"Updated Complaint ID: {complaint.id}")

# UserProfile Views
class UserProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user_profile = serializer.save()
        log_user_action(self.request.user, "CREATE", "UserProfile", f"Created UserProfile ID: {user_profile.id}")

class UserProfileView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        log_user_action(request.user, "RETRIEVE", "UserProfile", "Retrieved list of user profiles")
        return response

# Counts API
@api_view(['GET'])
def get_counts(request):
    permission_classes = [AllowAny]
    complaint_count = Complaint.objects.count()
    enquiry_count = Enquiry.objects.count()
    users_count = UserProfile.objects.count()
    resolved_count = Complaint.objects.filter(status='Resolved').count()
    open_count = Complaint.objects.filter(status="Open").count()
    inProgress_count = Complaint.objects.filter(status="in-progress").count()

    log_user_action(request.user, "RETRIEVE_COUNTS", "Counts", "Retrieved counts of complaints, enquiries, and users")
    data = {
        'complaint_count': complaint_count,
        'enquiry_count': enquiry_count,
        'users_count': users_count,
        'resolved_count':resolved_count,
        'open_count':open_count,
        'inProgress_count':inProgress_count
    }
    
    return Response(data)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import update_last_login
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, LoginSerializer, CustomUserSerializer, LogoutSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": CustomUserSerializer(user).data,
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                login(request, user)  # Set session
                update_last_login(None, user)  # Update last login timestamp
                return Response({
                    "user": CustomUserSerializer(user).data,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                }, status=status.HTTP_200_OK)
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            try:
                refresh_token = serializer.validated_data["refresh_token"]
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
                logout(request)  # End session
                return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"detail": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


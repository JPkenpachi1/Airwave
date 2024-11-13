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

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # log_user_action(user, "REGISTER", "UserProfile", "New user registered")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # log_user_action(request.user, "REGISTER_FAIL", "UserProfile", "User registration failed")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    complaint_count = Complaint.objects.count()
    enquiry_count = Enquiry.objects.count()
    users_count = UserProfile.objects.count()
    log_user_action(request.user, "RETRIEVE_COUNTS", "Counts", "Retrieved counts of complaints, enquiries, and users")
    data = {
        'complaint_count': complaint_count,
        'enquiry_count': enquiry_count,
        'users_count': users_count
    }
    return Response(data)

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework.permissions import AllowAny
from django.contrib.auth import login, logout, get_user_model
from .logging import log_user_action

User = get_user_model()

class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Delegate to TokenObtainPairView to handle token generation
        response = TokenObtainPairView.as_view()(request._request)

        if response.status_code == 200:
            # Retrieve tokens
            data = response.data
            access_token = data.get("access")
            refresh_token = data.get("refresh")

            # Decode the access token using AccessToken class to retrieve user_id
            access_token_obj = AccessToken(access_token)
            user_id = access_token_obj["user_id"]
            user = User.objects.get(id=user_id)

            # Log in the user with Django session handling
            login(request, user)

            # Log the login action
            log_user_action(user, "LOGIN", "UserProfile", f"User {user.email} logged in successfully")

            # Include session ID in the response
            response.data["session_id"] = request.session.session_key
            return Response(response.data, status=status.HTTP_200_OK)
        else:
            # Log failed login attempt
            log_user_action(None, "LOGIN_FAIL", "UserProfile", "User login failed")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    def post(self, request):
        try:
            # Retrieve the refresh token and user email before logging out
            refresh_token = request.data.get("refresh_token")
            user_email = request.user.email if request.user.is_authenticated else "Anonymous"
            
            # Blacklist the refresh token to invalidate it
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            # End the Django session
            logout(request)
            
            # Log the logout action with the user email
            log_user_action(request.user, "LOGOUT", "UserProfile", f"User {user_email} logged out successfully")
            
            return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            user_email = request.user.email if request.user.is_authenticated else "Anonymous"
            log_user_action(request.user, "LOGOUT_FAIL", "UserProfile", f"Logout failed for user {user_email}")
            
            return Response({"detail": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)

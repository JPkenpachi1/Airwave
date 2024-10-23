from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, TokenObtainPairSerializer
from rest_framework import generics
from .models import Enquiry
from .serializers import EnquirySerializer
from rest_framework.permissions import IsAuthenticated
from .models import Technician, Complaint,UserProfile
from .serializers import TechnicianSerializer, ComplaintSerializer
from .serializers import UserProfileSerializer 
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Enquiry CRUD
class EnquiryCreateView(generics.CreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAuthenticated]

class EnquiryRetrieveView(generics.ListAPIView):
    queryset=Enquiry.objects.all()
    serializer_class=EnquirySerializer




# Create View for Technician
class TechnicianCreateView(generics.CreateAPIView):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer
    permission_classes = [IsAuthenticated]  # Assuming you are using JWT or other authentication

# Create View for Complaint
class ComplaintCreateView(generics.CreateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

# You can also add list views, retrieve views, and update views
class ComplaintListView(generics.ListAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

class ComplaintRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

 # Assume you create a serializer for UserProfile

class UserProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated if you want to restrict access

class UserProfileView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes=[IsAuthenticated]


from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Complaint, Enquiry

@api_view(['GET'])
def get_counts(request):
    complaint_count = Complaint.objects.count()
    enquiry_count = Enquiry.objects.count()
    users_count = UserProfile.objects.count()
    # Add more counts as needed

    data = {
        'complaint_count': complaint_count,
        'enquiry_count': enquiry_count,
        'users_count':users_count
        # Include more counts in the response
    }
    return Response(data)

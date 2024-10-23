from django.urls import path
from .views import RegisterView, TokenObtainPairView,EnquiryCreateView,EnquiryRetrieveView,TechnicianCreateView, ComplaintCreateView, ComplaintListView, ComplaintRetrieveUpdateView,UserProfileCreateView,UserProfileView,get_counts
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('enquiries/',EnquiryCreateView.as_view(),name ="Enquires"),
    path('getenquiry/',EnquiryRetrieveView.as_view(), name ="get all the Enquires"),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
       path('technician/create/', TechnicianCreateView.as_view(), name='technician-create'),
    path('complaint/create/', ComplaintCreateView.as_view(), name='complaint-create'),
    path('complaints/', ComplaintListView.as_view(), name='complaint-list'),
    path('complaint/<int:id>/', ComplaintRetrieveUpdateView.as_view(), name='complaint-retrieve-update'), 
     path('user-profile/create', UserProfileCreateView.as_view(), name='user-profile-create'), # Add this line
     path('user-profiles/', UserProfileView.as_view(), name='user-profile list'),
     path('counts/',get_counts,name="get_counts")
]

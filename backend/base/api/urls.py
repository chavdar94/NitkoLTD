from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import MyTokenObtainPairView, getRoutes, UserDetails, UserCreate, LoginView
from accounts.views import ProfileDetailsUpdateView


urlpatterns = (
    path('', getRoutes),
    path('fields/', include('fields.urls')),
    path('workers/', include('workers.urls')),
    path('jobs/', include('jobs.urls')),
    path('users/', include([
        path('<int:pk>/', UserDetails.as_view(), name='users'),
    ])),
    path('profile/', include([
        path('', ProfileDetailsUpdateView.as_view(), name='profile'),
        path('<int:pk>/', ProfileDetailsUpdateView.as_view(),
         name='profile-delete'),
    ])),

    path('auth/', include([
        path('register/', UserCreate.as_view(), name='register'),
    ])),

    path('login/', LoginView.as_view(), name='login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
)

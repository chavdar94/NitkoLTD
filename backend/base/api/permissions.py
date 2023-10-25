from rest_framework import permissions


class IsAdminUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user and request.user.is_staff
        return True

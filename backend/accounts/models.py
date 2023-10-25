from django.db import models
from django.contrib.auth import models as auth_models
from django.utils import timezone
from django.utils.translation import gettext as _

from .managers import AppUserManager


class AppUser(auth_models.AbstractBaseUser, auth_models.PermissionsMixin):
    username = models.CharField(
        max_length=50,
        unique=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )
    is_active = models.BooleanField(
        default=True,
    )
    date_joined = models.DateTimeField(default=timezone.now)

    groups = models.ManyToManyField(
        auth_models.Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='appuser_set_groups',  # Unique name for groups
    )

    user_permissions = models.ManyToManyField(
        auth_models.Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='appuser_set_permissions',  # Unique name for user_permissions
    )

    USERNAME_FIELD = 'username'

    objects = AppUserManager()

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['pk']


class Profile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

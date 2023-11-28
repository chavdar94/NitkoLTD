from django.db.models.signals import pre_delete
from django.dispatch import receiver
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()


@receiver(pre_delete, sender=User)
def user_pre_delete(sender, instance, **kwargs):
    refresh_token = RefreshToken.for_user(instance)
    refresh_token.blacklist()

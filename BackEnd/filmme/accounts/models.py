from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# 헬퍼 클래스
class UserManager(BaseUserManager):
    def create_user(self, email, nickName):
        
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=email,
            nickName = nickName
        )
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password):
        superuser = self.create_user(
            email=email,
            nickName='tempNickName'
        )
        
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        
        superuser.save(using=self._db)
        return superuser

    def delete(self, email):
        try:
            user = self.get(email=email)
            user.delete()
            return True
        except self.model.DoesNotExist:
            raise ValueError("User with the given email does not exist")   

    def update_user(self, email, **kwargs):
        try:
            user = self.get(email=email)
            for key, value in kwargs.items():
                setattr(user, key, value)
            user.save(using=self._db)
            return user
        except self.model.DoesNotExist:
            raise ValueError("User with the given email does not exist")   
    

# AbstractBaseUser를 상속해서 유저 커스텀
class User(AbstractBaseUser, PermissionsMixin):
    
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, null=False, blank=False)
    nickName = models.CharField(max_length=20, default=" ", null = False, blank=False)
    posts = models.TextField(null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    likePosts = models.TextField(null=True, blank=True)
    
    #필요한 데이터필드 추가

    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

	# 헬퍼 클래스 사용
    objects = UserManager()

	# 사용자의 username field는 email으로 설정 (이메일로 로그인)
    USERNAME_FIELD = 'email'

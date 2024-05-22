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
    
    def create_superuser(self, email):
        superuser = self.create_user(
            email=email
        )
        
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        
        superuser.save(using=self._db)
        return superuser

    def delete(self, email):
        user = self.get(email=email)
        user.delete()
        return True
    
    def update_user(self, email, **kwargs):
        """
        email을 기반으로 사용자를 검색하고 제공된 키워드 인자들로 사용자의 정보를 업데이트합니다.
        
        Args:
        - email (str): 업데이트할 사용자의 이메일 주소.
        - kwargs (dict): 업데이트할 사용자 정보 키워드 인자들.
        
        Returns:
        - user: 업데이트된 사용자 객체.
        """
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
    email = models.EmailField(max_length=50, unique=True, null=False, blank=False)
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

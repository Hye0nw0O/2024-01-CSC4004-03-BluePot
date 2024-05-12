from rest_framework.pagination import PageNumberPagination

class CommunityPagination(PageNumberPagination):
    page_size = 12 # 게시물 12개씩 자르겠다는 의미 = 한 페이지에 12개만 뜨게, 나머진 페이지 이동

class CommunityCommentPagination(PageNumberPagination):
    page_size = 10 # 댓글이 한 페이지에 10개만 뜨도록 설정
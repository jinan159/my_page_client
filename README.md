![header](https://capsule-render.vercel.app/api?type=cylinder&color=gradient&height=120&section=header&text=My%20Page&fontSize=40)

# \# 개발 환경
<!-- 
#### ~~0. Dockerfile 빌드~~
```
# 프로젝트 root 디렉토리에서
docker build --tag my_node:x.x.x .
```
 -->
#### 1. 컨테이너 실행
```
docker run -d -it \
       -p 8080:8080 \
       -v /Users/jwkim/DockerShare/my_page_client/:/app \
       --name my_page_client my_page_client:x.x.x
```

#### 2. 컨테이너 접속
```
docker exec -it my_page_client /bin/bash
```

#### 3. 필요한 의존성 설치
```
npm install
```

#### 4. 프로젝트 실행
```
npm run serve
```

---
#\# Vue.js

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

---

### Layout Design
[https://ovenapp.io/view/2F79xTMUhFRyT7GqWeK6SryBFpr6zHS8/FEeXP](https://ovenapp.io/view/2F79xTMUhFRyT7GqWeK6SryBFpr6zHS8/FEeXP)
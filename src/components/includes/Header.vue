<template>
  <div>
    <!-- 헤더(navbar) min-width 992px -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Page</a>
            <!-- 반응형 메뉴 버튼(min-width 992px) -->
            <div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search nav">
                    <i class="bi bi-search"></i>
                </button>
                <button class="navbar-toggler left-margin-menu-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle menu nav">
                    <i class="bi bi-list"></i>
                </button>
            </div>
            <!-- 메뉴 -->
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav">
                    <!-- <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li> -->
                    <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Posts</a>
                    </li>
                    <!-- <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> -->
                </ul>
            </div>
            <!-- 검색 -->
            <div class="collapse navbar-collapse" id="navbarSearch">
                <ul class="navbar-nav">
                    <hr>
                    <!-- 조회기간 -->
                    <li class="nav-item">
                        <div class="row" style="color: white;">
                            <!-- 조회기간 icon -->
                            <div class="col-1 search-form">
                                <i class="bi bi-calendar-range search-icon"></i>
                            </div>
                            <!-- 시작일 -->
                            <div class="col-5 search-form">
                                <input type="date" class="search-item" id="inputStartDate">
                            </div>
                            <div class="col-1" style="padding: 0 5px 0 0;">
                                <span> ~ </span>
                            </div>
                            <!-- 종료일 -->
                            <div class="col-5 search-form" style="padding-left: 5px;">
                                <input type="date" class="search-item" id="inputEndDate">
                            </div>
                        </div>
                    </li>
                    <hr>
                    <!-- 조회 옵션 -->
                    <li class="nav-item left-margin">
                        <div class="row" style="color: white;">
                            <!-- 정렬순서 icon -->
                            <div class="col-1 search-form">
                                <i class="bi bi-sort-numeric-up search-icon" id="sort-asc" style="display: none;"></i>
                                <i class="bi bi-sort-numeric-down search-icon" id="sort-desc"></i>
                            </div>
                            <!-- 정렬 순서 -->
                            <div class="col-5 search-form">
                                <select class="form-select search-item" v-on:change="changeIcon">
                                    <option value="desc" selected>최신순</option>
                                    <option value="asc">오래된순</option>
                                </select>
                            </div>
                            <!-- 조회 개수 icon -->
                            <div class="col-1 search-form">
                                <i class="bi bi-list-ol search-icon"></i>
                            </div>
                            <!-- 조회 개수 -->
                            <div class="col-5 search-form">
                                <select class="form-select search-item">
                                    <option value="5">5개씩</option>
                                    <option value="10">10개씩</option>
                                    <option value="20">20개씩</option>
                                    <option>전체보기</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <hr>
                    <!-- 검색 버튼 -->
                    <li class="nav-item left-margin">
                        <button type="button" class="btn btn-light" style="width: 100%; height: 30px; padding-top:3px;" v-on:click="changeIcon">검색</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    msg: String
  },
  methods: {
      changeIcon: function(event) {
          var elem = event.target;

          if (elem.value == 'desc') {
              document.getElementById('sort-asc').style.display="none";
              document.getElementById('sort-desc').style.display="inline";
          } else {
              document.getElementById('sort-asc').style.display="inline";
              document.getElementById('sort-desc').style.display="none";
          }
      }
  }
}
</script>

<style>
.navbar-nav hr {
    color: white;
}

.col-1.search-form {
    padding: 0;
}

.col-5.search-form {
    padding-left: 5px;
}

.search-item {
    display: inline-block;
    width: 100%;
    height: 30px;
    padding-top:3px;
}

.search-icon {
    font-size: 20px;
}

.left-margin {
    margin-left: 0px;
}

.left-margin-menu-button {
    margin-left: 10px;
}
@media (min-width: 992px) {
    .left-margin {
        margin-left: 50px;
    }

    .left-margin-menu-button {
        margin-left: 0px;
    }
}
</style>
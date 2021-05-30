<template>
  <div>
      <!-- header(navbar) -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Page</a>
            <div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-search"></i>
                </button>
                <button class="navbar-toggler left-margin-menu-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-list"></i>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
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
            <div class="collapse navbar-collapse" id="navbarSearch">
            <ul class="navbar-nav">
                <hr>
                <li class="nav-item">
                    <div class="row" style="color: white;">
                        <div class="col-2" style="padding: 0;">
                            <i class="bi bi-calendar-range" style="font-size: 20px;"></i>
                        </div>
                        <div class="col-5" style="padding-left: 0;">
                            <input type="date" class="search-item" id="inputStartDate" style="width: 100%;">
                        </div>
                        <div class="col-5" style="padding-left: 0;">
                            <input type="date" class="search-item" id="inputEndDate" style="width: 100%;">
                        </div>
                    </div>
                </li>
                <hr>
                <li class="nav-item left-margin">
                    <div class="row" style="color: white;">
                        <div class="col-1" style="padding: 0;">
                            <i class="bi bi-sort-numeric-up" id="sort-desc" style="font-size: 20px;"></i>
                            <i class="bi bi-sort-numeric-down" id="sort-asc" style="font-size: 20px; display: none;"></i>
                        </div>
                        <div class="col-5" style="padding-left: 0;">
                            <select class="form-select search-item" style="width: 100%;" v-on:change="changeIcon">
                                <option value="desc" selected>최신순</option>
                                <option value="asc">오래된순</option>
                            </select>
                        </div>
                        <div class="col-1" style="padding: 0;">
                            <i class="bi bi-list-ol" style="font-size: 20px;"></i>
                        </div>
                        <div class="col-5" style="padding-left: 0;">
                            <select class="form-select search-item" style="width: 100%;">
                                <option value="5">5개씩</option>
                                <option value="10">10개씩</option>
                                <option value="20">20개씩</option>
                                <option>전체보기</option>
                            </select>
                        </div>
                    </div>
                </li>
                <hr>
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
  name: 'header',
  props: {
    msg: String
  },
  methods: {
      changeIcon: function(event) {
          var elem = event.target;

          if (elem.value == 'desc') {
              document.getElementById('sort-desc').style.display="inline-box";
              document.getElementById('sort-asc').style.display="none";
          } else {
              document.getElementById('sort-asc').style.display="inline-box";
              document.getElementById('sort-desc').style.display="none";
          }
      }
  }
}
</script>

<style>
.navbar-nav > hr {
    color: white;
}

.search-item {
    display: inline-block;
    width: 40%;
    height: 30px;
    padding-top:3px;
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
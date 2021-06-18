<template>
  <div>
    <!-- 헤더(navbar) min-width 992px -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Page</a>
            <!-- 반응형 메뉴 버튼(min-width 992px) -->
            <div>
                <button class="navbar-toggler left-margin-menu-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle menu nav">
                    <i class="bi bi-list"></i>
                </button>
            </div>
            <!-- 메뉴 -->
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Posts</router-link>
                    </li>
                    <!-- <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> -->
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
    data() {
        return {

        }
    },
}
</script>

<style>

</style>
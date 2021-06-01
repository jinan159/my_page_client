<template>
  <div>
    <form class="login-form login-form-left">
      <div class="login-form-center">
        <h2>LOGIN</h2>
      </div>      
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">ID</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="row">
          <dir class="col login-form-left">
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">자동 로그인</label>
            </div>
          </dir>
          <dir class="col login-form-right">
            <button type="submit" class="btn btn-primary">로그인</button>
          </dir>
        </div>
      </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.login-form {
  border: 1px solid rgb(200, 200, 200);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 15px;
  margin-top: -112px;
  margin-left: -170px;
  width: 340px;
  height: 280px;
  text-align: left;
}

.login-form-center {
  text-align: center;
}

.login-form-left {
  text-align: left;
}

.login-form-right {
  text-align: right;
}
</style>
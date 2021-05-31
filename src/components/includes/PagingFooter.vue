<template>
  <div>
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
              <li class="page-item" id="page-prev-button">
                <a class="page-link" href="#">Prev</a>
              </li>
              <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li> -->
              <li class="page-item" v-for="index in pageCount" :key="index">
                <a class="page-link current" href="#" v-if="index == pageCurrent">{{index}}</a>
                <a class="page-link" href="#" v-else>{{index}}</a>
              </li>
              <li class="page-item" id="page-next-button">
                <a class="page-link" href="#">Next</a>
              </li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'paging-footer',
    props: {
      // 총 항목 수
      total: {
        type:Number,
        required: true,
        validator: function(val) {
          return val >= 0;
        }
      },
      // 페이지당 항목 개수
      count: { 
        type:Number,
        required: true,
        validator: function(val) {
          return val >= 0;
        }
      },
      // 현재 페이지
      current: {
        type:Number,
        required: true,
        validator: function(val) {
          return val >= 0;
        }
      }
    },
    data() {  
      return {
        pageCount: 0,         // 페이지 개수
        pageCurrent: 0,       // 현재 페이지 번호
        pagePrevButton: null, // Prev 버튼
        pageNextButton: null, // Next 버튼
      }
    },
    methods: {
      
    },
    watch: {
      // 현재 페이지에 따라 prev, next, pageCurrent 조정
      pageCurrent(nextPage) {
        // 현재 페이지에 따라, prev next 비활성화
        if (this.pageCount > 0 && nextPage == 1) {
          this.pagePrevButton.classList.add("disabled");
          this.pageNextButton.classList.remove("disabled");
        } else if (this.pageCount > 1 && nextPage == this.pageCount) {
          this.pagePrevButton.classList.remove("disabled");
          this.pageNextButton.classList.add("disabled");
        } else {
          this.pagePrevButton.classList.remove("disabled");
          this.pageNextButton.classList.remove("disabled");
        }

        // 페이지 수 제한
        if (nextPage < 1) this.pageCurrent = 1;
        else if (nextPage > this.pageCount) this.pageCurrent = this.pageCount;
      }
    },
    mounted() {
      /* 페이지 개수 계산 */
      this.pageCount = Number.parseInt(this.total / this.count);
      if ((this.total % this.count) != 0) this.pageCount += 1;

      this.pagePrevButton = document.getElementById('page-prev-button');
      this.pageNextButton = document.getElementById('page-next-button')

      // props의 데이터 
      this.pageCurrent = this.current;  
    },
}
</script>

<style>
  .current {
    font-weight: bold;
  }
</style>
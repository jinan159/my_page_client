<template>
    <div>
        <div>{{paging.current}} of {{paging.totalCount}}</div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': isPrevDisabled}">
                    <a class="page-link" @click="prevPage()">Prev</a>
                </li>
                <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                <li class="page-item" v-for="index in paging.pageCount" :key="index">
                    <div v-if="index >= paging.minCurrent">
                        <a class="page-link current" @click="searchPage(index)" v-if="index == paging.current">{{index}}</a>
                        <a class="page-link" @click="searchPage(index)" v-else>{{index}}</a>
                    </div>
                </li>
                <li class="page-item" :class="{'disabled': isNextDisabled}">
                    <a class="page-link" @click="nextPage()">Next</a>
                </li>
            </ul>
        </nav>
  </div>
</template>

<script>
export default {
    name: 'paging-footer',
    props: {
        pagingProps: {
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
                return val >= -1;
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
        }
    },
    data() {  
        return {
            paging: {
                totalCount: 0,    // 전체 페이지 개수(실제 전체 페이지 개수)
                count: 1,         // 페이지 개수(표시할 페이지 개수)
                current: 0,       // 현재 페이지 번호
                minCurrent: 1,    // 페이지 최소 번호
            },

            isPrevDisabled: false,
            isNextDisabled: false,
        }
    },
    methods: {
        // 모든 paging 값 계산, setPrevNextButton 호출
        setPage : function(newData) {
            if (newData.total) {
                if (newData.count == -1) {
                    // 전체보기인 경우
                    this.paging.pageCount = 1;
                    this.paging.totalCount = 1;
                } else {
                    // 그외
                    this.paging.totalCount = Number.parseInt(newData.total / newData.count)
                    if ((newData.total % newData.count) != 0) this.paging.totalCount += 1;
                    
                    this.paging.pageCount = (this.paging.totalCount > 6) ? 6 : this.paging.totalCount;
                    this.paging.current = newData.current;
                }

                // props의 데이터 
                this.paging.current = newData.current;

                this.setPrevNextButton();
            }
        },
        setPrevNextButton: function() {
            // 현재 페이지에 따라, prev next 비활성화
            if (this.paging.totalCount == 1 && this.paging.current == 1) {
                // 1페이지만 있는 경우
                this.isPrevDisabled = true;
                this.isNextDisabled = true;
            } else if (this.paging.totalCount > 1 && this.paging.current == 1) {
                // 2페이지 이상 있고, 1페이지인 경우
                this.isPrevDisabled = true;
                this.isNextDisabled = false;
            } else if (this.paging.totalCount > 1 && this.paging.current == this.paging.totalCount) {
                // 2페이지 이상 있고, 마지막 페이지인 경우
                this.isPrevDisabled = false;
                this.isNextDisabled = true;
            } else {
                // 중간 페이지인 경우
                this.isPrevDisabled = false;
                this.isNextDisabled = false;
            }
        },
        nextPage: function() {
            if (this.paging.current < this.paging.pageCount) {
                // 현재 페이지 < 페이지개수
                this.paging.current += 1;
            } else if (this.paging.current == this.paging.pageCount && this.paging.totalCount > this.paging.pageCount) {
                // 현재 페이지 = 페이지개수 && 보여진 페이지 개수 < 실제 페이지 총 개수
                // ex) 총 페이지 개수=10, 현재페이지=6, 1~6  -> 2~7 
                this.paging.minCurrent += 1;
                this.paging.pageCount += 1;
                this.paging.current += 1;
            }

            // 이동한 페이지의 데이터 다시 불러옴
            this.searchPage();
        },
        prevPage: function() {
            if (this.paging.current > this.paging.minCurrent) {
                // 현재 페이지 > 페이지개수
                this.paging.current -= 1;
            } else if (this.paging.current == this.paging.minCurrent && this.paging.minCurrent > 1) {
                // 현재 페이지 = 페이지개수 && 보여진 페이지 개수 < 실제 페이지 총 개수
                // ex) 총 페이지 개수=10, 현재페이지=2, 2~7 -> 1~6
                this.paging.minCurrent -= 1;
                this.paging.pageCount -= 1;
                this.paging.current -= 1;
            }

            // 이동한 페이지의 데이터 다시 불러옴
            this.searchPage();
        },
        searchPage: function(value) {
            if (value) this.paging.current = value;
            
            var start = (this.pagingProps.count * this.paging.current) - this.pagingProps.count; // 조회 파라미터 설정
            this.$emit("pageClick", start);
        }
    },
    watch: {
        pagingProps : {
            deep: true,
            handler(newData) {
                this.setPage(newData);
                this.searchPage();
            }
        },
        // 현재 페이지에 따라 prev, next, paging.current 조정
        paging:{
            deep: true,
            handler(newData) {
                
                // 글 수가 0인 경우 바로 리턴
                if (this.paging.totalCount == 0) return;
                if (typeof(newData.current) == typeof(String)) console.log("true true")

                // 페이지 수 제한
                if (newData.current < 1) this.paging.current = 1;
                else if (newData.current > this.paging.pageCount) this.paging.current = this.paging.pageCount;

                this.setPage(newData);
                this.setPrevNextButton();
            }    
        }
    },
    created() {
        console.log("[PagingFooter] - created()");
        this.setPage(this.pagingProps);
    },
}
</script>

<style>
  .current {
    font-weight: bold;
  }
</style>
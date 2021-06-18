<template>
  <div>
    <div style="margin-top: 20px; padding: 0 10px; width: 100%;">
      <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style="width: 100%;">
        검색 : {{start_date}} ~ {{end_date}}<br>
        {{sort_text}}, {{count}}
      </button>
      <div class="collapse" id="collapseExample" style="margin-top: 5px;">
        <div class="card card-body">
          <ul class="navbar-nav">
            <!-- 조회기간 -->
            <li class="nav-item">
                <div class="row">
                    <!-- 조회기간 icon -->
                    <div class="col-1 search-form">
                        <i class="bi bi-calendar-range search-icon"></i>
                    </div>
                    <!-- 시작일 -->
                    <div class="col-5 search-form">
                        <input type="date" class="search-item" id="inputStartDate" v-model="start_date">
                    </div>
                    <div class="col-1" style="padding: 0 5px 0 0;">
                        <span> ~ </span>
                    </div>
                    <!-- 종료일 -->
                    <div class="col-5 search-form" style="padding-left: 5px;">
                        <input type="date" class="search-item" id="inputEndDate" v-model="end_date">
                    </div>
                </div>
            </li>
            <hr>
            <!-- 조회 옵션 -->
            <li class="nav-item left-margin">
                <div class="row">
                    <!-- 정렬순서 icon -->
                    <div class="col-1 search-form">
                        <i class="bi bi-sort-numeric-up search-icon" :class="{'search-hidden': isSortUpHidden}"></i>
                        <i class="bi bi-sort-numeric-down search-icon" :class="{'search-hidden': isSortDownHidden}"></i>
                    </div>
                    <!-- 정렬 순서 -->
                    <div class="col-5 search-form">
                        <select class="form-select search-item" @change="changeIcon" v-model="sort">
                            <option value="desc">{{sort_desc_text}}</option>
                            <option value="asc">{{sort_asc_text}}</option>
                        </select>
                    </div>
                    <!-- 조회 개수 icon -->
                    <div class="col-1 search-form" >
                        <i class="bi bi-list-ol search-icon"></i>
                    </div>
                    <!-- 조회 개수 -->
                    <div class="col-5 search-form">
                        <select class="form-select search-item" v-model="count">
                            <option value="5">5개씩</option>
                            <option value="10">10개씩</option>
                            <option value="20">20개씩</option>
                            <option value="-1">전체보기</option>
                        </select>
                    </div>
                </div>
            </li>
            <hr>
            <!-- 검색 버튼 -->
            <li class="nav-item left-margin">
                <button type="button" class="btn btn-dark" style="width: 100%; height: 30px; padding-top:3px;" @click="searchPost">검색</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PostCard :postCardProps="postCardProps"/>
    <hr>
    <PagingFooter class="paging-footer" :pagingProps="pagingProps" @pageClick="searchPage($event)"/>
  </div>
</template>

<script>
import PostCard from '../components/Post/PostCard.vue'
import PagingFooter from '../components/includes/PagingFooter.vue'
import utils from '../utils/utils'
import axios from 'axios';

var SORT_DESC_TEXT = "최신순";
var SORT_ASC_TEXT = "오래된순";

export default {
    name: 'postList',
    components: {
        PostCard,
        PagingFooter
    },
    data() {
        return {
            start_date: '',   // 조회 시작일자
            end_date: '',     // 조회 종료일자
            sort: '',         // 정렬 순서
            sort_text: '',    // 정렬 순서 텍스트
            sort_asc_text: '',
            sort_desc_text: '',
            // PagingFooter props
            start: 0,
            count: 0,

            isSortUpHidden: false,      // 정렬 순서 오래된순 hidden 여부(asc)
            isSortDownHidden: false,    // 정렬 순서 최신순 hidden 여부(desc)
            isSearchFormHidden: false,  // 검색 form 및

            //PostCard props
            postCardProps: [],
            pagingProps: {
                total: 0,
                count: 0,
                current: 0
            }
        }
    },
    methods: {
        // 정렬 순서에 따라 아이콘 변경
        changeIcon: function(event) {
            var value = event.target.value;

            if (value == 'asc') {
                this.isSortDownHidden = true;
                this.isSortUpHidden = false;
            } else {
                this.isSortDownHidden = false;
                this.isSortUpHidden = true;
            }
        },
        searchPost: function() {
            var req_params = {
                start: this.start,
                sort: this.sort,
                s_date: this.start_date,
                e_date: this.end_date
            }
            if (this.count != -1) req_params.count = this.count;
            
            axios.get(this.$base_url + '/post',{
                params: req_params
            })
            .then((response) => {
                
                // PagingFooter 초기화
                if (response) {
                    this.postCardProps = response.data.page.result;
                    this.pagingProps.total = response.data.cnt.result[0].count;
                } else {
                    this.pagingProps.total = 0;          // 글 전체 개수
                }

                if (this.pagingProps.current == 0) this.pagingProps.current = 1;
            }).catch((e)=>{
                console.error(e);
            });
        },
        searchPage: function(value) {
            this.start = value;
            this.searchPost();
        }
    },
    watch: {
        // sort 변경 시, sort_text 변경
        sort(value) {
            this.sort_text = (value == 'desc') ? SORT_DESC_TEXT : SORT_ASC_TEXT;
            // this.sort_text = (value == 'desc') ? '최신순' : '오래된순';
        },
        count(value) {
            this.count = Number(value);
            this.pagingProps.count = this.count;
        }
    },
    created() {
        console.log("[PostList] - created()");
        
        this.isSortUpHidden = true; // 오래된순 정렬 아이콘 안보이게

        // 검색 폼 초기화
        this.start_date = utils.dateUtils.getFormattedDateString('YYYY-MM-DD', utils.dateUtils.addDays(new Date(), -30));              // 조회 시작일자
        this.end_date = utils.dateUtils.getFormattedDateString('YYYY-MM-DD', new Date());                  // 조회 종료일자
        this.sort = 'desc';                   // 정렬 순서
        this.sort_asc_text = SORT_ASC_TEXT;   // 정렬 순서(asc) 텍스트
        this.sort_desc_text = SORT_DESC_TEXT; // 정렬 순서(desc) 텍스트
        this.sort_text = '최신순';              // 정렬 순서 텍스트
        this.count = 5;                       // 글 표시 개수
        this.start = 0;

        this.searchPost();
    }
}
</script>

<style>
.navbar-nav hr {
    color: gray;
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

.search-hidden {
    display: none;
}

.paging-footer {
    display: inline-block;
    position: relative;
    left: 0;
    bottom: 15px;
    width: 100%;
    height: 60px;
    padding: 10px 0;
    text-align: center;
}
</style>
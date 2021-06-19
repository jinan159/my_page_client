<template>
    <div>
        <form>
            <div class="write-form">
                <!-- 제목 -->
                <div class="row write-form-label">
                    <div class="col-12"><label>제목</label></div>
                </div>
                <div class="row write-form-row">
                    <div class="col-12 write-form-no-pad">
                        <div class="mb-3">
                            <input v-model="title" type="text" class="form-control" id="title" placeholder="제목을 입력해주세요">
                        </div>
                    </div>
                </div>
                <!-- 일자 설정 label-->
                <div v-if="!isTerm" class="row write-form-label">
                    <div class="col-12 "> <label>일자</label></div>
                </div>
                <!-- 기간 설정 label-->
                <div v-if="isTerm" class="row write-form-label">
                    <div class="col-6"><label>시작일자</label></div>
                    <div class="col-6"><label>종료일자</label></div>
                </div>
                <!-- 일자, 기간 toggle -->
                <div class="row write-form-label">
                    <div class="col-12">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggleTerm" v-model="isTerm">
                            <span>기간으로 설정</span>
                        </div>
                    </div>
                </div>
                <!-- 일자 설정 -->
                <div v-if="!isTerm" class="row write-form-row">
                    <div class="col-12 write-form-no-pad">
                        <div class="mb-3 ">
                            <input v-model="start_date" type="date" class="form-control">
                        </div>
                    </div>
                </div>
                <!-- 기간 설정 -->
                <div v-if="isTerm" class="row write-form-row">
                    <div class="col-6 write-form-no-pad-left">
                        <div class="mb-3">
                            <input v-model="start_date" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="col-6 write-form-no-pad-right">
                        <div class="mb-3">
                            <input v-model="end_date" type="date" class="form-control">
                        </div>
                    </div>
                </div>
                <!-- 파일 -->
                <div class="row write-form-row">
                    <div class="col-9 write-form-no-pad">
                        <div class="mb-3">
                            <input class="form-control form-control-sm" id="formFileSm" accept=".jpg, .png, .gif" type="file" @change="onChangeFile">
                        </div>
                    </div>
                    <div class="col-3 write-form-no-pad-right">
                        <button type="button" class="btn btn-success btn-sm" style="width: 100%;" @click="onClickAddFile">추 가</button>
                    </div>
                </div>
                <!-- 이미지 그리드 -->
                <div class="row">
                    <div class="col-12 image-grid">
                        <div class="image-grid-row">
                            <img v-for="img in images" :key="img.temp_id" class="image-grid-col" :src="img.imageUrl" alt="..." @click="onClickImagePreview(img.temp_id)">
                        </div>
                    </div>
                </div>
                <!-- 글 내용 -->
                <div class="row write-form-row">
                    <div class="col-12 write-form-no-pad">
                        <div class="mb-3">
                            <textarea v-model="content" class="form-control" id="content" rows="7"></textarea>
                        </div>
                    </div>
                </div>
                <hr>
                <!-- 초기화, 저장 버튼 -->
                <div class="row">
                    <div class="col-6  write-form-label">
                        <button type="button" class="btn btn-outline-secondary" @click="reset">초기화</button>
                    </div>
                    <div class="col-6 write-form-submit">
                        <button type="button" class="btn btn-success" @click="savePost">저장</button>
                    </div>
                </div>
                <!-- Toast 메세지(기본값:hide) -->
                <div class="position-fixed bottom-0 end-0 write-form-toast" style="z-index: 5">
                    <div id="liveToast" class="toast fade hide" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-body" :class="{'alert alert-success': toast.isSuccess, 'alert alert-danger': toast.isDanger}">
                            <i v-if="toast.isSuccess" class="bi bi-check-circle" style="margin-right: 5px;"></i>
                            <i v-if="toast.isDanger" class="bi bi-x-circle" style="margin-right: 5px;"></i>
                            {{toast.message}}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'write',
    components: {},
    data() {
        return {
            isTerm: false,
            
            // post
            title: '',
            start_date: '',
            end_date: '',
            content: '',
            writer: 'jwkim',

            // image 맵(key: Number, value: String)
            imageMap: new Map(),
            images: [],

            // toast
            toast: {
                isSuccess: false,
                isDanger: false,
                time: 0,
                message: ''
            }
        }
    },
    methods: {
        setIsTermDate() {
            // 기간설정이 아닌경우 start_date = end_date
            if (!this.isTerm) this.end_date = this.start_date;
        },
        successToast(message, time, timeout) {
            this.toast.isSuccess = true;
            this.toast.isDanger = false;

            this.showToast(message, time, timeout);
        },
        failToast(message, time, timeout) {
            this.toast.isSuccess = false;
            this.toast.isDanger = true;

            this.showToast(message, time, timeout);
        },
        showToast(message, time, timeout) {

            this.toast.message = message;
            this.toast.time = time;

            var toastElem = document.getElementById('liveToast');
            toastElem.classList.remove('hide');
            toastElem.classList.add('show');

            // 토스트 메세지 자동종료
            setTimeout(function() {
                toastElem.classList.remove('show');
                toastElem.classList.add('hide');
            }, timeout);
        },
        reset() {
            this.title = '';
            this.start_date = '';
            this.end_date = '';
            this.content = '';
        },
        savePost() {

            // 입력값 검증
            // 제목 검증
            if (!this.title) {
                this.failToast('제목을 입력해 주세요.', '', 2000);
                return;
            }

            // 날짜 검증
            if (!this.start_date) {
                if (this.isTerm) this.failToast('시작일자를 입력해 주세요.', '', 2000);
                else this.failToast('일자를 입력해 주세요.', '', 2000);
                return;
            }

            if (this.isTerm && !this.end_date) {
                this.failToast('종료일자를 입력해 주세요.', '', 2000);
                return;
            }

            // 날짜 검증
            if (new Date(this.start_date) > new Date(this.end_date)) {
                this.failToast('시작일자가 종료일자보다 클 수 없습니다.', '', 2000);
                return;
            }

            axios.post(this.$base_url + '/post', {
                title: this.title,
                writer: this.writer,
                content: this.content,
                start_date: this.start_date,
                end_date: this.end_date          
            })
            .then((response) => {
                
                // PagingFooter 초기화
                console.log(response);
                console.log(response.data.result);
                if (response.data.result && response.data.result.affectedRows > 0) {
                    console.log('insertId : ', response.data.result.insertId);

                    // 토스트 메세지 띄우기
                    this.successToast('글이 저장되었습니다.', '방금 전', 5000);
                    this.reset();
                }
            }).catch((e)=>{
                console.error(e);
            });
        },
        onChangeFile(e) {
            console.log(e.target.files);
            if (e.target.files.length > 0) {
                
                var imageUrl = URL.createObjectURL(e.target.files[0]);
                var temp_id = this.imageMap.size;
                
                console.log("temp_id : ", temp_id);
                console.log("imageUrl : ", imageUrl);

                this.imageMap.set(temp_id, imageUrl);
            }
        },
        onClickAddFile() {
            this.images = [];
            this.imageMap.forEach((value, key, map) => {
                console.log(map);
                this.images.push({imageUrl: value, temp_id: key});
            });
        },
        onClickImagePreview(temp_id) {
            if (confirm('삭제하시겠습니까?') && this.imageMap.has(temp_id)) {
                this.imageMap.delete(temp_id);
                this.images = [];
                this.imageMap.forEach((value, key, map) => {
                    console.log(map);
                    this.images.push({imageUrl: value, temp_id: key});
                });
            }
        }
    },
    watch: {
        isTerm() {
            // 기간설정이 아닌경우 start_date = end_date
            this.setIsTermDate();
        },
        start_date() {
            // 기간설정이 아닌경우 start_date = end_date
            this.setIsTermDate();
        },
    },
    computed: {
        // images() {
        //     var arr = [];
        //     for(var key in this.imageMap.keys()) {
        //         var url = this.imageMap.get(key);
        //         arr.push({imageUrl: url, temp_id: key});
        //     }

        //     return arr;
        // }
    },
}
</script>

<style>
.write-form label {
    font-weight: bold;
}
.write-form {
    border: 1px solid rgb(200, 200, 200);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
}
.write-form-row {
    margin: 10px 0 10px 0;    
}
.write-form-no-pad {
    padding-left: 0;
    padding-right: 0;
}
.write-form-no-pad-left {
    padding-left: 0;
}
.write-form-no-pad-right {
    padding-right: 0;
}
.write-form-no-pad-right {
    padding-right: 0;
}
.write-form-label {
    text-align: left;
}
.write-form-submit {
    text-align: right;
}
.write-form .image-grid-row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
}
.write-form img.image-grid-col {
    flex: 23%;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 5px;
    padding: 0 2px;
    margin: 2px;
    width: 23%;
    max-width: 100px;
    max-height: 100px;
}
@media (min-width: 400px) {
    .write-form-toast {
        padding: 20px !important;
    }
}
.write-form-toast {
    padding: 4px;
}
</style>
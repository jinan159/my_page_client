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
                            <input class="form-control form-control-sm" id="formFileSm" type="file">
                        </div>
                    </div>
                    <div class="col-3 write-form-no-pad-right">
                        <button type="button" class="btn btn-success btn-sm" style="width: 100%;">선 택</button>
                    </div>
                </div>
                <!-- 이미지 그리드 -->
                <div class="row">
                    <div class="col-12 image-grid">
                        <div class="image-grid-row">
                            <img class="image-grid-col" src="../assets/images/Docker.png" alt="...">
                            <img class="image-grid-col" src="../assets/images/DBeaver.png" alt="...">
                            <img class="image-grid-col" src="../assets/images/mysql.png" alt="...">
                            <img class="image-grid-col" src="../assets/images/node.png" alt="...">
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
                        <button type="button" class="btn btn-outline-secondary">초기화</button>
                    </div>
                    <div class="col-6 write-form-submit">
                        <button type="button" class="btn btn-success" @click="savePost">저장</button>
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
        }
    },
    methods: {
        setIsTermDate() {
            // 기간설정이 아닌경우 start_date = end_date
            if (!this.isTerm) this.end_date = this.start_date;
        },
        savePost() {
            axios.post(this.$base_url + '/post', {
                title: this.title,
                writer: this.writer,
                content: this.content,
                start_date: this.start_date,
                end_date: this.end_date             
            })
            .then((response) => {
                
                // PagingFooter 초기화
                if (response.result && response.result.affectedRows > 0) {
                    console.log('insertId : ', response.result.insertId);
                }
            }).catch((e)=>{
                console.error(e);
            });
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
        }
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
    border: 1px solid black;
    padding: 0 2px;
    margin: 2px;
    width: 23%;
    max-width: 100px;
    max-height: 100px;
}
</style>
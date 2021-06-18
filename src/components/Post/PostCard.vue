<template>
    <div>
        <div class="container-fluid post-card" v-for="post in formatted_postCardProps" :key="post.id">
            <div class="card mb-3">
                <div class="row g-0">
                <div class="col-md-4">
                    <div class="image-grid-row">
                        <img class="image-grid-col" src="../../assets/images/Docker.png" alt="...">
                        <img class="image-grid-col" src="../../assets/images/Docker.png" alt="...">
                        <img class="image-grid-col" src="../../assets/images/Docker.png" alt="...">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">제목 : {{post.title}}</h5>
                    <p class="card-text" v-if="post.start_date === post.end_date"><small class="text-muted">Date : {{post.start_date}}</small></p>
                    <p class="card-text" v-else><small class="text-muted">Date : {{post.start_date}} ~ {{post.end_date}}</small></p>
                    <p class="card-text">{{post.content}}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils/utils'
export default {
    name: 'postCard',
    props: {
        postCardProps: Array,
    },
    data() {
        return {
            
        }
    },
    computed: {
        formatted_postCardProps: function(){
            var arr = this.postCardProps;
            if (arr.length && arr.length > 0) {
                for(var i in arr) {
                    arr[i].start_date = utils.dateUtils.getFormattedDateString('YYYY-MM-DD', new Date(arr[i].start_date));
                    arr[i].end_date = utils.dateUtils.getFormattedDateString('YYYY-MM-DD', new Date(arr[i].end_date));
                }
            }

            return arr;
        }
    },
    created() {
        console.log("[PostCard] - created() : this.postCardProps : ", this.postCardProps);
    }
}
</script>

<style>
.post-card {
    margin: 20px 0;
}

.image-grid-row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
}
img.image-grid-col {
    flex: 47%;
    border: 1px solid black;
    padding: 0 4px;
    margin: 4px;
    width: 47%;
}
</style>
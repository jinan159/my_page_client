<template>
  <div>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PagingFooter class="paging-footer"/>
  </div>
</template>

<script>
import PostCard from '../components/Post/PostCard.vue'
import PagingFooter from '../components/includes/PagingFooter.vue'
export default {
    name: 'postList',
    components: {
        PostCard,
        PagingFooter
    }

}
</script>

<style>
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
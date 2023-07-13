<template>
    <div>
        <u-list :item="items" v-if="items.length > 0"></u-list>
        <div class="x-bottom" v-intersect="{ handler: fetchNext }"></div>
        <!-- 监听scroll事件，比对滚动距离+黑色块在页面的高度加上比较2个距离相对的差 -->
        <!-- intersectionObserver使用当黑色块出现在页面的时候加载下一页 -->
    </div>
</template>

<script>
// 为了便捷的映射我们store命名空间下面的mapstate 方法
import { createNamespacedHelpers } from "vuex";
import UList from "../components/UList.vue";
const { mapState, mapActions } = createNamespacedHelpers("topic");

export default {
    name: "u-top",
    props: ["type"],
    components: {
        UList,
    },
    computed: {
        ...mapState({
            items: state => state[state.activeType].items,
            activeType: state => state.activeType
        })
    },
    created() {
        this.fetchNext();
    },
    mounted(){
    },
    watch: {
        type(type) {
            this.fetchData({ type });
        }
    },
    methods: {
        ...mapActions({
            fetchData: "FETCH_LIST_DATA"
        }),
        fetchNext() {
            const { type } = this;
            this.fetchData({ type });
        }
    }
}
</script>

<style>
.x-bottom {
    width: 100%;
    height: 40px;
    background: #333;
}
</style>

import { fetchItems } from "./api/api";

export const LIST_TYPE = {
    TOP: 'top',
    HOT: 'hot',
    NEW: 'new'
}

export const store = {
    namespaced: true, // 防止多个module的store命名冲突
    state: {
        activeType: LIST_TYPE.TOP,
        top: {
            items: [],
            pageInfo: {}
        },
        hot: {
            items: [],
            pageInfo: {}
        },
        new: {
            items: [],
            pageInfo: {}
        }
    },
    mutations: {
        SET_ACTIVE_TYPE: (state, { type }) => {
            state.activeType = type;
        },
        SET_LIST: (state, { items, pageInfo }) => {
            state[state.activeType].pageInfo = pageInfo;

            items.forEach(item => {
                item && state[state.activeType].items.push(item);
            })
        }
    },
    actions: {
        // _FETCH_LIST_DATA: ({ state, commit }, { type }) => {
        //     commit("SET_ACTIVE_TYPE", { type });

        //     const after = state[type].pageInfo.endCursor || 0;
        //     return fetchItems({
        //         type,
        //         after
        //     }).then(({ items, pageInfo }) => commit("SET_LIST", { items, pageInfo}))
        // },

        FETCH_LIST_DATA: async ({ commit }, { type }) => {
            commit("SET_ACTIVE_TYPE", { type });
            try {
                const res = await fetchItems();
                let items = res.list;
                const {
                    pageNum,
                    pageSize,
                    total
                } = res;

                let pageInfo = {  
                    pageNum,
                    pageSize,
                    total 
                }
                commit("SET_LIST", { items, pageInfo })
            } catch (err) {
                console.log(err);
            }
        }
    }
} 
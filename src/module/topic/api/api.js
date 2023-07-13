import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://web-api.juejin.im",
//   timeout: 1000,
//   headers: { "X-Agent": "Juejin/Web" },
// });

const instance = axios.create({
  baseURL: "https://testapi.shanlangit.com/",
  timeout: 1000,
  headers: {},
});

// 这段代码使用axios库创建了一个axios实例，并设置了基本的配置项。通过`axios.create()`方法创建的实例可以指定多个默认的配置，包括基础URL、超时时间和请求头。
// 接着，代码使用`instance.interceptors.response.use()`方法来注册响应拦截器。拦截器用于对响应进行处理，并返回处理后的数据或错误。在这个例子中，拦截器的第一个函数接收一个响应对象作为参数，该对象包含响应的状态码、状态文本和数据。如果响应状态码不等于200，将通过`Promise.reject()`拒绝该响应；否则将返回响应的数据。
// 如果在请求过程中发生错误，第二个函数将被调用，它接收一个错误对象作为参数，并通过`Promise.reject()`将错误进行拒绝。
// 这段代码的作用是创建了一个自定义的axios实例，并给该实例配置了基本的请求参数和响应拦截器。这个实例可以用于发送请求，并对响应进行统一的处理.

// instance.interceptors.response.use(
//   function ({ status, statusText, data }) {
//     if (status !== 200) {
//       return Promise.reject();
//     }
//     return data;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  function ({ status, data }) {
    if (status !== 200) {
      return Promise.reject();
    }
    return data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 这段代码定义了一个常量`DATA_TYPE`，它是一个对象，包含了不同类型数据标识符和对应的值。面通过导出一个名为`fetchItems`函数来发送请求。

// `fetchItems`函数接收一个包含`type`和`after`属性的参数对象，并使用axios实例`instance`来发送POST请求到`/query`接口。请求的数据包括`operationName`、`query`、`variables`和`extensions`四个字段。

// - `operationName`字段用于指定操作的名称，此处为空字符串。
// - `query`字段用于指定查询的内容，此处为空字符串。
// - `variables`字段是一个对象，包含了请求的参数。其中`first`表示每次请求返回的最大记录数，`after`表示请求的偏移量，`order`使用常量`DATA_TYPE`根据`type`获取对应的排序方式。
// - `extensions`字段是一个包含了查询扩展信息的对象。此处的`query`字段包含了一个`id`属性，其值为固定的字符串。

// 请求成功后，通过解构赋值将响应数据的`data.articleFeed.items`的`edges`和`pageInfo`属性提取出来。`edges`是一个数组，每个元素上都包含了一个`node`属性，其值为实际的数据项。通过`map`方法将`edges`中的每个元素的`node`属性提取出来，形成一个新的数组`items`。

// 最后，函数返回一个包含了`items`和`pageInfo`的对象，即请求成功后提取的数据.


// const DATA_TYPE = {
//   new: "NEWEST",
//   hot: "POPULAR",
//   top: "THREE_DAYS_HOTTEST",
// };

// export const fetchItems = ({ type, after }) => {
//   return instance.post("/query", {
//       operationName: "",
//       query: "",
//       variables: { first: 20, after, order: DATA_TYPE[type] },
//       extensions: { query: { id: "21207e9ddb1de777adeaca7a2fb38030" } },
//     })
//     .then(({ data }) => {
//       const { edges, pageInfo } = data.articleFeed.items;
//       const items = edges.map(({ node }) => node);
//       return { items, pageInfo };
//     });
// };

export const fetchItems = async () => {
  // https://testapi.shanlangit.com/sl_bot_cs/api/draw/userCreation/selectedPagelist
  const data = await instance.post("/sl_bot_cs/api/draw/userCreation/selectedPagelist", {
    pageNum: 1,
    pageSize: 100,
    "queryMap['origin_eq']": "2",
    _orderBy: "createTime desc"
  });
  return data;
};
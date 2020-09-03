import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:5000"
/* export function login(account,password){
    return axios.post("/users/checkLogin",{account,password})
} */
//登录api
//用户名:account，密码：password
export var login = (account, password) => axios.post("/users/checkLogin", { account, password })
//检查是否有token
export var checktoken = (token) => axios.get("/users/checktoken", { params: { token } })
//添加账号
//用户名:account，密码：password,用户组:userGroup
export var addAcc = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })
//获取账号列表
export var getAccList = (currentPage, pageSize) => axios.get("/users/list", { params: { currentPage, pageSize } })
//删除账号
export var delAcc = (id) => axios.get("/users/del", { params: { id } })
//修改账号
export var editAcc = (id, account, userGroup) => axios.post("/users/edit", { id, account, userGroup })
//批量删除
export var btcAccList = (ids) => axios.get("/users/batchdel", { params: { ids } })
//检查旧密码是否正确
export var checkOldPass = (oldPwd, id) => axios.get("/users/checkoldpwd", { params: { oldPwd, id } })
//修改密码
export var editPass = (id, newPwd) => axios.post("/users/editpwd", { id, newPwd })
//获取个人中心信息
export var personalMsg = (id) => axios.get("/users/accountinfo", { params: { id } })
//头像上传接口
// export var imgUpload=(id)=>axios.post("/users/avatar_upload",{id})
//添加分类
export var addCate = (cateName, state) => axios.post("/goods/addcate", { cateName, state })
//获取分类
export var getCateList = (currentPage, pageSize) => axios.get("/goods/catelist", { params: { currentPage, pageSize } })
//删除分类
export var delCate = (id) => axios.get("/goods/delcate", { params: { id } })
//编辑分类
export var editCate = (id, cateName, state) => axios.post("/goods/editcate", { id, cateName, state })
//查询商品分类
export var goodsCate = () => axios.get("/goods/categories", { params: {} })
//查询商品列表
export var goodsList = (currentPage, pageSize) => axios.get("/goods/list", { params: { currentPage, pageSize } })
//删除商品列表
export var delGoodsList = (id) => axios.get("/goods/del", { params: { id } })
//修改商品
export var editGoods = (name, category, price, imgUrl, goodsDesc, id) => axios.post("/goods/edit", { name, category, price, imgUrl, goodsDesc, id })
//商品添加
export var addgoods = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })
//获取订单列表
export var getOrderList = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get("/order/list", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
//查询订单
export var checkOrder = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get("/order/search", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
//获取订单详情
export var getOrderDetetil = (id) => axios.get("/order/detail", { params: { id } })
//编辑订单
export var editOrder = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=> axios.post("/order/edit", {id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState })
//获取店铺信息
export var getShopInfo = () => axios.get("/shop/info", { params: {}})
//获取首页报表信息
export var getEchartsMsg= () => axios.get("/order/totaldata", {params: {}})
//获取商品报表接口
export var getGoodsEcharts= (date) => axios.get("/order/ordertotal", {params: {date}})
//修改店铺信息
export var editShop = (params) => axios.post("/shop/edit",params)
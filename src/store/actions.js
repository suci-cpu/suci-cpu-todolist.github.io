// const INITIAL_DATA_URL = "https://raw.githubusercontent.com/ayazsayyed/Vue-Projects/master/src/components/asana/boards.json"
// import axios from "axios"

//准备actions对象——响应组件中用户的动作
export default {
  //响应组件中加的动作
  loginUser(context,value){
    // console.log('actions中的jia被调用了',miniStore,value)
    context.commit('LoginUser',value)
  },
}

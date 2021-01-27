export const state = () => ({
    title: "",
    data:"",
    alert_show:false
  })
  
  export const mutations = {
    show_alert(state,title,data) {
      state.title = title;
      state.data = data;
      state.alert_show = true;
    },
    hide_alert(state) {
        state.alert_show = false;
    }
  }
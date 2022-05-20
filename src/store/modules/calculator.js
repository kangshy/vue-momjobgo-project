export default {
  state: {
    num1 : 0,
    num2 : 0,
    operator : '',
    result : 0,
    expression : '',
  },

  getters: {
    printResult(state) {
      return state.result;
    },
    printExp(state){
      return state.expression;
    }
  },
  
  mutations: {
    initState(state) {
      state.num1 = 0;
      state.num2 = 0;
      state.operator = '';
      state.result = 0;
      state.expression = '';
    },
    setExp(state, data) {
      state.expression+=data;
    },
    fixExp(state) {
      if(!isNaN(Number(state.expression.at(state.expression.length-1))))
        state.expression=state.expression.slice(0, state.expression.length-1);
    },
    setNum1(state, number){
      state.num1=Number(number);
    },
    setNum2(state, number){
      state.num2=Number(number);
    },
    setOperator(state, data) {
      state.operator=data;
      console.log(state.operator);
    },
    setResult(state) {
      switch(state.operator){
        case '+':
          state.result=state.num1+state.num2;
          break;
        case '-' :
          state.result=state.num1-state.num2;
          break;
        case '×':
          state.result=state.num1*state.num2;
          break;
        case '÷' : 
          state.result=state.num1/state.num2;
          break;
        default :
          break;
      }
      //state.expression=0;
    },
  },
  actions: {
  },
  modules: {
  }
}

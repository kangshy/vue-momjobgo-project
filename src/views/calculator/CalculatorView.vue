<template>
  <div class="home">
    <CalculatorScreen />
    <CalculatorKeyboard />
  </div>
</template>

<script>
// @ is an alias to /src
import CalculatorKeyboard from './CalculatorKeyboard.vue'
import CalculatorScreen from './CalculatorScreen.vue'

export default {
  name: 'CalculatorView',
  components: {
    CalculatorScreen,
    CalculatorKeyboard,
  }
}
</script>

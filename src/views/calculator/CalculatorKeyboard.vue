<template>
    <div>
        <div>
            <button class="operator plus" @click="operator">+</button>
            <button class="operator minus" @click="operator">-</button>
            <button class="operator multiple" @click="operator">×</button>
            <button class="operator division" @click="operator">÷</button>
            <br>
            <button class="number" @click="setvalue">7</button>
            <button class="number" @click="setvalue">8</button>
            <button class="number" @click="setvalue">9</button>
            <button class="backspace"><img src="@/assets/backspace.jpg" @click="remove"></button>
            <br>
            <button class="number" @click="setvalue">4</button>
            <button class="number" @click="setvalue">5</button>
            <button class="number" @click="setvalue">6</button>
            <button class="clear" @click="initAll">C</button>
            <br>
            <button class="number" @click="setvalue">1</button>
            <button class="number" @click="setvalue">2</button>
            <button class="number" @click="setvalue">3</button>
            <button class="operator equal" @click="calculate">=</button>
            <br>
            <button class="number" @click="setvalue">0</button>
        </div>
        <div>
            <h4>설명</h4>
            <p>입력받은 두 수를 연산하여 결과를 보여줍니다.</p>
            <h4>사용법</h4>
            <p>1. 버튼을 눌러 첫번째 숫자를 입력합니다.</p>
            <p>2. 연산자 선택합니다.</p>
            <p>3. 1과 동일한 방법으로 두 번 째 숫자를 입력합니다.</p>
            <p>4. "="를 눌러 수식의 결과를 보여줍니다</p>
            <p>5. 입력된 숫자를 수정할 때는 <img src="@/assets/backspace.jpg">를 선택하여 수정할 수 있습니다.</p>
            <p>6. Clear 버튼을 선택하여 전체 입력과정을 초기화할 수 있습니다.</p>
            <h4>주의사항</h4>
            <p>1. 숫자를 먼저 입력하지 않으면 연산자를 선택할 수 없습니다.</p>
            <p>2. 연산자를 하나만 선택할 수 있습니다. 이미 선택된 연산자가 있으면 경고창을 띄웁니다.</p>
            <p>3. 연산자가 입력된 이전의 수는 수정할 수 없습니다.</p>

            <div class="copyright">
            © <a href="mailto:kangshy@gmail.com">Jiyeon Kang</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            inputdata : '',
            done:false,
            isSetOperator:false,
        }
    },
    methods: {
        ...mapMutations(['initState', 'setExp', 'fixExp', 'setNum1', 'setNum2']),
        ...mapMutations(['setOperator', 'setResult']),

        initAll() {
            this.inputdata='';
            this.done=false;
            this.isSetOperator=false;
            this.initState();
        },

        setvalue(e){
            if(this.done){
                this.initState();
                this.done=false;
            }
            this.inputdata+=e.target.innerText;
            this.setExp(e.target.innerText);
        },
        operator(e) {
            if (this.isSetOperator) {
                alert('이미 연산자를 선택하였습니다.');
            } else if(this.inputdata.length==0) {
                alert('숫자를 먼저 입력하세요');
            } else {
                this.setNum1(this.inputdata);
                this.setExp(e.target.innerText);
                this.setOperator(e.target.innerText);
                this.inputdata='';
                this.isSetOperator=true;
            }
        },
        calculate(e) {
            this.setNum2(this.inputdata);
            this.setExp(e.target.innerText);
            this.setResult();
            this.done=true;
            this.isSetOperator=false;
            this.inputdata='';
        },
        remove() {
            this.inputdata=this.inputdata.slice(0, this.inputdata.length-1);
            this.fixExp();
        },
    },
}
</script>

<style scoped>
button
{
    width : 60px;
    height : 60px;
    border : 0;
    margin : 5px;
}

.number
{
    background-color : #cdcdcd;
    font-size : 17px;
}

.operator
{
    font-size:23px;
}

.plus
{
    background-color : #E8F5E9;
}
.minus
{
    background-color : #F0F4C3;
}
.multiple
{
    background-color : #FBE9E7;
}
.division
{
    background-color : #E8EAF6;
}
.equal
{
    background-color : #BBDEFB;
}
</style>
<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn :color="btnColor" light v-bind="attrs" v-on="on"><slot name="title"></slot></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">회원 가입</span>
            </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="아이디*" required v-model="user.id"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="비밀번호*" type="password" required v-model="user.pwd"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field ref="checkPwd" label="비밀번호 확인*" type="password" required v-model="user.checkPwd"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="이름*" required v-model="user.name"></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false"> 취소 </v-btn>
                    <v-btn color="blue darken-2" text @click="submit"> 가입 </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props : {
            btnColor : {
                type : String,
                default : 'primary'
            }
        },

        data: () => ({
            dialog: false,

            user : {
                id : '',
                pwd : '',
                checkPwd : '',
                name : ''
            }
        }),

        methods: {
            async submit() {
                /**
                 * 회원가입 구현.
                 * 
                 * 비밀번호와 비밀번호 확인이 서로 일치해야 함.
                 */
                /* 아이디 입력 확인 */
               if(this.user.id.trim().length===0){
                   alert("아이디를 입력하세요");
                   // 아이디 창에 focus
                   return;
               } else if(this.user.pwd.length===0) {
                   alert("비밀번호를 입력하세요");
                   // 비밀번호 창에 focus
                   return;
               } else if(this.user.checkPwd.length ===0) {
                   alert("비밀번호 확인을 위해 다시 비밀번호를 입력해주세요");
                   // 비밀번호 확인 창에 focus
                   return;
               } else if(this.user.pwd.trim().localeCompare(this.user.checkPwd.trim())!==0) {
                   console.log("[PWD} "+this.user.pwd.trim()+ ", [ChkPWD] "+this.user.checkPwd.trim());
                   alert("입력한 비밀번호가 다릅니다. 확인해 주세요");
                   // 비밀번호 확인 창에 focus
                   return;
               } else if(this.user.name.trim().length===0) {
                   alert("이름을 입력하세요");
                   // 이름 창에 focus
                   return;
               } else {
                    this.user.id = this.user.id.trim();
                    this.user.name = this.user.name.trim();

                    const response = await this.$api('auth/user/new', 'POST', {
                        id : this.user.id,
                        name : this.user.name,
                        pwd : this.user.pwd
                    });

                    if(response.status == this.HTTP_CREATED) {
                        alert(`${this.user.name}님의 가입을 환영합니다.`);
                        this.dialog = false;
                    } else {
                        alert(response.error);
                    }
              }
            }
        },

    }
</script>

<style scoped>

</style>
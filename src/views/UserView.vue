<template>
    <div>
        <v-card
        elevation="2"
        >
            <v-card-title>회원 정보 및 수정</v-card-title>
            <v-card-subtitle>* 는 필수 값입니다.</v-card-subtitle>
            <v-card-text>
                 <v-text-field v-model="user.id" label="* 아이디" disabled></v-text-field>
                 <v-text-field v-model="user.pwd" label="* 현재 비밀번호" type="password"></v-text-field>

                 <v-text-field v-model="user.newPwd" label="새로운 비밀번호" type="password"></v-text-field>
                 <v-text-field v-model="checkPwd" label="새로운 비밀번호 확인" type="password"></v-text-field>
                 <v-text-field v-model="user.name" label="* 이름"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn @click="modify">수정</v-btn>
                <v-btn @click="deleteUser" color="red" style="color: white;">삭제</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {

    data() {
        return {
            user : {
                id : '',
                name : '',
                pwd : '',
                newPwd : ''
            },

            checkPwd : ''
        }
    },

    created() {
        this.refreshUser();
    },

    methods: {
        ...mapActions('user', {setToken : 'setToken', setUserId : 'setId', setUserName : 'setName'}),

        async refreshUser(){
            /**
             * 유저 정보 조회 구현.
             * 
             * vuex 유저정보 갱신 및 text-field 초기화.
             */
            const response=await this.$api('/api/auth/user', 'GET');
            if(response.status==this.HTTP_OK) {
                this.user.id = response.data.id;
                this.user.name = response.data.name;
                this.setUserId(response.data.id);
                this.setUserName(response.data.name);
                this.user.pwd = '';
                this.user.newPwd = '';
                this.checkPwd = '';
            }
        },

        async modify(){
            /**
             * 유저 정보 수정 구현.
             * 
             * 새로운 비밀번호를 입력하지 않으면 이름만 변경된다.
             * 새로운 비밀번호 입력 시 비밀번호 확인과 일치해야한다.
             * 수정 여부를 확인 한 후 수정한다.
             */
            const resBody = { id : this.user.id, name : this.user.name, pwd : this.user.pwd };

            if(this.user.newPwd!==this.checkPwd) {
                alert("새 비밀번호가 일치하지 않습니다");
                return false;
            } else if(this.user.newPwd !=="" &&this.user.newPwd===this.checkPwd) {
                const addResBody = { newPwd : this.user.newPwd };
                Object.assign(resBody, addResBody);
            }

            const response=await this.$api('/api/auth/user', 'PATCH', resBody);

            if(response.status===this.HTTP_OK) {
                alert("회원정보가 수정되었습니다");
                this.refreshUser();
            }
        },

        async deleteUser(){
            /**
             * 유저 정보 삭제 구현.
             * 
             * 삭제 여부를 확인 한 후 삭제한다.
             */
            if(!confirm("회원정보를 삭제하시겠습니까?")) {
                return false;
            }
            const response = await this.$api('/api/auth/user', 'DELETE');
            if(response.status==this.HTTP_OK) {
                alert("삭제되었습니다!");
                this.setToken("");
            }
        }
    },
}
</script>
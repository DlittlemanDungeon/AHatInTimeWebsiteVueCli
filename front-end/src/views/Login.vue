<template>
    <div class='colorLightPurple mainLoginBox'> 
        <h1  style='margin-top: 30px;'>Login</h1>
        <div class='communityBox debug'>
            <form class='forms'>
                <div class='specific'>
                    <label for="exampleInputEmail1" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Username</label>
                    <div class="mb-3">
                        <input class="form-control" id="exampleInputEmail1" style='width: 200px;' v-model='loginUser'>
                    </div>
                </div>
                <div class='specific'>
                    <label for="exampleInputEmail2" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Password</label>
                    <div class="mb-3"> 
                        <input type='password' class="form-control" id="exampleInputEmail2" style='width: 200px;' v-model='loginPass'>
                    </div>
                </div>
                <div class='bottomButton debug'>
                    <button type="submit" class="btn btn-primary btn-warning debug" style='color:black;' @click.prevent='login'>Login</button>
                    <p class='errorMessage debug' v-if='errorLoginMessage'>{{errorLoginMessage}}</p>
                </div>
            </form>
        </div>
        <br>
        <br>
        <h5>or...</h5>
        <h1  style='margin-top: 30px;'>Create a Profile</h1>
        <div class='communityBox debug'>
            <form class='forms'>
                <div class='specific'>
                    <label for="exampleInputEmail3" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>First Name</label>
                    <div class="mb-3"> 
                        <input class="form-control" id="exampleInputEmail3" style='width: 200px;' v-model='firstName'>
                    </div>
                </div>
                <div class='specific'>
                    <label for="exampleInputEmail4" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Last Name</label>
                    <div class="mb-3"> 
                        <input class="form-control" id="exampleInputEmail4" style='width: 200px;' v-model='lastName'>
                    </div>
                </div>
                <div class='specific'>
                    <label for="exampleInputEmail5" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Username</label>
                    <div class="mb-3">
                        <input class="form-control" id="exampleInputEmail5" style='width: 200px;' v-model='createUser'>
                    </div>
                </div>
                <div class='specific'>
                    <label for="exampleInputEmail6" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Password</label>
                    <div class="mb-3"> 
                        <input class="form-control" type='password' id="exampleInputEmail6" style='width: 200px;' v-model='createPass'>
                    </div>
                </div>
                <div class='specific'>
                    <label for="exampleInputEmail7" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Discord Username</label>
                    <div class="mb-3"> 
                        <input class="form-control" id="exampleInputEmail7" style='width: 200px;'  v-model='discord'>
                    </div>
                </div>
                <form class='specific'>
                    <label for="exampleInputEmail8" class="form-label debug" style='font-size:20px; padding: 5px; 
                    margin-right: 10px; margin-left: 10px;'>Speedrun.com Username</label>
                    <div class="mb-3"> 
                        <input type='input' class="form-control" style='width: 200px;' v-model='speedrun'>
                    </div>
                </form>
                
                <div class='bottomButton'>
                    <button type="submit" class="btn btn-primary btn-warning" style='color:black;' @click.prevent='register'>Make Account</button>
                    <p class='errorMessage debug' v-if='errorCreateMessage'>{{errorCreateMessage}}</p>
                </div>
            </form>
        </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    components: {
    },
    data() {
        return {
            loginUser: "",
            loginPass: "",
            firstName: "",
            lastName: "",
            createUser: "",
            createPass: "",
            discord: "",
            speedrun: "",
            errorLoginMessage: "",
            errorCreateMessage: "",
        }
    },
    methods: {
        async getLoggedIn() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            }
            catch (error) {
                this.$root.$data.user = null;
            }
        },
        async login() {
            this.errorLoginMessage =  "";
            if (!this.loginUser || !this.loginPass) {
                this.errorLoginMessage =  "You must fill in all of the fields";
                return;
            }
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.loginUser,
                    password: this.loginPass,
            });
            this.$root.$data.user = response.data.user;
            this.loginUser= "";
            this.loginPass= "";
            this.$router.push("/");
            window.scrollTo(0,0);
            } catch (error) {
                this.errorLoginMessage = error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async register() {
            this.errorCreateMessage = "";
            if (!this.createUser || !this.createPass || !this.firstName || !this.lastName || !this.discord || !this.speedrun) {
                this.errorCreateMessage =  "You must fill in all of the fields";
                return;         
            }
            try {
                let response = await axios.post('/api/users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.createUser,
                    password: this.createPass,
                    discordUsername: this.discord,
                    speedrunUsername: this.speedrun,
            });
            this.$root.$data.user = response.data.user;
            this.firstName= "";
            this.lastName= "";
            this.createUser= "";
            this.createPass= "";
            this.discord= "";
            this.speedrun= "";
            this.$router.push("/");
            window.scrollTo(0,0);
            } catch (error) {
                this.errorCreateMessage = error.response.data.message;
                this.$root.$data.user = null;
            }
        },
    },
    created() {
        this.getLoggedIn();
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    }
}

</script>

<style scoped>
* {
    color: white;
}

.bottomButton {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

.mainLoginBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.communityBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:20px;
}

.forms {
    display: flex;
    flex-wrap: wrap;
    font-style: normal;
    width: 80%;
    justify-content: space-evenly;
}

.debug {
    /*border: 1px red solid;*/
}

.errorMessage {
    padding-top: 10px;
}

input {
    color: black;
}

</style>
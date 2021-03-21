<template>
<div class='rightContent colorLightPurple debug'>
  <div class='text-white debug'>
    <h1  style='margin-top: 30px;'>Contribute to our Guide!</h1>
  </div>
  <div class='rightContentText colorLightPurple text-white debug'>
    <p class='bigText'>We are a completely volunteer and non-commercial effort, so all of our information and upkeep comes from
        people like you! If you would like to add a new strat tutorial to our current list, use the form below! If you'd like to edit
        or delete one of our current strat tutorials, check the list of current strats below! Thanks to you, A Hat in Time
        Speedrun will continue to grow!
    </p>
  </div>

  <div class='communityBox debug'>
    <p class='mainCommunityText debug'>Submit a Strat</p>
    <form>
      <div class="form-floating mb-3" style='margin: 20px;'>
        <input class="form-control" id="newStratName" placeholder="">
        <label for="floatingInput">Strat Name</label>
      </div>
      <div class="form-floating" style='margin: 20px;'>
        <textarea class="form-control" placeholder="Leave a comment here" id="newStratText" style="height: 200px"></textarea>
        <label for="floatingTextarea">Guide</label>
      </div>
      <button type="submit" class="btn btn-warning btn-lg" style='margin-bottom: 20px; margin-left: 70px;' @click="addStrat()">Submit</button>
    </form>
  </div>
  <br>

  <div class='communityBox debug'>
    <p class='mainCommunityText debug'>Current Guides</p>
    <form v-for='s in stratData' :key='s.id'>
      <div v-if='s.visible'>
      <div class="input-group mb-3" style='width: 80%; margin: 20px;'>
        <input type="text" class="form-control" :placeholder='s.title' aria-label="Recipient's username" 
            aria-describedby="button-addon2" disabled>
        <button class="btn btn-warning" type="button" id="button-addon2" @click="deleteStrat(s.id)" style='width: 30%;'>Delete Guide</button>
      </div>
       <div class="form-floating" style='margin: 20px;'>
        <textarea class="form-control" placeholder="Leave a comment here" :id='s.id' style="height: 100px" 
                  :value='s.info[0].text.split(" ").filter(word => word.localeCompare("") != 0).join(" ")'></textarea>
        <label for="floatingTextarea">Guide</label>
      </div>
      <button type="submit" class="btn btn-warning btn-lg" style='margin-bottom: 20px; margin-left: 70px;'
            @click="editStrat(s.id)">Save Changes</button>
      <br>
      </div>
    </form>
  </div>
  <br>
</div>

</template>

<script>
export default {
  name: 'StratContribute',
  data () {
      return {
      }
  },
  computed: {
    stratData() {
        return this.$root.$data.stratInfoData;
    }
  },
  methods: {
    addStrat() {
        let newText = document.getElementById("newStratText").value;
        document.getElementById("newStratText").value = "";

        let newName = document.getElementById("newStratName").value;
        document.getElementById("newStratName").value = "";

        this.$root.$data.stratInfoData.push({
            id: this.$root.$data.stratInfoData.length,
            visible: true,
            stratName: newName.split(" ").join("").toLowerCase(),
            title: newName,
            info: [{id: 0, text: newText},],
            tutorials: [],});

        this.newStratName = '';
    },
    deleteStrat(id) {
        this.$root.$data.stratInfoData.splice(id, 1);
        for(let i = 0; i <  this.$root.$data.stratInfoData.length; i++) {
            this.$root.$data.stratInfoData[i].id = i;
        }
    },
    editStrat(id) {
        let newText = document.getElementById(id).value;
        document.getElementById(id).value = "";

        this.$root.$data.stratInfoData[id].info[0].text = newText;

        document.getElementById(id).value = this.$root.$data.stratInfoData[id].info[0].text;
    }
  }
}
</script>

<style scoped>
h1 {
    text-align: center;
}

p {
    text-align: center;
    color: white;
    font-family:Arial, Helvetica, sans-serif;
}

.debug {
    /*border: 1px solid red;*/
}

.top {
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.logo {
    position: absolute;
    z-index: 1;
    align-self: center;
    width: 30%;
}

.videoContainer {
    height: 100%;
    display: flex;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
}

.video {
    align-self: center;
    width: 100%;
}

.colorLightPurple {
    background-color: #47358b;
}

.colorYellow {
    background-color: #ffc107 !important;
}

.communityBox {
    background-color: #231457 !important;
    width: 75%;
    border-radius: 50px;
    padding: 3px;
}

.mainCommunityText {
    text-align: center;
    margin-top: 10px;
    font-size: 35px;
    font-family: 'CursedCasual';
}

.communityText {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
}

.communityTextRight {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: 'CursedCasual';
    padding: 5px;
    padding-left:15px;
    padding-right:15px;
}

.communityTextLeft {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 25px;
    font-family: 'CursedCasual';
    background-color: #ffc107 !important;
    border-radius: 20px;
    padding: 5px;
    padding-left:15px;
    padding-right:15px;
    margin: 0px;
}

.width20 {
    width: 20%;
}

.width15 {
    width: 15%;
}

.width10 {
    width: 10%;
}

.width5 {
    width: 5%;
}

.textDisabled {
    color: #EBEBEB;
}

.overflowHidden {
    overflow: hidden;
}

.content {
    display: flex;
    padding: 10px;
    justify-content: center;
    text-align: center;
}

.cardMContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
}

.leaderboardTop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 30px;
}

.leaderboardButtons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.leaderboardButton {
    margin: 5px;
}

.leaderboardBox {
    padding: 25px;
}

.cardM {
    margin: 30px;
    width: 300px;

    display: flex;
    align-items: center;
    flex-direction: column;
    
}

.imageBox {
    display: flex;
    justify-content: center;
    height: 70%;
    width: 100%;
}

.image {
    width: 75%;
}

.text {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding : 10px;
    height: 100px;
}

.buttonMargin {
    margin: 10px;
}

.footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.footerBox {
    display: flex;
    padding: 20px;
    margin: 10px;
    flex-direction: column;

}

.footerLink {
    text-decoration: none;
    color: white;
}

.textAlignCenter {
    text-align: center;
}

.tutorialSetup {
    display: flex;
}

.leftBar {
    width: 20%;
    text-align: center;
}

.importantText {
    text-align: left;

}

.lessImportantText {
    text-align:center;
}

.tutorialLink {
    text-decoration: none;
    color: black;
}

.rightContent {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rightContentText {
    width: 80%;
    padding: 20px;
}

.groupOButtons {
    display: flex;
    width: 80%;
    margin-bottom: 25px;
    justify-content: center;
}

.bigText {
    font-size: 23px;
    text-align: left;
}

.run {
    background-color:  #231457;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 5px;
    margin: 5px;
    justify-content: space-between;
}

.mediumText {
    font-size: 19px;
    text-align: left;
    padding-right: 15px;
}

.youtubeVideoBox {
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
}

@media only screen and (max-width: 770px) {
    .video {
      height: 101%;
      width: auto;
    }

    .logo {
        width: 80%;
    }
  }

  
@media only screen and (max-width: 544px) {
    .run {
        flex-direction: column;
        align-items: center;
    }
  }
</style>

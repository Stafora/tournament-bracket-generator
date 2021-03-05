<template>
  <section class="section-bracket">
      <div class="wrapper">

          <div class="form-group">
              <div class="form-group__title">Введите число в сетку: </div>
              <input 
                  class="form-group__input" 
                  v-model="gridCount" 
                  type="number" 
                  placeholder="256, 128, 64, 32, 16, 8, 4, 2"
              >
          </div>

          <div class="bracket">
              <ItemParent 
                  v-for="(parent, index) in gridTournementList"
                  :parent="parent"
                  :key="index"

                  @removePlayerInMatch="removePlayerInMatch"
              />
          </div>

          <div class="btn-players-random" v-on:click="randomPlayersInGrid">
            Распределить игроков
          </div>

          <div v-if="playerList.length"><p>Список игроков:</p></div>
          <div class="players js-players">
              <PlayerItem 
                v-for="(player, index) in playerList"
                :player="player"
                :key="index"

                @addPlayerInMatch="addPlayerInMatch"
                @removePlayerInMatch="removePlayerInMatch"
              />
          </div>

      </div>  
    </section>
</template>

<script>
  import * as TreeGen from "tree-json-generator";

  import { HelperBinaryTree } from '@/helpers/HelperBinaryTree'

  import ItemParent from '@/components/ItemParent.vue'
  import PlayerItem from '@/components/PlayerItem.vue'

  export default {
      name: 'Tournament',
      data() {
        return {
            gridCount: '',
            gridTournementList: {},
            playerList: [],
        }
      },
      /**
       * COMPONENTS
       */
      components: {
          ItemParent,
          PlayerItem
      },
      /**
       * WATCH
       */
      watch: {
        gridCount: function(val) {
          this.generateGridTournementList();
          this.generatePlayerList();
        }
      },
      /**
       * METHODS
       */
      methods: {
        generateGridTournementList: function() {
          const config = {
            node: {
              id: "@id()", 
              name: "",
              player: false, 
              children: "@child()",
              match: true,
            },
            rootNodesNumber: 1, // сколько массивов вначале
            childNodesNumber: [2, 2], // количество дочерних элементов
            hasChildRate: 1, // вероятность того что есть дети 0 - нет 1 - да
            maxLevel: Math.log2(this.gridCount) // количество дочерних элементов
          }
          this.gridTournementList = TreeGen.generate(config);
        },
        generatePlayerList: function(){
          let number = !(this.gridCount % 2) ? this.gridCount : (Number(this.gridCount) + 1);
          const config = {
            node: {
              id: "@id()", 
              name: "@randomName()",
            },
            rootNodesNumber: number, // сколько массивов вначале
            childNodesNumber: [0, 0], // количество дочерних элементов
            hasChildRate: 0, // вероятность того что есть дети 0 - нет 1 - да
            maxLevel: 0 // количество дочерних элементов
          }
          this.playerList = TreeGen.generate(config);
        },
        /**
         * @param {Object} player
         * @param {String} treeId
         */
        addPlayerInMatch: function(player, treeId) {
          let match = HelperBinaryTree.search(this.gridTournementList[0], treeId);
          match.player = player;
          //remove player of playerList
          let index = this.playerList.indexOf(player);
          this.playerList.splice(index, 1);
        },
        /**
         * @param {String} treeId
         */
        removePlayerInMatch: function(treeId) {
          let match = HelperBinaryTree.search(this.gridTournementList[0], treeId);
          //add player in playerList
          this.playerList.push(match.player);
          match.player = false;
        },
        randomPlayersInGrid: function() {
          if(this.playerList.length){
            this.lastChildGridTournamentAddPlayer(this.gridTournementList[0]);
          }
        },
        lastChildGridTournamentAddPlayer(element){
          if(element.children != null){
              let result = null;
              for(let i=0; result == null && i < element.children.length; i++){
                  this.lastChildGridTournamentAddPlayer(element.children[i]);
              }
          } else {
              if(!element.player){
                element.player = this.playerList[this.playerList.length - 1];
                this.playerList.pop();
              }
          }
      }
        
      }
  }
</script>

<style lang="scss">
  $side-margin: 50px;
  $vertical-margin: 10px;
  .btn-players-random{
    padding: 10px 20px;
    background: rgb(58, 154, 233);
    width: fit-content;
    max-width: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-height: 60px;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
  }
  .droppable{
    position: relative;
    z-index: 2;
  }
  .players{
    display: flex;
    flex-wrap: wrap;
  }
  .form-group{
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    &__title{
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      margin-right: 10px;
    }
    &__input{
      border: 1px solid #212121;
      height: 40px;
      width: 300px;
      padding: 0px 20px;
      font-size: 16px;

      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #eee;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: #eee;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: #eee;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: #eee;
      }
    }
  }
  .section-bracket{
    padding: 60px 0px;
  }
  .bracket{
    width: 100%;
    display: flex;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .bracket > .item{
    margin-left: -50px;
  }
  .item{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    
    &-parent{
      margin-left: $side-margin;
      display: flex;
      align-items: center;
      min-height: 60px;
      background-color: Beige;
      text-align: center;
      width: 160px;
      padding: 0px 15px;
      position: relative;

      &:after{
          position: absolute;
          content: '';
          width: $side-margin/2;
          height: 2px;
          left: 0;
          top: 50%;
          background-color: #fff;
          transform: translateX(-100%);
      }
    }
    &-childrens{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-child{
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      margin-top: $vertical-margin;
      margin-bottom: $vertical-margin;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        background-color: #fff;
        right: 0;
        top: 50%;
        transform: translateX(100%);
        width: 25px;
        height: 2px;
      }
      &:after{
        content: '';
        position: absolute;
        background-color: #fff;
        right: -$side-margin / 2;
        height: calc(50% + 22px) ;
        width: 2px;
        top: 50%;
      }
      &:last-child{
        &:after{
          transform: translateY(-100%);
        }
      }
      &:only-child:after{          
        display: none;          
      }
    }
    .form-group{
      display: flex;
      align-items: center;
    }
  }
</style>

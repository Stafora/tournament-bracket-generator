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
                  v-for="(parent, index) in createTreeGrid"
                  :parent="parent"
                  :key="index"

                  @searchTree="searchTree"
              />
          </div>

          <div class="players js-players">
              <PlayerItem 
                v-for="(player, index) in createPlayers"
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
  import ItemParent from '@/components/ItemParent.vue'
  import PlayerItem from '@/components/PlayerItem.vue'

  export default {
      name: 'Catalog',
      data() {
        return {
            gridCount: 2,
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
       * COMPUTED
       */
      computed: {
        /**
         * @return random binary Tree with {Object}
         */
        createTreeGrid: function(){
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
          return TreeGen.generate(config);
        },
        /**
         * @return random {Array} with {Object}
         */
        createPlayers: function(){
          const config = {
            node: {
              id: "@id()", 
              name: "@randomName()",
            },
            rootNodesNumber: this.gridCount, // сколько массивов вначале
            childNodesNumber: [0, 0], // количество дочерних элементов
            hasChildRate: 0, // вероятность того что есть дети 0 - нет 1 - да
            maxLevel: 0 // количество дочерних элементов
          }
          return TreeGen.generate(config);
        },
      },
      /**
       * METHODS
       */
      methods: {
        /**
         * set player in match
         * @param {Object} player
         * @param {String} treeId
         */
        addPlayerInMatch: function(player, treeId) {
          let match = this.searchTree(this.createTreeGrid[0], treeId);
          match.player = player;
        },
        /**
         * remove player in match
         * @param {String} treeId
         */
        removePlayerInMatch: function(treeId) {
          let match = this.searchTree(this.createTreeGrid[0], treeId);
          match.player = false;
        },
        /**
         * recursion search id in object tree
         * @param {String} element
         * @param {String} treeId
         * @return {Object}
         */
        searchTree: function(element, treeId = null){
          if(element.id == treeId){
            return element;
          } else if (element.children != null){
              var i;
              var result = null;
              for(i=0; result == null && i < element.children.length; i++){
                  result = this.searchTree(element.children[i], treeId);
              }
              return result;
          }
          return null;
        }
      }
  }
</script>

<style lang="scss">
  $side-margin: 50px;
  $vertical-margin: 10px;
  .droppable{
    position: relative;
    z-index: 2;
  }
  .players{
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
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
    }
  }
  .section-bracket{
    padding: 60px 0px;
  }
  .bracket{
    width: 100%;
    display: flex;
    overflow: hidden;
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

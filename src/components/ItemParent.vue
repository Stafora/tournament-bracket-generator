<template>
    <div class="item">

        <div class="item-parent" :data-id="parent.id" v-bind:class="{'droppable': droppable}">
           {{ parent.name }}
            <PlayerItem v-if="parent.player.name" :player="parent.player" :droppable="droppable" v-bind:fixed="true" @searchTree="searchTree" />
        </div>

        <div class="item-childrens" v-if="parent.children">
            <ItemChild 
                v-for="(child, index) in parent.children"
                :child="child"
                :key="index"

                @searchTree="searchTree"
            />
        </div>
        
    </div>
</template>

<script>
  import ItemChild from '@/components/ItemChild.vue'
  import PlayerItem from '@/components/PlayerItem'

  export default {
      name: 'ItemParent',
      /**
       * PROPS
       */
      props: {
          parent: Object,
      },
      /**
       * COMPONENTS
       */
      components: {
          ItemChild,
          PlayerItem
      },
      /**
       * COMPUTED
       */
      computed: {
          /**
           * @return {Boolean}
           */
          droppable: function() {
              if(this.parent.match){
                  if(this.parent.player){
                      return false;
                  }
                  return this.parent.match;
              }
          }
      },
      /**
       * METHODS
       */
      methods: {
          /**
           * @param {String} id
           */
          searchTree: function(id){
              this.$emit('searchTree', id);
          }
      }
  }
</script>
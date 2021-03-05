<template>
    <div class="item-child">
        <div class="item">
            <div class="item-parent" :data-id="child.id" v-bind:class="{'droppable': droppable}">
                {{child.name}}
                <PlayerItem v-if="child.player.name" :player="child.player" :droppable="droppable" v-bind:fixed="true" @removePlayerInMatch="removePlayerInMatch" />
            </div>
            <div class="item-childrens" v-if="child.children">
                <ItemChild
                    v-for="(item, index) in child.children"
                    :child="item"
                    :key="index"

                    @removePlayerInMatch="removePlayerInMatch"
                />  
            </div>  
        </div>
    </div>
</template>

<script>
    import PlayerItem from '@/components/PlayerItem'

  export default {
      name: 'ItemChild',
      /**
       * PROPS
       */
      props: {
          child: Object,
      },
      /**
       * COMPONENTS
       */
      components: {
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
              if(this.child.match){
                  if(this.child.player){
                      return false;
                  }
                  return this.child.match;
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
          removePlayerInMatch: function(treeId){
            this.$emit('removePlayerInMatch', treeId);
          }
      },
      beforeCreate: function () {
        this.$options.components.ItemChild = require('./ItemChild.vue').default
      }
  }
</script>
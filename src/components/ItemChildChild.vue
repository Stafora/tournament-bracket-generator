<template>
    <div class="item-child">
        <div class="item">
            <div class="item-parent droppable">
                {{ parent.name }}
            </div>
            <div class="item-childrens" v-if="parent.children">
                <ItemChild 
                    v-for="(child, index) in parent.children"
                    :child="child"
                    :key="index"
                />
            </div>
        </div>
    </div>
</template>

<script>

  export default {
      name: 'ItemChildChild',
      props: {
          parent: Object,
      },
      beforeCreate: function () {
        this.$options.components.ItemChild = require('./ItemChild.vue').default
      }
  }
</script>
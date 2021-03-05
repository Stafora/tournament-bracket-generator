<template>
    <div class="player-item" v-bind:class="{'droppable': droppable, 'fixed': fixed}" v-on:mousedown="onmousedownPlayer" v-on:click="clickPlayerinGrid">
        {{ player.name }}
    </div>
</template>

<script>
  export default {
      name: 'ItemParent',
      /**
       * PROPS
       */
      props: {
          fixed: Boolean,
          droppable: Boolean,
          player: Object,
      },
      /**
       * METHODS
       */
      methods: {
          /**
           * event
           */
          onmousedownPlayer: function (event){
            let self = this;
            let $el = this.$el;
            let shiftX = event.clientX - $el.getBoundingClientRect().left;
            let shiftY = event.clientY - $el.getBoundingClientRect().top;
            let currentDroppable = null;
            // переносит элемент на координаты вашей мышки
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
                $el.style.left = pageX - shiftX + 'px';
                $el.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
                $el.style.visibility = 'hidden'
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                $el.style.visibility = 'visible'

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.droppable');
                if (currentDroppable != droppableBelow) {
                    currentDroppable = droppableBelow;
                }
            }

            //разрешаем передвижение, если имя уже не присвоено в сетку
            if(!$el.classList.contains('fixed')){
                $el.style.position = 'absolute';
                $el.style.zIndex = 3;
                // передвигаем элемент при событии mousemove
                document.addEventListener('mousemove', onMouseMove);
            }

            // отпустить элемент, удалить ненужные обработчики
            $el.onmouseup = function() {
                if (currentDroppable) {
                    $el.style.position = 'inherit';
                    $el.style.left = 0 + 'px';
                    $el.style.top = 0 + 'px';
                    self.$emit('addPlayerInMatch', self.player, currentDroppable.dataset.id);
                } else {
                    $el.style.position = 'inherit';
                    $el.style.left = 0 + 'px';
                    $el.style.top = 0 + 'px';
                }
                document.removeEventListener('mousemove', onMouseMove);
                $el.onmouseup = null;
            };
        },
        /** 
         * event
        */
        clickPlayerinGrid: function(event){
            let self = this;
            let $el = this.$el;
            if($el.classList.contains('fixed')){
                self.$emit('removePlayerInMatch', $el.parentNode.dataset.id);
            }
        }
    }
  }
</script>

<style lang="scss">
    .player-item{
        height: 40px;
        background: #0fc737;
        color: #fff;
        display: flex;
        align-items: center;
        padding: 0px 15px;
        margin-right: 10px;
        cursor: pointer;
    }
</style>
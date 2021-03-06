<template>
    <div>
      <div id="blockWithZoom" class="blockWithZoom"> 
        <Tournament />
      </div>
      <div class="blockWithZoom__info">
        <div>ctrl + mousewheel - приближение и отдаление</div>
        <div>shift + mousewheel - скролл по горизонтали</div>
        <div>alt + mousewheel - скролл по вертикали</div>
      </div>
    </div>

    
</template>

<script>
  import Tournament from '@/components/Tournament.vue'

  export default {
      name: 'Home',
      data(){
        return {
          scale: 1,
          scaleProgress: 0.1,
        }
      },
      components: {
        Tournament,
      },
      mounted() {
        
      },
      created () {
        window.addEventListener('mousewheel', this.handleMousewheel, { passive: false });
      },
      destroyed () {
        window.removeEventListener('mousewheel', this.handleMousewheel);
      },
      methods: {
        handleMousewheel: function (event){
          if(event.ctrlKey == true) {
              event.preventDefault();
              if(event.deltaY > 0) {
                  this.zoomOut();
              }else {
                  this.zoomIn();
              }
          }
        },
        zoomIn: function(event)
        {
          var body = document.querySelector('body');
          this.scale = (this.scale + this.scaleProgress)
          body.style.zoom = this.scale;
          return false;
        },
        zoomOut: function(event)
        {
          var body = document.querySelector('body');
          this.scale = (this.scale - this.scaleProgress)
          body.style.zoom = this.scale;
          return false;
        }
      }
  }
</script>

<style lang="scss">
  .blockWithZoom{
    width: 100%;
    height: 100%;

    &__info{
      position: fixed;
      right: 20px;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: #212121;
      zoom: 1 !important;
      z-index: 5;

      div{
        margin-bottom: 5px;
      }
    }
  }
</style>

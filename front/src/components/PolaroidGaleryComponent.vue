<template>
  <div class="wrapper">
    <div class="item">
      <a href="/planification">
      <div class="polaroid">
        <img src="../assets/images/enjoy.png" alt="img" />
        <div class="bona-nova-regular-italic caption">Activités</div>
      </div>
      </a>
    </div>
    <div class="item">
      <a href="/planification">
      <div class="polaroid">
        <img src="../assets/images/sleep.png" alt="img" />
        <div class="bona-nova-regular-italic caption">Hébergements</div>
      </div>
      </a>
    </div>
    <div class="item">
      <a href="/planification">
      <div class="polaroid">
        <img src="../assets/images/travel.png" alt="img" />
        <div class="bona-nova-regular-italic caption">Transports</div>
      </div>
      </a>
    </div>
    <div class="item">
      <a href="/planification">
      <div class="polaroid">
        <img src="../assets/images/eat.png" alt="img" />
        <div class="bona-nova-regular-italic caption">Restaurants</div>
      </div>
      </a>
    </div>
    <div class="item">
      <a href="/planification">
      <div class="polaroid">
        <img src="../assets/images/drink.png" alt="img" />
        <div class="bona-nova-regular-italic caption">Bars</div>
      </div>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0,0,0,0.2);
  
}
.polaroid > img{
  max-width: 100%;
  height: auto;
}
.caption {
  font-size: 1.8rem;
  text-align: center;
  line-height: 2em;
}
.item {
  width: 20%;
  display: inline-block;
  margin-top: 2rem;
  filter: grayscale(30%);
}
.item .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) {
  transform: scale(0.8, 0.8) rotate(5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+2) {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+2) .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+4) {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+4) .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:nth-of-type(4n+3) {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+3) .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:hover {
  filter: none;
  transform: scale(1, 1) rotate(0deg) !important;
  transition: all 0.35s;
}
.item:hover .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.2);
  transition: all 0.35s;
}


</style>

<template>
  <div class="wrapper">
    <div class="card">
      <div class="front">
        <img :src="require(`@/assets/cards/${pet.img}`)" alt="" />
      </div>

      <div class="back">
        <p>{{ pet.title_cont }}</p>
      </div>
    </div>

    <div class="title">
      <p>{{ pet.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["pet"],

  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  background-color: white;
  padding: 10px;
  margin: 60px 30px;
  outline: 1px solid grey;
  border-radius: 10px;
  min-width: 200px;
  text-align: center;
  height: fit-content;
}

.title p {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}
.card {
  cursor: pointer;
  width: 200px;
  height: 220px;
  position: relative;
}
.front,
.back {
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  transition: 0.5s linear;
}
.front img {
  width: 100%;
  height: 220px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.front {
  transform: perspective(600px) rotateY(0deg);
}
.back {
  width: 100%;
  height: 100%;
  background-color: #ecdc98;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transform: perspective(600px) rotateY(180deg);
}
.back p {
  color: white;
  font-size: 20px;
  padding: 10px;
}
.card:hover > .front {
  transform: perspective(600px) rotateY(-180deg);
}
.card:hover > .back {
  transform: perspective(600px) rotateY(0deg);
}
</style>

<template>
  <v-app>
    <div class="home">
      <Navbar />
      <div class="main">
        <div class="main__text">
          <h1 class="main__title">Твій новий друг</h1>
          <div class="main__content">
            Онлайн-магазин домашніх тварин Прийми правильне рішення не виходячи
            з дому. Дій!
          </div>
          <v-btn class="my-6" elevation="2" dark rounded x-large color="red"
            ><router-link
              to="/news"
              style="text-decoration: none; color: inherit"
              >Подивитись друзів</router-link
            ></v-btn
          >
        </div>
      </div>
      <div class="events-section">
        <div class="events">
          <NewsCard
            v-for="event in events"
            :key="event.id"
            v-bind:event="event"
            class="event-item"
          />
        </div>
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";

export default {
  name: "Home",
  components: {
    Navbar,
    NewsCard,
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-image: url("../assets/home/backpage.png");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .main {
    display: flex;
    width: 80%;
    margin: 8% auto;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .main__text {
      width: 400px;
      text-align: left;
      font-size: 24px;
      .main__title {
        font-size: 36px;
      }
      .main__content {
        font-size: 24px;
      }
    }
  }
}
@media (max-width: 768px) {
  .main__text {
    width: 300px;
    text-align: left;
    .main__content {
      font-size: 16px;
    }
  }
  .main__img {
    img {
      width: 200px;
    }
  }
}
@media (max-width: 600px) {
  .main {
    flex-direction: column;
    height: 90vh;
    margin-top: 4%;
    .main__img {
      img {
        width: 350px;
      }
    }
    .main__text {
      margin-top: 15%;
      text-align: center;
      width: 270px;
    }
  }
}
@media (max-width: 375px) {
  .main {
    .main__text {
      width: 270px;
      .main__content {
        font-size: 14px;
        text-align: center;

        margin-right: 0;
      }
    }
    .main__img {
      img {
        width: 290px;
      }
    }
  }
}

.about {
  margin-top: 8%;
  .title {
    color: #3f51b5;
    font-size: 36px;
    font-weight: 700;
  }
  .about__content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5%;
    .about__text {
      width: 40%;
    }
  }
}

@media (max-width: 700px) {
  .about {
    .about__content {
      flex-direction: column;
      .about__text {
        width: 80%;
      }
    }
  }
}
.events-section {
  margin-top: 5%;
  .title {
    color: rgb(240, 31, 12);
    font-size: 36px;
    font-weight: 700;
  }
  .events {
    display: flex;
    flex-wrap: wrap;
    .event-item {
      width: 90%;
    }
  }
  .events__btn {
    margin-bottom: 5%;
  }
}
.expand-panel {
  width: 90%;
  margin: 5% auto;
  .title {
    margin-bottom: 5%;
    color: #3f51b5;
    font-size: 36px;
    font-weight: 700;
  }
}
</style>

<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img height="240" :src="event.imageUrl"></v-img>
    <v-card-title class="justify-center">{{ event.title }}</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0"> </v-row>
      <div class="my-4 text-subtitle-1">{{ event.location }}</div>
      <div>{{ event.date }}</div>

    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-chip v-for="topic in event.topics" :key="topic" class="ma-2">
            {{ topic }}
          </v-chip>
        </v-list-item-group>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-indigo lighten-2" text :to="'/news/' + event.id">> Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["event"],

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>

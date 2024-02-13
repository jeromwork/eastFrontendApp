<template>
  <div class="searchpanel__fast-links">
    <span class="searchpanel__fast-links__header annotation">Часто ищут:</span>
    <div class="searchpanel__fast-links__items-wrapper">
      <div class="searchpanel__fast-links__items-container">
        <nuxt-link
          v-for="(link, key) in fastLinks"
          :key="key"
          :to="link.url"
          class="searchpanel__fast-links__item">{{link.title}}</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SearchFastLinks",
  data:() => ({
    fastLinks: [
      {'title': 'Невролог', 'url': 'vrachi/nevrolog'},
      {'title': 'УЗИ', 'url': 'vrachi/vrach-uzi'},
      {'title': 'Люмбалгия', 'url': 'zabolevaniya/bolezni-kostno-myshechnoy-sistemy/lyumbalgiya-lechenie'}
    ]
  }),
}
</script>

<style scoped>

</style>

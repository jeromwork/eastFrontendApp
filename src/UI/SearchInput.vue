<script setup lang="ts">




const props = defineProps({
        placeholder:{type:String, default:'', required:false},
        clear:{type:[String, Boolean], default:false, required:false},

        }
)

const model = defineModel<string|null|undefined>();


</script>

<template>

  <div>
      <slot name="leftIcon"></slot>
      <slot name="rightIcon"></slot>
      <slot name="default">
          <input v-model="model" :placeholder="props.placeholder">
      </slot>
  </div>



</template>

<style scoped>

</style>
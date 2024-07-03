<template>
  <div class="modal" v-if="isOpen" @click.self="close">
    <div class="modal__wrapper">
      <div class="modal__title">Edit Vehicle</div>
      <form class="modal__form" @submit.prevent="submit">
        <div class="modal__form-group">
          <label class="modal__label" for="name">Name</label>
          <input class="modal__input" type="text" v-model="form.name" id="name" />
        </div>
        <div class="modal__form-group">
          <label class="modal__label" for="model">Model</label>
          <input class="modal__input" type="text" v-model="form.model" id="model" />
        </div>
        <div class="modal__form-group">
          <label class="modal__label" for="price">Price</label>
          <input class="modal__input" type="number" v-model="form.price" id="price" />
        </div>
        <div class="modal__form-group">
          <button class="modal__submit-btn" type="submit">Save</button>
          <button class="modal__close-btn" type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const form = ref({
  name: '',
  model: '',
  price: 0
})

watch(
  () => props.vehicle,
  (updatedVehicle) => {
    form.value.name = updatedVehicle.name
    form.value.model = updatedVehicle.model
    form.value.price = updatedVehicle.price
  },
  { immediate: true }
)

const submit = () => {
  emit('update', { ...props.vehicle, ...form.value })
}

const close = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  &__label {
    font-size: 16px;
  }

  &__submit-btn,
  &__close-btn {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid transparent;
    font-weight: bold;
    border-radius: 4px;
  }

  &__submit-btn:hover,
  &__close-btn:hover {
    color: white;
  }

  &__close-btn:hover {
    background-color: firebrick;
  }

  &__submit-btn:hover {
    background-color: green;
  }

  &__close-btn:active {
    background-color: darkred;
  }

  &__submit-btn:active {
    background-color: darkgreen;
  }
}
</style>

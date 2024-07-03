<template>
  <div class="vehicle-card">
    <div class="vehicle-card__name">{{ vehicle.name }}</div>

    <div class="vehicle-card__details">
      <div class="vehicle-card__detail">
        <div class="vehicle-card__detail-title">Model</div>
        <div class="vehicle-card__detail-value">{{ vehicle.model }}</div>
      </div>
      <div class="vehicle-card__detail">
        <div class="vehicle-card__detail-title">Year</div>
        <div class="vehicle-card__detail-value">{{ vehicle.year }}</div>
      </div>
      <div class="vehicle-card__detail">
        <div class="vehicle-card__detail-title">Color</div>
        <div class="vehicle-card__detail-value">{{ vehicle.color }}</div>
      </div>
      <div class="vehicle-card__detail">
        <div class="vehicle-card__detail-title">Price</div>
        <div class="vehicle-card__detail-value">{{ vehicle.price }}</div>
      </div>
      <div class="vehicle-card__detail vehicle-card__detail-position">
        <div class="vehicle-card__detail-title">Latitude</div>
        <div class="vehicle-card__detail-value">{{ vehicle.latitude }}</div>
      </div>
      <div class="vehicle-card__detail vehicle-card__detail-position">
        <div class="vehicle-card__detail-title">Longitude</div>
        <div class="vehicle-card__detail-value">{{ vehicle.longitude }}</div>
      </div>
    </div>

    <div class="vehicle-card__buttons">
      <button class="vehicle-card__button vehicle-card__button--edit" @click="openEditModal">
        Edit
      </button>
      <button class="vehicle-card__button vehicle-card__button--delete" @click="removeVehicle">
        Delete
      </button>
    </div>

    <EditVehicle
      :isOpen="isEditModalOpen"
      :vehicle="vehicle"
      @close="closeEditModal"
      @update="updateVehicle"
    />
  </div>
</template>

<script setup>
import EditVehicle from '@/components/EditVehicle.vue'

import { useVehiclesStore } from '@/stores/vehicles'
import { ref, defineProps } from 'vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const store = useVehiclesStore()

const isEditModalOpen = ref(false)

const removeVehicle = () => {
  store.removeVehicle(props.vehicle.id)
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const updateVehicle = (vehicle) => {
  store.editVehicle(vehicle)
  closeEditModal()
}
</script>

<style scoped lang="scss">
.vehicle-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  padding: 20px 15px;

  &:hover {
    border-color: #aaaaaa;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #dddddd;
  }

  &__detail-position {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__button {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid transparent;
    font-weight: bold;
    border-radius: 4px;

    &:hover {
      color: white;
    }
  }

  &__button--edit:hover {
    background-color: blue;
  }

  &__button--delete:hover {
    background-color: firebrick;
  }

  &__button--edit:active {
    background-color: darkblue;
  }

  &__button--delete:active {
    background-color: darkred;
  }
}
</style>

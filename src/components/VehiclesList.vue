<template>
  <div class="vehicles">
    <div class="vehicles__title">Vehicles</div>

    <VehiclesMap />

    <div v-if="store.loading" class="vehicles__loader">Loading...</div>

    <div v-else class="vehicles__content">
      <div class="vehicles__sort">
        <select class="vehicles__sort-select" v-model="selectedSort">
          <option value="year_asc">Year (asc)</option>
          <option value="year_desc">Year (desc)</option>
          <option value="price_asc">Price (asc)</option>
          <option value="price_desc">Price (desc)</option>
        </select>
      </div>

      <div class="vehicles__list">
        <VehicleCard v-for="vehicle in sortedVehicles" :key="vehicle.id" :vehicle="vehicle" />
      </div>
    </div>
  </div>
</template>

<script setup>
import VehicleCard from '@/components/VehicleCard.vue'
import VehiclesMap from '@/components/VehiclesMap.vue'

import { useVehiclesStore } from '@/stores/vehicles'
import { computed, onMounted, ref, watch } from 'vue'

const store = useVehiclesStore()

const selectedSort = ref('year_asc')

const sortedVehicles = computed(() => {
  return store.getSortedVehicles
})

const changeSort = () => {
  const [key, order] = selectedSort.value.split('_')
  store.setSortBy({ key, order })
}

onMounted(() => {
  store.loadFromLocalStorage()
  store.fetchVehicles()
})

watch(selectedSort, changeSort)
</script>

<style scoped lang="scss">
.vehicles {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;

  &__title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }

  &__loader {
    font-size: 24px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  &__sort-select {
    padding: 8px 30px 8px 10px;
    border: 1px solid #f2f2f2;
    background-color: white;
    font-size: 20px;
    cursor: pointer;

    &:focus {
      border-color: black;
    }
  }

  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px 16px;

    @media (max-width: 1650px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media (max-width: 1350px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 1100px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 750px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

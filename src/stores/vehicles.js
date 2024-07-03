// vehicles.js
import { defineStore } from 'pinia'
import { getVehicles } from '@/api/vehicles.js'
import { ref, reactive, computed } from 'vue'

const LOCAL_STORAGE_KEY = 'vehicles'

export const useVehiclesStore = defineStore('vehiclesStore', () => {
  const vehicles = ref([])
  const loading = ref(false)
  const error = ref(null)
  const sortBy = reactive({
    key: 'year',
    order: 'asc'
  })

  const fetchVehicles = async () => {
    loading.value = true
    try {
      const response = await getVehicles()
      vehicles.value = response.data
      saveToLocalStorage()
    } catch (err) {
      error.value = err.message || 'Failed to fetch vehicles.'
    } finally {
      loading.value = false
    }
  }

  const removeVehicle = (id) => {
    vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== id)
    saveToLocalStorage()
  }

  const editVehicle = (updatedVehicle) => {
    const index = vehicles.value.findIndex((vehicle) => vehicle.id === updatedVehicle.id)
    if (index !== -1) {
      vehicles.value[index] = { ...vehicles.value[index], ...updatedVehicle }
      saveToLocalStorage()
    }
  }

  const setSortBy = ({ key, order }) => {
    sortBy.key = key
    sortBy.order = order
    saveToLocalStorage()
  }

  const getSortedVehicles = computed(() => {
    const vehiclesCopy = [...vehicles.value]
    const { key, order } = sortBy

    vehiclesCopy.sort((a, b) => {
      if (key === 'year') {
        return order === 'asc' ? a.year - b.year : b.year - a.year
      } else if (key === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price
      }
      return 0
    })

    return vehiclesCopy
  })

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vehicles.value))
    } catch (err) {
      console.error('Error saving to localStorage:', err)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        vehicles.value = JSON.parse(savedData)
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err)
    }
  }

  return {
    vehicles,
    loading,
    error,
    sortBy,
    fetchVehicles,
    removeVehicle,
    editVehicle,
    setSortBy,
    getSortedVehicles,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})

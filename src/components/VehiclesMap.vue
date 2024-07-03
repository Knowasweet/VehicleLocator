<template>
  <div id="map" class="map"></div>
</template>

<script setup>
import 'ol/ol.css'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { OSM, Vector as VectorSource } from 'ol/source.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { fromLonLat } from 'ol/proj.js'
import { createCircleFeature } from '@/plugins/utils/mapUtils.js'

import { ref, onMounted, watch } from 'vue'
import { useVehiclesStore } from '@/stores/vehicles.js'

const store = useVehiclesStore()

const map = ref(null)
let circleFeatures = null

const addVehiclePoints = () => {
  const features = []
  store.vehicles.forEach((vehicle) => {
    const circleFeature = createCircleFeature(vehicle)
    features.push(circleFeature)
  })
  return features
}

onMounted(() => {
  map.value = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
        visible: true
      }),
      new VectorLayer({
        source: new VectorSource({
          features: circleFeatures
        })
      })
    ],
    target: 'map',
    view: new View({
      center: fromLonLat([95, 65]),
      zoom: 3
    })
  })
})

watch(
  () => store.vehicles,
  () => {
    if (!store.loading && map.value) {
      const vectorSource = map.value.getLayers().getArray()[1].getSource()
      vectorSource.clear()
      vectorSource.addFeatures(addVehiclePoints())
    }
  },
  { immediate: true, deep: false }
)
</script>

<style scoped lang="scss">
.map {
  height: 500px;
  width: 100%;
}
</style>

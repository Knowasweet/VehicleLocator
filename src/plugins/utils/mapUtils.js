import { fromLonLat } from 'ol/proj.js'
import Feature from 'ol/Feature.js'
import { Circle } from 'ol/geom.js'
import { Style } from 'ol/style.js'

export const createCircleFeature = (vehicle) => {
  const columbusCircleCoords = fromLonLat([vehicle.longitude, vehicle.latitude])
  const labelText = `${vehicle.name}-${vehicle.model}`

  const renderLabelText = (ctx, x, y) => {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `bold 20px Inter`
    ctx.fillText(labelText, x, y)
    ctx.strokeText(labelText, x, y)
  }

  const circle = new Circle(columbusCircleCoords, 5)
  const circleFeature = new Feature({
    geometry: circle,
    labelColor: vehicle.color
  })

  circleFeature.setStyle(
    new Style({
      renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates
        const ctx = state.context
        const dx = x1 - x
        const dy = y1 - y
        const radius = Math.sqrt(dx * dx + dy * dy)

        const innerRadius = 0
        const outerRadius = radius * 1.4

        const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius)
        gradient.addColorStop(0, 'rgba(0,0,0,0)')
        gradient.addColorStop(0.6, 'rgba(0,0,0,0.2)')
        gradient.addColorStop(1, 'rgba(0,0,0,0.8)')

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.strokeStyle = 'rgba(0,0,0,0.6)'
        ctx.stroke()

        renderLabelText(ctx, x, y, circleFeature.get('label-color'))
      }
    })
  )
  return circleFeature
}

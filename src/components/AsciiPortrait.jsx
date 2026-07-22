import { useEffect, useRef, useState } from 'react'
import heroImage from '../assets/image.png'

function AsciiPortrait() {
  const canvasRef = useRef(null)
  const [colorMode, setColorMode] = useState('accent') // 'accent' | 'true'

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const image = new Image()

    image.onload = () => {
      // --------------------------------
      // 1. Analyze the original image
      // --------------------------------

      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')

      tempCanvas.width = image.width
      tempCanvas.height = image.height

      tempCtx.drawImage(image, 0, 0, image.width, image.height)

      const imageData = tempCtx.getImageData(0, 0, image.width, image.height)
      const pixels = imageData.data

      // --------------------------------
      // 2. Find the visible image area
      // --------------------------------

      let minX = image.width
      let minY = image.height
      let maxX = 0
      let maxY = 0
      let minBrightness = 255
      let maxBrightness = 0

      for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
          const index = (y * image.width + x) * 4

          const red = pixels[index]
          const green = pixels[index + 1]
          const blue = pixels[index + 2]
          const alpha = pixels[index + 3]

          const brightness = 0.299 * red + 0.587 * green + 0.114 * blue

          if (alpha > 20 && brightness > 10) {
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)

            // Track actual tonal range of the subject
            minBrightness = Math.min(minBrightness, brightness)
            maxBrightness = Math.max(maxBrightness, brightness)
          }
        }
      }

      // --------------------------------
      // 3. Add padding around the image
      // --------------------------------

      const padding = 10

      minX = Math.max(0, minX - padding)
      minY = Math.max(0, minY - padding)
      maxX = Math.min(image.width, maxX + padding)
      maxY = Math.min(image.height, maxY + padding)

      const croppedWidth = maxX - minX
      const croppedHeight = maxY - minY

      // --------------------------------
      // 4. ASCII resolution
      // --------------------------------

      const columns = 80
      const aspectRatio = croppedHeight / croppedWidth
      const rows = Math.floor(columns * aspectRatio * 0.5)

      // --------------------------------
      // 5. Character size
      // --------------------------------

      const cellWidth = 10
      const cellHeight = 16

      canvas.width = columns * cellWidth
      canvas.height = rows * cellHeight

      // --------------------------------
      // 6. Create small canvas for pixel analysis
      // --------------------------------

      const asciiCanvas = document.createElement('canvas')
      const asciiCtx = asciiCanvas.getContext('2d')

      asciiCanvas.width = columns
      asciiCanvas.height = rows

      asciiCtx.drawImage(
        image,
        minX, minY, croppedWidth, croppedHeight,
        0, 0, columns, rows
      )

      // --------------------------------
      // 7. Read ASCII pixels
      // --------------------------------

      const asciiData = asciiCtx.getImageData(0, 0, columns, rows)
      const asciiPixels = asciiData.data

      // --------------------------------
      // 8. ASCII character palette
      // --------------------------------

      const characters = '@%#*+=-:. '

      // --------------------------------
      // 9. Canvas text settings
      // --------------------------------

      ctx.font = `${cellHeight}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Guard against a flat/degenerate range
      const range = Math.max(1, maxBrightness - minBrightness)

      // --------------------------------
      // 10. Convert pixels to ASCII
      // --------------------------------

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const index = (y * columns + x) * 4

          const red = asciiPixels[index]
          const green = asciiPixels[index + 1]
          const blue = asciiPixels[index + 2]

          const brightness = 0.299 * red + 0.587 * green + 0.114 * blue

          // --------------------------------
          // 11. Normalize to actual subject range, then boost contrast
          // --------------------------------

          const normalized = ((brightness - minBrightness) / range) * 255
          const contrast = 1.8

          const adjustedBrightness = Math.min(
            255,
            Math.max(0, (normalized - 128) * contrast + 128)
          )

          // --------------------------------
          // 12. Brightness → ASCII character
          // --------------------------------

          const characterIndex = Math.floor(
            (adjustedBrightness / 255) * (characters.length - 1)
          )

          const character = characters[characterIndex]

          if (character === ' ') continue // skip drawing blank cells entirely

          // --------------------------------
          // 13. Character position
          // --------------------------------

          const drawX = x * cellWidth + cellWidth / 2
          const drawY = y * cellHeight + cellHeight / 2

          // --------------------------------
          // 14. Brightness → color
          // --------------------------------

          if (colorMode === 'true') {
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
          } else {
            // Dense/dark subject pixels = bright, opaque accent
            // Light/background pixels = fade toward transparent
            const t = adjustedBrightness / 255
            const alpha = Math.max(0, 1 - t * 1.1)
            ctx.fillStyle = `rgba(94, 234, 212, ${alpha})` // cyan accent
          }

          // --------------------------------
          // 15. Draw character
          // --------------------------------

          ctx.fillText(character, drawX, drawY)
        }
      }
    }

    image.src = heroImage
  }, [colorMode])

  return (
    <div className="ascii-container">
      <p className="ascii-label"></p>

      <canvas ref={canvasRef} className="ascii-canvas" />

      <p className="ascii-footer">TO DEFINE IS TO LIMIT</p>

      <button
        onClick={() => setColorMode(m => (m === 'accent' ? 'true' : 'accent'))}
        style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.6 }}
      >
        toggle: {colorMode}
      </button>
    </div>
  )
}

export default AsciiPortrait
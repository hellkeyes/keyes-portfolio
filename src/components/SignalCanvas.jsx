import { useEffect, useRef, useState } from 'react'

function HudCanvas() {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('idle') // 'idle' | 'alert' | 'game' | 'gameover'
  const stateRef = useRef({
    ships: [],
    score: 0,
    lives: 3,
    spawnTimer: 0,
    alertTimer: 0,
  })

  const modeRef = useRef(mode)
  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let rotation = 0

    const target = { x: -1000, y: -1000 }
    const displayTarget = { x: -1000, y: -1000 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const spawnShip = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Spawn from a random point on the edge
      const edge = Math.floor(Math.random() * 4)
      let x, y
      if (edge === 0) { x = Math.random() * width; y = -20 }
      else if (edge === 1) { x = width + 20; y = Math.random() * height }
      else if (edge === 2) { x = Math.random() * width; y = height + 20 }
      else { x = -20; y = Math.random() * height }

      const speed = 0.4 + Math.random() * 0.3 + stateRef.current.score * 0.01

      stateRef.current.ships.push({
        x, y, centerX, centerY, speed,
        angle: Math.atan2(centerY - y, centerX - x),
        alive: true,
        hitFlash: 0,
      })
    }

    const drawIdleHud = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      const goalX = target.x > -500 ? target.x : centerX
      const goalY = target.y > -500 ? target.y : centerY
      displayTarget.x += (goalX - displayTarget.x) * 0.08
      displayTarget.y += (goalY - displayTarget.y) * 0.08

      const baseRadius = Math.min(width, height) * 0.15
      ctx.strokeStyle = 'rgba(130, 130, 130, 0.15)'
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.stroke()

      const tickCount = 24
      const tickRadius = 55
      ctx.save()
      ctx.translate(displayTarget.x, displayTarget.y)
      ctx.rotate(rotation)
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2
        const isLong = i % 3 === 0
        const innerR = tickRadius
        const outerR = tickRadius + (isLong ? 10 : 5)
        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR)
        ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
        ctx.strokeStyle = 'rgba(142, 216, 232, 0.5)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()

      ctx.save()
      ctx.translate(displayTarget.x, displayTarget.y)
      ctx.rotate(-rotation * 0.5)
      const bracketR = 35
      const bracketLen = 12
      ;[0, 1, 2, 3].forEach((corner) => {
        const angle = (corner / 4) * Math.PI * 2 + Math.PI / 4
        const cx = Math.cos(angle) * bracketR
        const cy = Math.sin(angle) * bracketR
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle + Math.PI / 4)
        ctx.beginPath()
        ctx.moveTo(-bracketLen / 2, -bracketLen / 2)
        ctx.lineTo(-bracketLen / 2, bracketLen / 2)
        ctx.moveTo(-bracketLen / 2, -bracketLen / 2)
        ctx.lineTo(bracketLen / 2, -bracketLen / 2)
        ctx.strokeStyle = 'rgba(142, 216, 232, 0.8)'
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()
      })
      ctx.restore()

      ctx.beginPath()
      ctx.arc(displayTarget.x, displayTarget.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(142, 216, 232, 0.9)'
      ctx.fill()

      ctx.fillStyle = 'rgba(120, 120, 120, 0.4)'
      for (let i = 0; i < 40; i++) {
        const px = (i * 137.5) % width
        const py = (i * 91.3) % height
        ctx.beginPath()
        ctx.arc(px, py, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      // Hint text
      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
      ctx.textAlign = 'center'
      ctx.fillText('CLICK TO SCAN', centerX, height - 20)
    }

    const drawAlert = () => {
      const width = canvas.width
      const height = canvas.height
      const flash = Math.sin(Date.now() * 0.02) > 0

      ctx.fillStyle = flash ? 'rgba(232, 90, 90, 0.9)' : 'rgba(232, 90, 90, 0.3)'
      ctx.font = 'bold 16px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('!! INCOMING !!', width / 2, height / 2)

      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(150, 150, 150, 0.6)'
      ctx.fillText('THREAT DETECTED — DEFEND', width / 2, height / 2 + 20)
    }

    const drawGame = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const st = stateRef.current

      // Core
      ctx.beginPath()
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(142, 216, 232, 0.8)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(142, 216, 232, 0.5)'
      ctx.fill()

      // Defense ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(130, 130, 130, 0.2)'
      ctx.lineWidth = 0.6
      ctx.stroke()

      // Spawn ships over time
      st.spawnTimer++
      const spawnRate = Math.max(35, 90 - st.score * 2)
      if (st.spawnTimer > spawnRate) {
        spawnShip()
        st.spawnTimer = 0
      }

      // Update + draw ships
      st.ships = st.ships.filter((ship) => {
        if (!ship.alive) return false

        const dx = ship.centerX - ship.x
        const dy = ship.centerY - ship.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 20) {
          st.lives -= 1
          if (st.lives <= 0) {
            setMode('gameover')
          }
          return false
        }

        ship.x += (dx / dist) * ship.speed
        ship.y += (dy / dist) * ship.speed
        ship.angle = Math.atan2(dy, dx)

        if (ship.hitFlash > 0) ship.hitFlash -= 0.05

        // Draw as a small triangle ship
        ctx.save()
        ctx.translate(ship.x, ship.y)
        ctx.rotate(ship.angle)
        ctx.beginPath()
        ctx.moveTo(8, 0)
        ctx.lineTo(-6, 5)
        ctx.lineTo(-6, -5)
        ctx.closePath()
        ctx.strokeStyle = ship.hitFlash > 0
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(232, 120, 90, 0.85)'
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()

        return true
      })

      // HUD text
      ctx.font = '11px monospace'
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(142, 216, 232, 0.8)'
      ctx.fillText(`SCORE: ${st.score}`, 12, 18)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(232, 120, 90, 0.8)'
      ctx.fillText(`LIVES: ${'▮'.repeat(Math.max(0, st.lives))}`, width - 12, 18)
    }

    const drawGameOver = () => {
      const width = canvas.width
      const height = canvas.height
      const st = stateRef.current

      ctx.font = 'bold 16px monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(232, 90, 90, 0.85)'
      ctx.fillText('SIGNAL LOST', width / 2, height / 2 - 10)

      ctx.font = '11px monospace'
      ctx.fillStyle = 'rgba(150, 150, 150, 0.7)'
      ctx.fillText(`FINAL SCORE: ${st.score}`, width / 2, height / 2 + 12)
      ctx.fillText('CLICK TO RESTART', width / 2, height / 2 + 32)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (modeRef.current === 'idle') {
        drawIdleHud()
      } else if (modeRef.current === 'alert') {
        drawAlert()
        stateRef.current.alertTimer++
        if (stateRef.current.alertTimer > 60) {
          stateRef.current.alertTimer = 0
          setMode('game')
        }
      } else if (modeRef.current === 'game') {
        drawGame()
      } else if (modeRef.current === 'gameover') {
        drawGame() // freeze last frame of ships behind text
        drawGameOver()
      }

      rotation += 0.006
      animationId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
    }

    const handleMouseLeave = () => {
      target.x = -1000
      target.y = -1000
    }

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const clickY = event.clientY - rect.top
      const st = stateRef.current

      if (modeRef.current === 'idle') {
        st.ships = []
        st.score = 0
        st.lives = 3
        st.spawnTimer = 0
        st.alertTimer = 0
        setMode('alert')
        return
      }

      if (modeRef.current === 'gameover') {
        setMode('idle')
        return
      }

      if (modeRef.current === 'game') {
        // Shoot nearest ship within click radius
        let hit = null
        let hitDist = Infinity
        st.ships.forEach((ship) => {
          const d = Math.hypot(ship.x - clickX, ship.y - clickY)
          if (d < 24 && d < hitDist) {
            hit = ship
            hitDist = d
          }
        })
        if (hit) {
          hit.alive = false
          st.score += 1
        }
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="signal-canvas" style={{ cursor: 'crosshair' }} />
}

export default HudCanvas
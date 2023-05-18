import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import HighScores from '../views/HighScores.vue'

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game
  },
  {
    path: '/high-scores',
    name: 'HighScores',
    component: HighScores
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

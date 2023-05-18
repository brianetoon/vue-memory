<template>
   <div class="high-scores">
      <h2>High Scores</h2>
      <h3>Coming soon!</h3>
      <button class="accent-btn" @click="goHome">
         Go Back Home
      </button>
   </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
   setup() {
      const router = useRouter()
      const goHome = () => router.push('/')

      return { goHome }
   }
}
</script>

<style>
.high-scores {
   margin: 20px auto;
   text-align: center;
}
.high-scores h3 {
   margin: 5px 0;
}
.high-scores button {
   margin-top: 10px;
}
</style>
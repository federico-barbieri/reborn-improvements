<template>
    <div class="DefaultLayout">
        <ul>
            <li><nuxt-link to="/">HOME</nuxt-link></li>
             <li><nuxt-link to="/About">About</nuxt-link></li>  
      </ul>
        <slot />
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
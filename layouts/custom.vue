<template>
    <div class="CustomLayout">
        <ul>
            <li><nuxt-link to="/">HOME</nuxt-link></li>
            <li><nuxt-link to="/Account">account</nuxt-link></li>  
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
<template>
    <div class="card">
        <div class="img-container">
            <img src="/daycare.jpg" alt="img">
        </div>
        <div class="text">
            <p class="name"><strong>{{ name }}</strong></p>
            <p class="address"><em>{{ address }}</em></p>
            <span class="area">{{ area }}</span>

            <button>More Info</button>

        </div>
        

    </div>
</template>

<script setup>

const props = defineProps({
    name: String,
    address: String,
    area: String,
})

</script>

<style scoped>

.card{
    border: 1px solid white;
    padding: 1rem;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1rem auto;
}

.img-container{
    width: 35%;
    height: 100%;
}

img{
    width: 100%;
    height: auto;
}

.text{
    width: 70%;
    height: auto;
    margin: 0 0 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
}

button{
    width: 8rem;
    height: 2rem;
    margin: 2rem 0 0 0;
    cursor: pointer;
    transition: all 0.5s ease-in;
}

button:hover{
    background-color: hotpink;
    color: black;
}

</style>
<script setup>


// supabase 

import { supabase } from '../lib/supabase.js'


const loading = ref(false)
const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    loading.value = true

    let { data, error } = await supabase.auth.signInWithOtp({
        email: email.value,
})

    
    if (error) throw error
    alert('Check your email for the login link!')
  } 
  catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}









// bar chart 
import BarChart from '../components/BarChart.vue'


// main navigation array

const items = [
  {
  label: 'Home',
  slot: 'home'
  }, 
  {
  label: 'Overview',
  slot: 'problematic'
  }, 
  
  //{
  //label: 'Types of institutions',
  //slot: 'institutions'
  //}, 
  {
  label: 'About us',
  slot: 'about'
  },
  {
  label: 'Contact',
  slot: 'contact'
  }
]


// institutions array


const institutions = [
  {
  label: 'Montessori',
  slot: 'montessori'
  }, 
  {
  label: 'Rudolph Steiner',
  slot: 'steiner'
  }, 
  {
  label: 'International',
  slot: 'international'
  }
]

// about us - FAQ array


const faq = [
  {
  label: 'Why are public daycares not included? ',
  content: 'The public system evaluates and analyses many different variables regarding the whole family.'
  }, 
  {
  label: 'Does it cost money to use the platform?',
  content: 'No. Using the platform is totally free.'
  }, 
  {
  label: 'How many sign ups can I have?',
  content: 'You can sign up your children to as many waiting lists as you want.'
  }
]


// measure viewport's width

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
      accordionOrientation.value = windowWidth.value < 1200 ? 'horizontal' : 'vertical';
};

const handleResize = () => {
      updateWindowWidth();
};


// accordion 

const accordionOrientation = ref('vertical');


// marquee

let arrayOfDaycares = ['Aalholm', '|', 'Bonsai', '|', 'Margrethe', '|', 
                      'Soria Moria', '|', 'Leo', '|', 'Pakhuset', '|', 'Giraffen', '|', 'Rooftop', '|', 
                      'Kastanjehuset', '|', 'Garnison Sogns', '|', 'Trinitatis', '|', 'Sanna', '|',
                      'Tiny Tots', '|', 'Lygten', '|', 'Sandloppen', '|', 'Sankt Petri', '|', 'Flyvefisken', '|',
                      'Nordstjernen', '|', 'Montessori', '|', 'Tusindfryd']





onMounted(() => {
      window.addEventListener('resize', handleResize);
    });


</script>

<template>
  <div 
  class="w-screen h-screen m-0 p-0 font-mono" 
  :style="{
  'background-color': '#35354A', 
  color: 'white', 
  height: windowWidth < 1200 ? 'auto' : '100vh', 
  overflow: 'hidden'
  }">
  
    <header class=" mx-auto  w-screen h-full m-0 p-0">
        <nav class="mx-auto  w-screen h-full p-0 flex flex-col text-center">

          <p class="font-sans pt-10 pb-5 text-5xl">REBØRN</p>

          <UTabs 
          :ui="{ list: { tab: { active: 'bg-blue-500' } } }" 
          :items="items" 
          :orientation="windowWidth > 768 ? 'horizontal' : 'vertical'"
          class="container mx-auto text-center h-full place-content-center pt-5 w-10/12" >
      
                <template #home="{ item }" >

                    <div 
                    class="container mx-auto flex flex-col items-center" 
                    :style="{
                    height: windowWidth < 768 ? '80vh' : '70vh', 
                    display: 'flex', 
                    'align-items': 'center', 
                    'justify-content': windowWidth < 768 ? 'flex-start' : 'center',
                    margin: windowWidth < 1200 ? '2rem auto 5rem auto' : '',
                    }">                     
                    

                    <h1 
                    class="mt-10" 
                    :style="{
                    'font-size': windowWidth < 400 ? '2rem' : (windowWidth < 1200 ? '3rem' : '5rem'), 
                    'font-family': 'Raleway, sans-serif', 
                    'font-weight': 'bold',
                    }">
                    Waiting lists for private daycares in Copenhagen
                    </h1>

                    <p 
                    class="mt-5 text-lg" 
                    :style="{
                    'font-family': 'Raleway, sans-serif', 
                    'font-size': windowWidth < 400 ? '1rem' : '',
                    }">
                      Sign up your children in an easy and transparent way.
                    </p>

                    <Vue3Marquee
                    :gradient="true"
                    gradient-color="[53, 53, 74]"
                    gradientLength="30%"
                    :style="{
                    margin: '2rem auto',
                    width: windowWidth < 500 ? '100%' : '50%',
                    }"
                    duration="50"
                    
                     >
                        <p
                            v-for="(daycare, index) in arrayOfDaycares"
                            :key="index"
                            style="margin-right: 0.5rem; color: #F3F4F6; opacity: 0.5;"
                          >
                            {{ daycare.toUpperCase() }}
                        </p>
                    </Vue3Marquee>

                          <form class="row flex-center flex mt-10 text-center" @submit.prevent="handleLogin" style="font-family: 'Raleway', sans-serif;">
                                    <div class="col-6 form-widget">
                                      <div>
                                        <input class="inputField border border-black-500 p-1 dark:text-white text-black" required type="email" placeholder="Your email" v-model="email" style="width: 11rem;" />

                                      </div>

                                  
                                      <div>
                                        <input
                                          type="submit"
                                          class="button block cursery text-center dark:bg-white-500 dark:text-white"
                                          :value="loading ? 'Loading' : 'Sign up'"
                                          :disabled="loading"
                                          style="
                                          background-color: #7DCC7F;
                                          color: #35354A;
                                          border: 1px solid white; 
                                          padding: 0.5rem 1rem; 
                                          margin: 1rem auto;
                                          width: 11rem;
                                          font-size: 1.2rem;
                                          transition: background-color 0.3s ease;"
                                          onmouseover="this.style.backgroundColor='#F8F6F6'" 
                                          onmouseout="this.style.backgroundColor='#7DCC7F'"
                                          
                                        />
                                      </div>
                                    </div>
                            </form>


                    </div>  

                </template>

                <template #problematic="{ item }">

                  <div 
                  class="container mx-auto flex flex-row" 
                  :style="{
                  height: windowWidth < 768 ? '80vh' : '70vh', 
                  margin: windowWidth < 1200 ? '2rem auto 5rem auto' : '',
                  display: 'flex', 
                  'flex-direction': windowWidth < 1200 ? 'column' : 'row',
                  'align-items': 'center', 
                  'justify-content': 'center',
                  }">


                    <div 
                    :style="{
                    padding: '1rem',
                    }">

                    <h2 
                    :style="{
                    'font-size': windowWidth < 400 ? '1.5rem' : (windowWidth < 1200 ? '2rem' : '3rem'),
                    'width': windowWidth < 1200 ? '100%' : '80%', 
                    'text-align': windowWidth < 700 ? 'center' : 'left', 
                    'font-family': 'Raleway, sans-serif', 
                    'font-weight': 'bold',
                    margin: '0 auto 1rem 0',

                    }">
                    Daycare overview in Copenhagen
                  </h2>

                      <div 
                      :style="{
                      'width': windowWidth < 1200 ? '100%' : '80%', 
                      'text-align': 'left', 
                      'font-family': 'Raleway, sans-serif',
                      }">

                        <p style="font-family: 'Raleway', sans-serif; font-size: 1rem; max-width: 60ch;">
                        Signing up to daycares is a project in itself. <br><br>
                 
                        Each institution has its own rules, opening hours and waiting list systems. <br><br>
         
                        Rebørn by Waitly is a centralized platform, where one can find every private daycare
                        in Copenhagen and sign up to waiting lists without opening dozens of tabs.
                      </p>
                        
                        
                      </div>
                      
                      
                      
                    </div>


                        <BarChart />

                  </div>


                </template>

                <template #institutions="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div>

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left; font-family: 'Raleway', sans-serif; font-weight: bold;" class="mr-5">Types of institutions</h2>

                      <p class="text-left mt-5" style="max-width: 60ch; font-family: 'Raleway', sans-serif;">
                        Many institutions have their own methodologies. 
                        Other follow specific beliefs. 

                        Click on each tab to see more information. 
                      </p>
                      
                    
                    </div>


                    <UTabs :items="institutions"  orientation="vertical" class="container mx-auto w-2/5 px-3 mx-3">

                      <template #montessori="{ item }">
                        
                          <p class="text-left pt-3" style="font-family: 'Merriweather';">
                            Montessori is a method of education that is based on self-directed activity, 
                            hands-on learning and collaborative play. In Montessori classrooms children make 
                            creative choices in their learning, while the classroom and the highly trained teacher 
                            offer age-appropriate activities to guide the process.
                          </p>
                        
                      </template>

                      <template #steiner="{ item }">
                        
                        <p class="text-left pt-3" style="font-family: 'Merriweather';">
                          Steiner teachers aim to create an environment that facilitates children´s 
                          self-directed free play. In Steiner philosophy, free play supports the proper development 
                          of the will, and children are trusted to work out identities, relationships, 
                          fantasy and reality for themselves through play.
                        </p>
                      
                    </template>

                    <template #international="{ item }">
                        
                        <p class="text-left pt-3" style="font-family: 'Merriweather';">
                          Focuses on the 4 domains of learning: Social and Emotional Development, Language Development, 
                          Cognitive Development and Physical Development. learning and growth in these areas are encouraged 
                          by offering developmentally appropriate learning experiences.  
                        </p>
                      
                    </template>
                    
                    </UTabs>

                    </div>


                </template>

                <template #about="{ item }" class="text-center">

                  <div 
                  class="container mx-auto flex" 
                  :style="{
                  height: windowWidth < 768 ? '80vh' : '70vh', 
                  display: 'flex', 
                  width: '100%',
                  'align-items': 'center', 
                  'justify-content': 'center',
                  'flex-direction': windowWidth < 1200 ? 'column' : 'row', 
                  margin: windowWidth < 1200 ? '5rem auto' : '',
                  }">

                    <div 
                    :style="{
                    width: windowWidth < 768 ? '100%' : (windowWidth < 1200 ? '70%' : '50%'),

                    }">
                    

                      <h2 
                       :style="{
                      'font-size': windowWidth < 400 ? '1.5rem' : (windowWidth < 1200 ? '2rem' : '3rem'),
                      'width': '100%', 
                      'text-align': windowWidth < 1200 ? 'center' : 'left', 
                      'font-family': 'Raleway, sans-serif', 
                      'font-weight': 'bold',
                      margin: '0 auto 1rem auto',
                      }"
                      >About us</h2>

                      <div
                      :style="{
                      width: '100%',
                      'text-align': 'left',
                    }"
                      >

                        <p 
                        style="
                        max-width: 50ch; 
                        font-family: 'Raleway', sans-serif;">
                        Rebørn is an initiative by Waitly.dk. <br><br>
                        It's name comes from <strong>reimagining</strong> how parents 
                        can access waiting lists combined with <strong><em>børn</em></strong>, 
                        the word for <strong><em>children</em></strong> in Danish. <br><br>
                        Its aim is to make the daycare category more accessible and transparent. <br><br>

                      </p>


                      </div>

                      

                    </div>

                   <div 
                   :style="{
                   height: '100%', 
                   width: windowWidth < 768 ? '100%' : (windowWidth < 1200 ? '70%' : '50%'),
                   margin: windowWidth < 768 ? '2rem auto' : '',
                   display: 'flex', 
                   'flex-direction': 'row',
                   'align-items': 'center', 
                   'justify-content': 'center',
                   }">

                   

                      <UAccordion 
                      :ui="{item: { color: 'text-white, dark:text-white'}, default: { variant: 'ghost'}}" 
                      size="sm" 
                      :items="faq"  
                      :orientation="accordionOrientation" 
                      :style="{
                      width: '100%',
                      }" 
                      class=" mx-auto px-3 text-left">
                        
                      
                      </UAccordion>

                    </div>
                   

                      

                   
                  </div>


                </template>

                <template #contact="{ item }">

                  <div 
                  class="container mx-auto flex flex-col items-center" 
                  :style="{
                  height: windowWidth < 1200 ? '80vh' : '70vh', 
                  display: 'flex', 
                  'flex-direction': windowWidth < 1200 ? 'column' : 'row', 
                  margin: windowWidth < 1200 ? '5rem auto 2rem auto' : '',
                  'align-items': 'center', 
                  'justify-content': windowWidth < 1200 ? 'flex-start' : 'space-around',
                  }">

                    <div 
                    :style="{
                    width: windowWidth < 1200 ? '90%' : (windowWidth < 768 ? '100%' : '50%'),
                    }">

                          <h2 
                          :style="{
                          'font-size': windowWidth < 1200 ? '2rem' : (windowWidth < 400 ? '1.5rem' : '3rem'),
                          'width': '100%', 
                          'text-align': windowWidth < 1200 ? 'center' : 'left', 
                          'font-family': 'Raleway, sans-serif', 
                          'font-weight': 'bold',
                          margin: '0 auto 1rem auto',
                          }">
                          Contact
                          </h2>

                          <div style="width: 100%; text-align: left;">

                            <p style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                            reborn-waitinglists@gmail.com <br><br>
                            Or give us a call on 52221989, Monday to Friday from 9 to 13.
                          </p>


                          </div>


                  </div>

                  <div 
                  :style="{
                  width: windowWidth < 1200 ? '90%' : (windowWidth < 768 ? '100%' : '50%'),
                  margin: windowWidth < 1200 ? '2rem auto' : '',
                  }">
                  <img style="max-width: 100%; height: auto;" src="../assets/dreng.jpg" alt="">  
                  </div>


                  </div>

                </template>




          </UTabs>
          
          
          
        </nav>

      

      </header>
  
  
  </div>
</template>

<style scoped>

.my-custom-tabs .list {
  background-color: transparent;
}


  .cursery{
      cursor: pointer;
  }

.custom-bg {
    background-image: url('../assets/pige.jpg');
  }


</style>
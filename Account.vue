<script setup>


import { supabase } from '../lib/supabase.js'
import { onMounted, ref, toRefs } from 'vue'


const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)


// NOTIFICATIONS 

const toast = useToast()

// USER ////////////////////
const name = ref('')

let fetchedFullName = ref('')


async function getProfile() {
      try {
        loading.value = true
        const { user } = session.value

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`full_name`)
          .eq('id', user.id)

        if (error && status !== 406) throw error

        if (data && data.length > 0) {
        fetchedFullName.value = data[0].full_name;
        }

        
      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }
}

async function updateProfile() {
    try {
      loading.value = true
      const { user } = session.value

      const updates = {
        id: user.id,
        full_name: name.value,
      }

      fetchedFullName = name.value;

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
}



async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

// DAYCARES ////////////////////

const daycareTabs = [{
  label: 'Filters',
  slot: 'filters'
}, {
  label: 'Map',
  slot: 'map'
},{
  label: 'Distance',
  slot: 'distance'
}]

const daycares = ref([])

async function getDaycares(){

if(selectedAreaForFiltering.value == '' || selectedAreaForFiltering.value == 'All'){

let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')
  
  daycares.value = fetchedDaycares


} else{

  let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')
  .eq('area', selectedAreaForFiltering.value)

  
  daycares.value = fetchedDaycares

}

}


// daycare modal

let daycareModalisOpen = ref(false)
let daycareId = ref()
let daycareName= ref('');
let daycareAddress = ref('');
let daycareArea = ref('');
let daycareOpeningHours = ref('');
let daycarePedagog = ref()
let daycareOrganicMeals = ref(null);
let daycareWebsite = ref('');
let daycareCost = ref(null);
let daycareEmail = ref('');
let daycareNumber = ref(null);
let daycareTypeOfInstitution = ref()

async function activateModal(selectedDaycare){

  try {
        loading.value = true

        const { data, error, status } = await supabase
          .from('daycares')
          .select('*')
          .eq('id', selectedDaycare.id)

        if (error && status !== 406) throw error

        if (data && data.length > 0) {

          daycareId.value = data[0].unique_id;
          
          daycareName.value = data[0].name;
          daycareAddress.value = data[0].address;
          daycareArea.value = data[0].area;
          daycareOpeningHours.value = data[0].opening_hours;
          daycareOrganicMeals.value = data[0].organic_meals;
          daycareWebsite.value = data[0].website;
          daycareCost.value = data[0].cost;
          daycareEmail.value = data[0].email;
          daycareNumber.value = data[0].phone;
          daycarePedagog.value = data[0].pedagog_ratio;
          daycareTypeOfInstitution.value = data[0].type_of_institution;

          daycareModalisOpen.value = true;
        }

        
      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }
}

// this stores the message the parent sends to the daycare

let messageToDaycare = ref('');

// this stores the kid the parent chooses to apply to a daycare

let selectedKidForSubscription = ref();


async function applyToDaycare(){

  try {

    // add subscription cost to total cost
    currentTotalSubscriptionCost.value += daycareCost.value;

    // create a random num and store it as the child's position in the waiting list
    let positionInWaitingList = Math.floor(Math.random() * 200 + 1);

  // this will store the selected child's id to send as part of the subscription

    let childObject = children.value.filter((kid) => kid.name == selectedKidForSubscription.value);

    let childId = childObject[0].id;
    let childName = childObject[0].name;
  
 
      loading.value = true
      const { user } = session.value

      const addNewSubscription = {

        parent_id: user.id,
        child_id: childId,
        child_name: childName,
        daycare_id: daycareId.value,
        daycare_name: daycareName.value,
        message: messageToDaycare.value,
        created_at: new Date().toISOString(),
        parent_name: name.value,
        waiting_list_cost: daycareCost.value,
        num_in_waitinglist: positionInWaitingList
      }

      const { error } = await supabase.from('subscriptions').upsert(addNewSubscription)

      if (error) throw error
      toast.add({ title: 'Application sent succesfully!' })
    
    
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      messageToDaycare.value = "";
      selectedKidForSubscription.value = ""; 
      subscriptions.value = '';
      getSubscriptions();

    }
}

// DAYCARE filters

let areaOptions = ['All', 'Amager', 'Vesterbro, Kgs. Enghave og Valby', 'Nørrebro', 'Brønshøj, Husum og Vanløse', 'Inner City', 'Østerbro', 'Bispebjerg'];

let selectedAreaForFiltering = ref('');

// filter through daycares based on listening to changes in selectedAreaForFiltering ref

watch(selectedAreaForFiltering, () => {

  getDaycares();
  

});

// map

const mapIsOpen = ref(true)

//////////////////////// CALENDLY

const calendly = useCalendly()

const calendlyBtn = {
  url: 'https://calendly.com/rebornwaitinglists/30min',
  text: 'Plan a visit'
}

const calendlyBtnAttachedToSlider = ref()

useCalendlyEventListener({
  onDateAndTimeSelected: event => {
        },
 })

 function generateCalendlyLink(daycare) {
  return `https://calendly.com/rebornwaitinglists/30min?daycare=${encodeURIComponent(daycare)}`;
}







// CHILDREN ////////////////////

// this stores the data coming from the database

let children = ref()

// this tells me if there are any kids

let childrenExist = ref(false);

// this is where i store only the names of the children

let childrenNames = ref()

// this is how i transform childrenNames into an array of objects
// to be used in the "select" element inside of the daycare slider

const childrenOptions = ref()




async function getChildren(){

  children.value = '';

    const { user } = session.value


    const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id);



        if (data && data.length > 0) {
          childrenExist.value = true;

          // store the children array          
          children.value = data;

          // store the children names
          childrenNames.value = children.value.map(child => child.name);

          // turn the children names' variable into an array of objects
          childrenOptions.value = childrenNames.value.map(name => ({ label: name, value: name }));

      } else{
        childrenExist.value = false;
      }

      if (error) {
        console.error('Error fetching children:', error.message);
        return;
      }
}


// add child profile

let kidName = ref('');
let kidCpr = ref('')
let kidStartingDate = ref();

// let user know kid name is wrong
let changeKidName = ref(false);

// let user know cpr is wrong
let changeKidCpr = ref(false);


// test kid name

function  isKidNameValid(name) {
      const namePattern = /^[a-zA-ZøØ\s]+$/;
      if(namePattern.test(name) || kidName.value == ''){
      changeKidName.value = false;
    } else {
      changeKidName.value = true;
    }
    }


  // test kid cpr

function  isKidCprValid(cpr) {
      const numberPattern = /^\d{10}$/;
      if(numberPattern.test(cpr) || kidCpr.value == ''){
      changeKidCpr.value = false;
    } else {
      changeKidCpr.value = true;
    }
    }

watch(kidName, () => {

isKidNameValid(kidName.value)


});

watch(kidCpr, () => {

isKidCprValid(kidCpr.value)


});



async function addKid(){

  if(!changeKidName.value && !changeKidCpr.value){


  try {
      loading.value = true
      const { user } = session.value

      const addNewKid = {

        parent_id: user.id,
        name: kidName.value,
        cpr: kidCpr.value,
        expected_start_date: kidStartingDate.value,
      }

      const { error } = await supabase.from('children').upsert(addNewKid)

      if (error) throw error
      toast.add({ title: 'Profile added succesfully!' })
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      getChildren()
      kidName.value = "";
      kidCpr.value = "";
      kidStartingDate.value = '';
    }

  } else{
    toast.add({ title: 'Incorrect filling of form' })

  }

}


async function removeKid(kidId) {
    try {
        const { data, error } = await supabase
            .from('children')
            .delete()
            .eq('id', kidId);

        if (error) {
            console.error('Error removing child:', error.message);
            toast.add({ title: 'Failed to remove child profile!', variant: 'error' });
        } else {
            toast.add({ title: 'Child profile removed successfully!' });
            await getChildren(); 
            await getSubscriptions();
        }
    } catch (err) {
        console.error('An unexpected error occurred:', err.message);
        toast.add({ title: 'Unexpected error occurred!', variant: 'error' });
    }
}


// SUBSCRIPTIONS ////////////////////

// this stores the data coming from the database

let subscriptions = ref()

// this tells me if there are any kids

let subscriptionsExist = ref(false);

async function getSubscriptions(){

  currentTotalSubscriptionCost.value = 0;

  const { user } = session.value


    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('parent_id', user.id);



        if (data && data.length > 0) {
          subscriptionsExist.value = true;

          // store the subscriptions array          
          subscriptions.value = data;
          subscriptions.value = subscriptions.value.reverse();

          subscriptions.value.forEach(element => {
            currentTotalSubscriptionCost.value += element.waiting_list_cost;
          });

      } else{
        subscriptionsExist.value = false;

      }

      if (error) {
        console.error('Error fetching subscriptions:', error.message);
        return;
      }

}

// cancel subscription

async function cancelSubscription(chosenSubscription){

  try {
        const { data, error } = await supabase
            .from('subscriptions')
            .delete()
            .eq('id', chosenSubscription.id);

        if (error) {
            console.error('Error removing subscription:', error.message);
            toast.add({ title: 'Failed to remove subscripton!', variant: 'error' });
        } else {
            toast.add({ title: 'Subscription removed successfully!' });
            subscriptionsExist.value = false;
            subscriptions.value = '';            

            await getSubscriptions(); 
        }
    } catch (err) {
        console.error('An unexpected error occurred:', err.message);
        toast.add({ title: 'Unexpected error occurred!', variant: 'error' });
    }

}


// sum of every subscription this user has

let currentTotalSubscriptionCost = ref(0);



// measure viewport's width

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
};

const handleResize = () => {
      updateWindowWidth();
};


/// INITIALIZE


onMounted(() => {
  getProfile();
  getDaycares();
  getChildren();
  getSubscriptions();

  window.addEventListener('resize', handleResize);

  getDaycaresForDistance()

})

// tabs from nuxt ui

const items = [{
  
  slot: 'children',
  label: 'My children'
},
{
  slot: 'daycares',
  label: 'Daycares'
},
{
  slot: 'subscriptions',
  label: 'Subscriptions'
}]


// CALCULATE DISTANCE //////////

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {

  console.log("init");
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers


  calculatedDistance.value = distance.toFixed(2);


}



let userLatitude = ref();
let userLongitude = ref();

let daycareLatitude = ref();
let daycareLongitude = ref();

let calculatedDistance = ref(0);

let userAddress = ref()


// GEOLOCATE A PLACE

const accessToken = 'pk.eyJ1Ijoic2xvZ2FsYW5kIiwiYSI6ImNscGRjdndoMTB2NXUycXByODI3emJ3M20ifQ.T-e8tPTL8Bo3n2KeCQaWOg';



async function lookForStuff() {
  const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userAddress.value)}.json?access_token=${accessToken}`;

  try {
    const response = await fetch(geocodingEndpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const coordinates = data.features[0].geometry.coordinates;
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    userLatitude = latitude;
    userLongitude = longitude;

    // Update the distance calculation here
    const selectedDaycare = selectedDaycareForDistance.value;
    if (selectedDaycare) {
      await getCoordinatesForDistance(selectedDaycare);
      getDistance(daycareLatitude, daycareLongitude, userLatitude, userLongitude);
    }
  } catch (error) {
    console.error('There was a problem fetching the geocoding data:', error);
  }
}


// WHEN THE USER SELECTS A DAYCARE, WE EXTRACT LAT AND LONG

let listOfDaycareDistanceOptions = ref([])


async function getDaycaresForDistance(){

let { data: fetchedNames, error } = await supabase
  .from('daycares')
  .select('name')

  for(let i = 0; i<fetchedNames.length; i++){
    listOfDaycareDistanceOptions.value.push(fetchedNames[i].name)  
  }
  

}



let selectedDaycareForDistance = ref('');

// filter through daycares based on listening to changes in selectedAreaForFiltering ref

watch(selectedDaycareForDistance, () => {

  calculatedDistance.value = 0;
getCoordinatesForDistance(selectedDaycareForDistance.value)
  

});

async function getCoordinatesForDistance(selectedDaycare) {
  try {
    const { data: fetchedCoordinates, error } = await supabase
      .from('daycares')
      .select('longitude, latitude')
      .filter('name', 'eq', selectedDaycare)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    daycareLongitude = fetchedCoordinates.longitude;
    daycareLatitude = fetchedCoordinates.latitude;
  } catch (error) {
    console.error('Error fetching daycare coordinates:', error);
  }
}




</script>

<template>
    <div class="main" style="background-color: #35354A;">

      <!--HEADER-->

      <header class="w-full" style="display: flex; align-items: center; justify-content: center;">
        
      <nav class="flex flex-row align-center justify-center" style="border-bottom: 1px solid #1a1a20; display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 90%;">
        
        <p class="font-sans pt-10 pb-5 text-5xl text-white">REBØRN</p>

        <p style="
        cursor: pointer;
        margin-top: 1rem;
        "
        @click="signOut"
        onmouseenter="this.style.borderBottom = '1px solid red'"
        onmouseleave="this.style.borderBottom = ''"
        class="text-white"
        >Log out
        </p>

        
        </nav>  
        
        
      </header>


<!-- IF THIS IS THE FIRST TIME THE USER LOGGED IN, THEY WILL BE ASKED TO PROVIDE A NAME-->

<div v-if="!fetchedFullName" 
:style="{
width: windowWidth < 768 ? '90vw' : '80vw', 
height: windowWidth < 768 ? '90vh' : '80vh', 
margin: '0 auto', 
display: 'flex',
'flex-direction': windowWidth < 768 ? 'column' : 'row', 
'align-items': 'center', 
'justify-content': windowWidth < 768 ? 'center' : 'space-around',
}">
  <form  class="form-widget" @submit.prevent="updateProfile" 
  :style="{
  width: windowWidth < 768 ? '100%' : '30%', 
  height: '50%', 
  display: 'flex', 
  'flex-direction': 'column', 
  'align-items': 'center', 
  'justify-content': 'space-around', 
  border: '1px solid white',
  margin: windowWidth < 768 ? '3rem auto 1rem auto' : '',
  }">
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
      <label style="color: gray;" for="email">Email</label>
      <input style="width: 80%; margin-top: 0.5rem; color: gray;" id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
      <label for="name">Name</label>
      <input style="width: 60%; margin-top: 0.5rem;" id="name" type="text" v-model="name" />
    </div>

    <div style="width: 100%; display: flex; justify-content: space-around;">
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
        style="
        border: 1px solid white;
        padding: 0.5rem;
        cursor: pointer;
        "
      />
    </div>


  </form>
  <div 
  :style="{
  width: windowWidth < 768 ? '100%' : '50%', 
  height: '100%', 
  display: 'flex', 
  'align-items': 'center',
  }">
    <img src="../assets/pige.jpg" style="max-width: 100%; height: auto;" />
  </div>
  
  
  
  </div>
  <!-- ELSE, WE WILL ALREADY HAVE THEIR NAME-->

<div 
class="mainDivIfInfoIsAvailable dark:text-white text-black" 
v-else 
style="
width: 80vw;
height: 85vh; 
overflow: hidden;
">

  <h1
  class="font-sans text-white"
  style="
  margin: 1rem auto 1rem;
  "
  >
  Hello {{fetchedFullName}}!</h1>

  <UTabs 
  :items="items"
  :orientation="windowWidth > 768 ? 'horizontal' : 'vertical'"
  :style="{
  width: windowWidth < 768 ? '90%' : '100%',
  margin: '0 auto',
  height: '100%'
  }"
  :ui="{ list: { tab: { active: 'bg-blue-500' } } }">


    <!--CHILDREN-->



    <template #children="{ item }">

      <div 
      :style="{
      'display': 'flex', 
      'flex-direction': windowWidth < 768 ? 'column' : 'row', 
      'align-items': 'center', 
      'justify-content': 'space-around', 
        width: windowWidth < 768 ? '90%' : '80%', 
        height: '100%', 
        margin: windowWidth < 768 ? '2rem auto' : '0 auto', 
      }">


        <div 
        :style="{
        width: windowWidth < 768 ? '100%' : '40%', 
        height: windowWidth < 768 ? 'auto' : '100%',
        'margin-top': windowWidth < 768 ? '2rem' : '',
        padding: windowWidth < 768 ? '1rem' : '', 
        color: 'white',
        }">
          

          <p v-if="!childrenExist" class="text-white" style="margin: 3rem auto;">You haven't added any children yet.</p>
  
  
          <form 
          action="submit" 
          @submit.prevent="addKid" 
          :style="{
          width: windowWidth < 768 ? '90%' : '60%', 
          height: windowWidth < 768 ? 'auto' : '90%',
          margin: windowWidth < 768 ? '0 auto 3rem auto' : '',
          }">
            
            <UFormGroup label="Name" class="mb-5" :ui="{label: {base: 'block font-medium text-white dark:text-white'}}">
                      <UInput placeholder="Your child's name" v-model="kidName" />
                      <span style="color: red;" v-if="changeKidName">Only letters are allowed!</span>

            </UFormGroup>
  
            <UFormGroup label="CPR" class="mb-5" :ui="{label: {base: 'block font-medium text-white dark:text-white'}}">
                      <UInput placeholder="Your child's CPR" v-model="kidCpr" />
                      <span style="color: red;" v-if="changeKidCpr">Enter valid CPR number!</span>

            </UFormGroup>

            <UFormGroup label="Expected start" class="mb-5" :ui="{label: {base: 'block font-medium text-white dark:text-white'}}">
                      <UInput placeholder="Expected starting date" v-model="kidStartingDate" type="date" />
            </UFormGroup>
  
            
            <button 
            style="
            padding: 0.5rem; 
            border: 1px solid white;
            transition: background-color 0.5 ease;
            background-color: #7DCC7F;
            color: black;
            "
             onmouseover="this.style.backgroundColor='black', this.style.color='white'" 
              onmouseout="this.style.backgroundColor='#7DCC7F', this.style.color='black'"
            >Add new profile</button>
            
            
            </form>
  
          </div>

        <ul 
        v-if="children" 
        :style="{
        width: windowWidth < 768 ? '90%' : '70%',
        height: windowWidth < 768 ? 'auto' : '450px',
        'overflow-y': windowWidth < 768 ? '' : 'auto',
        margin: windowWidth < 768 ? '' : '2rem 0',
        }">
   
                <UCard 
                :ui="{background:'dark:bg-transparent bg-transparent'}" 
                v-for="child in children" 
                :key="child.id"
                style="
                margin: 1.5rem auto;
                border: 1px solid white;
                color: white;
                "
                >
                    <template #header>
                      <h2><strong>Name: {{ child.name }}</strong></h2>
                    </template>

                    <div>
                      <p><em>CPR: {{ child.cpr }}</em></p>
                    </div>

                    <div>
                      <p><em>Expected start: {{ new Date(child.expected_start_date).toLocaleDateString('en-GB') }}</em></p>
                    </div>

                    <template #footer>
                      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around; width: 100%;">
                        <button 
                        @click="$emit(removeKid(child.id))" 
                        style="
                        border: 1px solid white; 
                        padding: 0.5rem;
                        transition: background-color 0.5s ease;
                        color: white;
                        "
                         onmouseover="this.style.backgroundColor='#F33232', this.style.color='black'" 
                          onmouseout="this.style.backgroundColor='', this.style.color='white'"
                        >
                        REMOVE
                        </button>
                      </div>
                     
                    </template>
                </UCard>
        </ul> 


             
        
      
      
        </div>


</template>


<!--DAYCARES-->

    <template #daycares="{ item }">

      <div name="daycareContainer" style="width: 100%; height: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; color: white;">
        
        
      

      <UTabs 
      :ui="{ list: { tab: { active: 'bg-blue-500' }, width: 'w-36'  } }" 
      :items="daycareTabs" 
      orientation="vertical" 
      :style="{
      width: '100%', 
      height: '100%',
      display: 'flex',
      'flex-direction': windowWidth < 768 ? 'column' : 'row',
      'margin': windowWidth < 768 ? '3rem auto 5rem auto' : '0',
      'align-items': 'center',
      'justify-content': 'space-between'
      }">
        
        <template #filters = {item}>
          

                  <!--FILTERS-->

                  

                        <div 
                        v-if="daycares.length > 0"
                        :style="{
                        width: '100%',
                        display: 'flex',
                        'flex-direction': windowWidth < 768 ? 'column' : 'row',
                        'align-items': 'center',
                        padding: '1rem',
                        'justify-content': 'flex-end'}"
                        >


                              <!--FILTER BY AREA-->

                              <USelect
                              style="width: 100%"
                              placeholder="Filter by area"
                              :options="areaOptions"
                              v-model="selectedAreaForFiltering"
                              icon="i-heroicons-magnifying-glass-20-solid"
                              />       
                        
                        


            
            
            
                          <div 
                          :style="{
                          width: windowWidth < 768 ? '100%' : '60%',
                          }
                          ">

                                <ul 
                                v-if="daycares.length > 0" 
                                class="daycare-ul w-full" 
                                :style="{
                                'padding-inline-start': '0',
                                width: '100%',
                                color: 'white',
                                height: windowWidth < 768 ? 'auto' : '550px',
                                'list-style': 'none',
                                'overflow-y': windowWidth < 768 ? 'hidden' : 'auto',
                                padding: '1rem',
                                }">



              
                          
                                      <UCard 
                                      :ui="{background: 'dark:bg-transparent bg-transparent'}" 
                                      as="div" 
                                      v-for="daycare in daycares" 
                                      :key="daycare.id" 
                                      :style="{
                                      width: windowWidth < 768 ? '100%' : '90%', 
                                      color: 'white',
                                      margin: '1.5rem 0',
                                      }"
                                      >

                                    



                                                <template #header>
                                                  <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 100%;">
                                                  <h2><strong>{{ daycare.name }}</strong></h2>
                                                  <UBadge :ui="{variant: {solid: 'bg-blue-500 dark:bg-blue-500 dark:text-white'}}">{{ daycare.type_of_institution }}</UBadge>
                                                </div>
                                                </template>

                                                <div>
                                                  <p><em>{{ daycare.address }}</em></p>
                                                  <span>{{ daycare.area }}</span> <br><br>
                                                  <p><em>Pedagog to child ratio: {{ daycare.pedagog_ratio }}:1</em></p>
                                                </div>


                                                <template #footer>
                                                  <button @click="activateModal(daycare)"  class="moreInfoBtn">SUBSCRIBE</button>
                                                </template>
                                        </UCard>
                                  </ul> 
                            
                          </div>

                        </div>

                        <USlideover  
                        v-model="daycareModalisOpen"
                        :ui="{width: 'w-full md:w-screen max-w-md sm:w-2/4'}"
                        :style="{
                          width: windowWidth < 500 ? '70%' : (windowWidth < 768 ? '80%' : ''),
                          margin: windowWidth < 768 ? '0 0 0 auto' : '',
                        }"
                        >
                            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', background: 'dark:bg-transparent'}">
                  

                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%">

                                  <!--
                                      <div style="width: 70%;">
                                          <img src="../assets/pige.jpg" alt="" style="max-width: 100%; height: auto; border-radius: 30px;">
                                        
                                        </div>

                                      -->

                                      

                                        <h3 
                                        :style="{
                                        'width': windowWidth < 500 ? '100%' : '90%', 
                                        'font-size': windowWidth < 500 ? '1rem' : '1.5rem', 
                                        'text-align': 'center', 
                                        'margin-bottom': '1rem',
                                        }"
                                        >
                                        {{ daycareName }}
                                        </h3>

                                        <UDivider color="gray" orientation="horizontal" />

                                        

                                        <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-around; width: 100%; margin: 2rem auto;">
       

                                              <p v-if="windowWidth > 500" style="font-size: 1rem; margin-bottom: 0.5rem;">Area: <br> <strong>{{ daycareArea }}</strong></p>
                                              <p style="font-size: 1rem; margin-bottom: 0.5rem;">Opening hours: <br> <strong>{{ daycareOpeningHours }}</strong></p>

                                              <p style="font-size: 1rem;">Pedagog to children ratio: <br> <strong>{{ daycarePedagog }}:1</strong></p>

                                              <div class="calendlyBtn" ref="calendlyBtnAttachedToSlider">
                                       
                                       <CalendlyPopupButton
                                       :url="generateCalendlyLink(daycareName)"
                                       text="Plan a visit"
                                       v-bind="calendlyBtn"
                                       :root-element="calendlyBtnAttachedToSlider"
                                       @eventCreated="useCalendlyEventListener"                                       
                                       style="
                                       background-color: #65A9DB;
                                       padding: 0.5rem;
                                       margin: 1rem 0 1rem 0;
                                       transition: background-color 0.3s ease;
                                      "
                                      onmouseover="this.style.backgroundColor='#7DCC7F'" 
                                      onmouseout="this.style.backgroundColor='#65A9DB'"
                                       
                                       />

                                     </div>

                                              <UDivider color="gray" orientation="horizontal" />

                                        </div>

                                        <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-around; width: 100%">
                                          
                                          <span style="font-size: 1rem; display: flex; flex-direction: row; align-items: center;">
                                            <UIcon 
                                            name="i-heroicons-arrow-long-right-solid"
                                            />
                                            <a 
                                            style="
                                            margin-left: 0.5rem; 
                                            transition: margin-left 0.5s ease-in;"
                                            onmouseenter="this.style.marginLeft = '1rem'"
                                            onmouseleave="this.style.marginLeft = '0.5rem'"
                                            :href=daycareWebsite target="_blank">Visit Website</a>
                                          </span>
                                          
                                           <span style="font-size: 1rem; display: flex; flex-direction: row; align-items: center;">
                                            <UIcon name="i-heroicons-arrow-long-right-solid" />
                                            <a 
                                            style="
                                            margin-left: 0.5rem; 
                                            transition: margin-left 0.5s ease-in;"
                                            onmouseenter="this.style.marginLeft = '1rem'"
                                            onmouseleave="this.style.marginLeft = '0.5rem'"
                                            target="_blank" 
                                            :href="'mailto:' + daycareEmail + '?subject=Waiting%20list'">Send Email</a>                                          
                                          </span>
                                          
                                          <span style="margin-top: 1rem;">
                                            <UIcon style="margin-right: 0.25rem;" name="i-heroicons-phone-20-solid" />
                                            {{ daycareNumber }}</span>

                                         

                                        </div>

                                      
                                  

                                  </div>

                                    
                                    <h3 style="text-align: center; margin: 1rem auto;">Apply to this daycare</h3>

                                    <USelect
                                    placeholder="Select child"
                                    :options="childrenOptions"
                                    v-model="selectedKidForSubscription"
                                    />

                                    

                                    <UTextarea class="mt-5" :rows="2" size="xl" color="gray" v-model="messageToDaycare" placeholder="(OPTIONAL) Send a message to the daycare.." />

                                    <UButton 
                                      :ui="{rounded: ''}" 
                                      :style="{
                                      
                                      'text-align': 'center', 
                                      'margin-top': '1.5rem',
                                      }"
                                      @click="applyToDaycare"
                                      >SUBSCRIBE
                                      </UButton>
                  
                                
                            
                              </UCard>
            
                      </USlideover>
          
          
          </template>

          <template #map = {item}>

          <!--SEE MAP-->

          <Map />

          
          </template>

             <!--DISTANCE-->

             <template #distance = {item}>

<div style="height: 65vh; width: 100%; border: 1px solid red; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: space-around;">


              <UFormGroup label="My address" class="mb-5" :ui="{label: {base: 'block font-medium text-white dark:text-white'}}">
                      <UInput placeholder="My address" v-model="userAddress" />

              </UFormGroup>

              <USelect
              class="mb-5"
              style="width: 100%"
              placeholder="Select daycare"
              :options="listOfDaycareDistanceOptions"
              v-model="selectedDaycareForDistance"
              icon="i-heroicons-magnifying-glass-20-solid"
              />  

              
              
            <UButton @click="() => lookForStuff(daycareLatitude, daycareLongitude)">Calculate distance</UButton>  


            <p class="mt-5">Distance is {{ calculatedDistance }} km</p>


                                 
  
  
</div>


</template>

        
    
          </UTabs>
      </div>
    
    </template>

    

<!--SUBSCRIPTIONS-->


<template #subscriptions="{ item }">

  <div 
  :style="{
  display: 'flex', 
  'flex-direction': windowWidth < 768 ? 'column' : 'row', 
  'align-items': 'center', 
  'justify-content': 'center', 
  width: '100%',
  height: '100%', 
  margin: '0 auto',
  }">


    <div 
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      'align-items': !subscriptionsExist ? 'center' : 'flex-start',
      }">

      <p class="text-white dark:text-white" style="width: 100%; text-align: center; margin-top: 10rem;" v-if="!subscriptionsExist">You haven't applied to any daycare yet.</p>


      <div v-if="subscriptions" 
      :style="{
      display: 'flex', 
      'flex-direction': windowWidth < 768 ? 'column-reverse' : 'row', 
      'align-items': 'flex-start', 
      'justify-content': 'space-around', 
      width: '100%',
      height: '100%',
      margin: windowWidth < 768 ? '2rem auto 1rem auto' : '0 auto',
      }">
        
        
      
        <ul 
        :style="{
        width: windowWidth < 768 ? '100%' : '60%', 
        height: windowWidth < 768 ? 'auto' : '600px',
        'overflow-y': windowWidth < 768 ? 'hidden' : 'auto',
        'text-align': 'center',
        padding: '1rem 0 3rem 0',
        }">

          <UCard 
          :ui="{background: 'dark:bg-transparent bg-transparent'}" 
          v-for="subscription in subscriptions" 
          :key="subscription.id" 
          :style="{
          width: windowWidth < 768 ? '100%' : '80%',
          color: 'white',
          margin: '1.5rem auto',
          border: windowWidth < 768 ? '1px solid white' : '',
          }"
          >


              <template #header>
                <h2>Application for: <strong>{{ subscription.daycare_name }}</strong></h2>
              </template>

              <div style="text-align: left;">
                <p class="address" style="margin-bottom: 1rem;"><em>Subscription of: <br> <strong>{{ subscription.child_name }}</strong></em></p>
                <span class="area">Message sent to daycare: <br> <strong>{{ subscription.message }}</strong></span>
                <span style="display: block; margin: 1rem 0;">Date of application: <br> <strong>{{ new Date(subscription.created_at).toLocaleDateString('en-GB') }}</strong></span>
                <span style="display: block;">Yearly cost: <br> <strong>{{ subscription.waiting_list_cost }} DKK</strong></span>

                <span style="display: block; margin: 1rem 0;">Waiting list position:</span>
                <span class="text-blue-500" style="
                border: 1px solid white; 
                padding: 0.5rem;
                border-radius: 30px;
                background-color: white;
                 
                "><strong>{{ subscription.num_in_waitinglist }}</strong></span>


              </div>

              <UButton 
                  :ui="{rounded: '', default: {color: 'bg-red-500'}}" 
                  style="
                  background-color: transparent;
                  border: 1px solid white;
                  color: white;
                  width: auto; 
                  text-align: left; 
                  margin-top: 1.5rem;
                  "
                  onmouseenter="this.style.color = 'white', this.style.backgroundColor = 'red'"
                  onmouseleave="this.style.color = 'white', this.style.backgroundColor = 'transparent'"
                  @click="(() => cancelSubscription(subscription))"
                  >CANCEL SUBSCRIPTION
              </UButton>

          </UCard>
        </ul> 

        <div 
        :style="{
        width: windowWidth < 768 ? '100%' : '40%', 
        height: windowWidth < 768 ? 'auto' : '60vh',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'text-align': 'center',
        margin: windowWidth < 768 ? '2rem auto 0 auto' : '',
        }">
        <p class="text-white dark:text-white" style="width: 100%"><strong>You're currently spending {{ currentTotalSubscriptionCost }} DKK / year.</strong></p>
        
        </div>

      </div>

    </div>


  </div>

 




</template>






  </UTabs>

  </div>  
</div>
</template>

<style scoped>

.main{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0rem auto;
    padding: 1rem;
}

h1{
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
}

.moreInfoBtn{
    width: 8rem;
    background-color: #7DCC7F;
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.1s ease-in;
    color: black;
}

.moreInfoBtn:hover{
    background-color: black;
    color: white;
}


@media only screen and (max-width: 768px){

  .main{
    width: 100vw;
    height: auto !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0rem auto;
    padding: 1rem;
  }

  h1{
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

  .mainDivIfInfoIsAvailable{
    width: 100vw !important;
    height: 110vh !important;
    overflow: auto !important;
  }


/* daycares */





}



</style>

<template>
     <div style="width: 100%; height: 60vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">


                        
            <MapboxMap
            
            v-if="mapIsOpen"
            map-id="map"
            :style="{
            width: windowWidth < 768 ? '100%' : '90%',
            height: '100%',
            margin: windowWidth < 768 ? '5rem auto 0 auto' : '',
            }"
            :options="{
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [12.545607, 55.671999], // starting position
            zoom: 11 // starting zoom
            }"
               
            >
            <MapboxGeocoder
            v-bind="address"
            />



            <MapboxDefaultMarker 
            marker-id="marker_nordstjeren"
            :options="{}"
            :lnglat="[ 12.503210197810002, 55.65959084761282]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_nordstjeren"
                :lnglat="[12.503210197810002, 55.65959084761282]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Nordstjernen
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>


            <MapboxDefaultMarker 
            marker-id="marker_aalholm"
            :options="{}"
            :lnglat="[ 12.487253626646192, 55.67212717841523]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_aalholm"
                :lnglat="[12.487253626646192, 55.67212717841523]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Aalholm
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_bonsai"
            :options="{}"
            :lnglat="[ 12.589013016507991, 55.681436843470664]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_bonsai"
                :lnglat="[12.589013016507991, 55.681436843470664]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Bonsai
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_margrethe"
            :options="{}"
            :lnglat="[ 12.49370112664497, 55.648127129140185]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_margrethe"
                :lnglat="[12.49370112664497, 55.648127129140185]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Margrethe Sogns
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_baggers"
            :options="{}"
            :lnglat="[ 12.531553068977512, 55.71785062142954]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_baggers"
                :lnglat="[12.531553068977512, 55.71785062142954]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Hedevig Baggers
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Nurnberggaarden"
            :options="{}"
            :lnglat="[ 12.600735726645713, 55.662494501633105]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Nurnberggaarden"
                :lnglat="[12.600735726645713, 55.662494501633105]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Nürnberggaarden
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Kirsebergarden"
            :options="{}"
            :lnglat="[ 12.622171497810259, 55.663850198279654]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Kirsebergarden"
                :lnglat="[12.622171497810259, 55.663850198279654]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Kirsebærgården
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Amsterdamvej"
            :options="{}"
            :lnglat="[ 12.617595968973847, 55.649006388873865]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Amsterdamvej"
                :lnglat="[12.617595968973847, 55.649006388873865]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Amsterdamvej
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Studenterradets"
            :options="{}"
            :lnglat="[ 12.550917382469677, 55.69599634587544]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Studenterradets"
                :lnglat="[12.550917382469677, 55.69599634587544]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Studenterrådets
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Risle"
            :options="{}"
            :lnglat="[ 12.608393768974327, 55.656785999710785]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Risle"
                :lnglat="[12.608393768974327, 55.656785999710785]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Småbørnsgruppen Risle
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Kastanjehuset"
            :options="{}"
            :lnglat="[ 12.475626755483178, 55.69800643597934]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Kastanjehuset"
                :lnglat="[12.475626755483178, 55.69800643597934]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Kastanjehuset
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_moria"
            :options="{}"
            :lnglat="[ 12.635825055480556, 55.648771527745716]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_moria"
                :lnglat="[12.635825055480556, 55.648771527745716]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Soria Moria
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_leo"
            :options="{}"
            :lnglat="[ 12.479723397812835, 55.71204914663627]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_leo"
                :lnglat="[12.479723397812835, 55.71204914663627]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Leo
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Pakhuset"
            :options="{}"
            :lnglat="[ 12.487755668976847, 55.70438437142559]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Pakhuset"
                :lnglat="[12.487755668976847, 55.70438437142559]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Pakhuset
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Garnison"
            :options="{}"
            :lnglat="[ 12.589975397811125, 55.68180100506369]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Garnison"
                :lnglat="[12.589975397811125, 55.68180100506369]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Garnison Sogns
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Gronnebakken"
            :options="{}"
            :lnglat="[ 12.50791831130507, 55.692715679745724]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Gronnebakken"
                :lnglat="[12.50791831130507, 55.692715679745724]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                Grønnebakken
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Carolineskolen"
            :options="{}"
            :lnglat="[ 12.557895997813304, 55.7221136689662]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Carolineskolen"
                :lnglat="[12.557895997813304, 55.7221136689662]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Carolineskolen
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Trinitatis"
            :options="{}"
            :lnglat="[ 12.574581540139967, 55.680906364541485]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Trinitatis"
                :lnglat="[12.574581540139967, 55.680906364541485]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Trinitatis Menigheds
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Nova"
            :options="{}"
            :lnglat="[ 12.469164955484286, 55.71825183416288]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Nova"
                :lnglat="[12.469164955484286, 55.71825183416288]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Nova
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>


            <MapboxDefaultMarker 
            marker-id="marker_Lonneberg"
            :options="{}"
            :lnglat="[ 12.545892240139342, 55.668730784549375]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Lonneberg"
                :lnglat="[12.545892240139342, 55.668730784549375]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Lønneberg
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Stefansgardens"
            :options="{}"
            :lnglat="[ 12.54269125363382, 55.690938346909626]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Stefansgardens"
                :lnglat="[12.54269125363382, 55.690938346909626]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Stefansgårdens
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Sanna"
            :options="{}"
            :lnglat="[ 12.554369226647774, 55.701527567792574]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Sanna"
                :lnglat="[12.554369226647774, 55.701527567792574]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Sanna
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_bonsai_opsamling"
            :options="{}"
            :lnglat="[ 12.518173068974596, 55.74985767933489]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_bonsai_opsamling"
                :lnglat="[12.518173068974596, 55.74985767933489]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Bonsai/Opsamling
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

              <MapboxDefaultMarker 
            marker-id="marker_Giraffen"
            :options="{}"
            :lnglat="[ 12.611837784316604, 55.658296954691224]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Giraffen"
                :lnglat="[12.611837784316604, 55.658296954691224]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Giraffen
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Valby_Folkebornehave"
            :options="{}"
            :lnglat="[ 12.518173068974596, 55.662650994174825]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Valby_Folkebornehave"
                :lnglat="[12.518173068974596, 55.662650994174825]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Valby Folkebørnehave
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>


            <MapboxDefaultMarker 
            marker-id="marker_Larkelunden"
            :options="{}"
            :lnglat="[ 12.542921555481062, 55.65890720111965]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Larkelunden"
                :lnglat="[12.542921555481062, 55.65890720111965]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Lærkelunden
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Lillekilde"
            :options="{}"
            :lnglat="[ 12.519947726645265, 55.65331366470554]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Lillekilde"
                :lnglat="[12.519947726645265, 55.65331366470554]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Lillekilde
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Rooftop"
            :options="{}"
            :lnglat="[ 12.576843355479676, 55.63138862195914]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Rooftop"
                :lnglat="[12.576843355479676, 55.63138862195914]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Rooftop
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_tots"
            :options="{}"
            :lnglat="[ 12.507526084316705, 55.660194807321396]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_tots"
                :lnglat="[12.507526084316705, 55.660194807321396]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Tiny Tots
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_safa"
            :options="{}"
            :lnglat="[ 12.530885011305386, 55.69911366490343]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_safa"
                :lnglat="[12.530885011305386, 55.69911366490343]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Børnehuset SAFA
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_nokken"
            :options="{}"
            :lnglat="[ 12.530885011305386, 55.69911366490343]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_nokken"
                :lnglat="[12.530885011305386, 55.69911366490343]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Nøkken
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Lygten"
            :options="{}"
            :lnglat="[ 12.536668397812285, 55.702241920713]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Lygten"
                :lnglat="[12.536668397812285, 55.702241920713]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Lygten
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Sandloppen"
            :options="{}"
            :lnglat="[ 12.62705426897476, 55.66500833280627]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Sandloppen"
                :lnglat="[12.62705426897476, 55.66500833280627]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Sandloppen
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_petri"
            :options="{}"
            :lnglat="[ 12.570316255482208, 55.679739158972936]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_petri"
                :lnglat="[12.570316255482208, 55.679739158972936]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Sankt Petri Skoles
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_montessori_international"
            :options="{}"
            :lnglat="[ 12.525869068974671, 55.66417083982478]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_montessori_international"
                :lnglat="[12.525869068974671, 55.66417083982478]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Montessori International
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_valby_borneasyl"
            :options="{}"
            :lnglat="[ 12.514695097810339, 55.665911139389046]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_valby_borneasyl"
                :lnglat="[12.514695097810339, 55.665911139389046]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Valby Børneasyl
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Dansk-Franske"
            :options="{}"
            :lnglat="[ 12.5398344266482, 55.70998423968244]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Dansk-Franske"
                :lnglat="[12.5398344266482, 55.70998423968244]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Dansk-Franske Børnehave
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_bornegalaxen"
            :options="{}"
            :lnglat="[ 12.503218899701235, 55.65874204431931]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_bornegalaxen"
                :lnglat="[12.503218899701235, 55.65874204431931]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Børnegalaxen Valby
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Standkvarterets"
            :options="{}"
            :lnglat="[ 12.56764902664833, 55.71248467794224]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Standkvarterets"
                :lnglat="[12.56764902664833, 55.71248467794224]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Standkvarterets
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_STusindfryd"
            :options="{}"
            :lnglat="[ 12.505477297810243, 55.66447865119055]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_STusindfryd"
                :lnglat="[12.505477297810243, 55.66447865119055]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Tusindfryd
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>

            <MapboxDefaultMarker 
            marker-id="marker_Flyvefisken"
            :options="{}"
            :lnglat="[ 12.505477297810243, 55.66447865119055]"
            >

                <MapboxDefaultPopup  
                popup-id="popup_Flyvefisken"
                :lnglat="[12.505477297810243, 55.66447865119055]"
                :options="{
                    closeOnClick: true
                }"
                >
                <span class="test" style="color: black;">
                    Flyvefisken
                </span>
                
                </MapboxDefaultPopup>

            </MapboxDefaultMarker>


            </MapboxMap>


</div>
    
</template>

<script setup>

const mapIsOpen = ref(true)


// measure viewport's width

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
};

const handleResize = () => {
      updateWindowWidth();
};


/*
async function showStuff() {
    console.log("sup")
  try {
    
    const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/ingerslevsgade%20146.json?proximity=ip&access_token=pk.eyJ1Ijoic2xvZ2FsYW5kIiwiYSI6ImNscGRjcWZ6NTB1cm0yanByYTk4cmF3cncifQ.B9KFZPHWLdwwy6JnK1ZtWg'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Process the received data here
    console.log(data);
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    // Handle errors gracefully
    return null;
  }
}

*/



/// INITIALIZE


onMounted(() => {

  window.addEventListener('resize', handleResize);
//  showStuff();

})






</script>

<style scoped>


.test{
  width: 100px;
  font-size: 1rem;
  color: black;

}


</style>
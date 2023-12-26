Improvements for this project include:

- **A distance tracker**, that measures the distance between daycares and the user's address. **(DONE)**

  How it works

The user adds their address, which is geocoded using Mapbox's Geocoding API and turned into coordinates (latitude and longitude).

When the user selects a daycare to measure the distance, we store the daycare name and make a get request to Supabase filtering through the daycares table with that name.

When we get the daycare, we extract its latitude and longitude coordinates.

By comparing the user coordinates with the daycares' coordinates using the Haversine formula, we can figure out the distance in km.



- **Daycare badge**, to separate vuggestue from børnehave

    How it works

  By adding a new column called "type" to the daycare's table in Supabase, we can show a small badge with either "Vuggestue" or "Bornehave".


- **Daycare filter**, to filter between vuggestuer and bornehaver. **WIP**



Ethan Anderson
info 474 hw3
collective-action-vis
https://aethanol.github.io/collective-action-vis/

## Description
For this assignment I present an interactive visualization of protests in the United States, as reported by the New York Times from 1960 to 1996. Peaceful protests are a keystone of the democratic process, and it is important for people to understand the form protests have taken in the United States over the years. This visualization attempts to convey meaning in the frequency of protests over time, and the location in which the protests happened.

The story I want to illustrate is related to the assignment prior, which has given me key insights into the structure and types of things that can be shown by this dataset. Each entry of the dataset has a location of city and state associated with it, with additional information about the number of protesters at an event and other related information about things like police presence and violence. The two main things I want to focus on are the location in which protests happened as geo coordinate quantitative interval data, and the number of protesters at each event which is quantitiative ratio data. I know that both of these data types are best represented by position and then size, so I hope to put the locations on a geo map as position, and represent the number of protesters at each event by the size of a circle at the geo coordinate position. I will hopefully make the map interactive, so the user will be able to click on a dot and see a detailed view of the data at that point like the title of the NYTimes article, and the number of protesters. This will be supported by a zoomable interface so people can know more about the location in which protests actually happened.

Here I show a few mockups of the visualization that I wish to build. 
![mockup 2](/images/vis1.jpg)
![mockup 1](/images/vis2.jpg)

## Final Visualization
I successfully maped geocoordinates of protests to geolocations on a topographical map in D3. I built a topojson representation of the united states using the cli topojson toolset. Each of the protests is represented by a red dot with size varying as the number of protesters at an event. I was unable to get zooming to work without glitching, so I ended up removing that part of the visualization. Each of the dots is selectable, and when you click on it a tooltip will pop up with the specific detauls of the data at that point. I did add a few things from my initial conceptualization, and have an overall view of the frequency of protests per year, and I made that interactive as brushing and linking. If you brush the sliders over the frequency graph, it will hide and unhide the dots that correspond to the year in which is selected on the map. 

The development of this assignment was pretty painful, D3 is not very intuitive to me and I often found myself confused as to what the code was doing in examples I saw. Through a lot of practice I did start to get a little better at developing this, and eventually found that it wasn't so hard. I did get stuck on one bug for almost a week, where I couldn't figure out how to project the dots onto the location of the map properly. It ended up being a scale issue which I found very deep into a stackoverflow post! It's not well documented in the api docs either..
I spend about 20 hours on this assignment, with the most amount of time going to figuring out how to map dots to a topojson in D3.

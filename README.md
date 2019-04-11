# Interactive Frontend Development: Data Dashboard - Milestone 2 - International Visitors to London

## [International Visitors to London](https://eileenpeacock.github.io/milestone2-data_dashboard/)

## UX

**Code Institute project brief for Milestone 2:** 

>CREATE A DATA DASHBOARD 
>
>Build a data dashboard that visualizes a dataset of your choice.
>
>Your data can be stored locally (e.g., in a js file) or sourced from an API.
>
>Visualise your data using D3.js and dc.js


This is a data dashboard of international visitors visiting London.  Data dashboards are best viewed full screen By clicking on the various charts & drop down menu, the user can interact with the charts to see the time spent, the reason for the visit, how much was spent and where the visitors originated from as well as the mode of transport used to get to London.  

I chose this dataset as London has an ever constant flow of foreign tourists and visitors and I was intrigued what the figures would look like.  I sourced the dataset from [The Mayor of London's](https://data.london.gov.uk/dataset/number-international-visitors-london) website  which had figures from the Office of National Statistics.  Using the downloaded csv file, I manipulated the data to include regional areas which was more easily to grasp & handle than only the various countries visiting London.  This grouping was based on the [United Nations's](https://www.internetworldstats.com/list1.htm#geo) groupings of countries in regions.  

The colour palette for the graphs were based on the various tube lines on the [London Underground](https://en.wikipedia.org/wiki/Tube_map) in order of opening of each tube line. 

A json file was created from the manipulated csv file on the following website. https://www.csvjson.com/csv2json

This webpage was created, the second milestone project, as part of the Code Institute ‘Full Stack Development’ course.  
The deployed version of the data dashboard can be viewed at: https://eileenpeacock.github.io/milestone2-data_dashboard/


### User Stories:

Potential users of this data dashboard could be: 
The Tourism Industry - Hotel & Bed & Breakfast Industry, Restuarants, Airlines, Souvenir Vendors, Event planners, Local shops
Government Agencies & Mayoral Office - Tourism promotion, Road & travel maintenance, Event Planning 
General public

As this is an interactive data dashboard, clicking on any of the charts changes the data in the other charts/graphs.  A user is able to drill down to see more useful information for mode of transport, the spend, how long a visitor spent in London, what was their reason for being there and how many visitors from each country and region.  

Goverment agency users:
This would be useful for government agencies to target specific counties for tourism advertisments.  Also, knowing when the visitors were the hightest to target when to do major works on the infrastructure.

Tourism industry users:
Knowing which market to target.  Which countries have the largest spend and their mode of arrival to London.  Airlines/Hoteliers can target specific countries with special offers.

Examples of User Stories:
- Click on Regional chart and see which are the top 10 territories in that region by spend.  Hover over the country and the user can see the total spend for that country.  Percentage of mode of transport to arrive in London is shown with the number of visitors shown when hovering over each specific type of travel. 
- Click on top 10 country and see the percentage of type of mode of travel to get to London.  This narrows down the region they are from and includes the total spend.  
- Click on a type of mode of transport and see which top 10 countries use that type of mode of transport and by hovering over the pie chart slice, the user can see how many visitors that was for.  
- Click on top 10 country and when hovering over Pie chart of number of visitors, the user can see how many visitors visited London from that country.  
- Selecting a year in the drop down menu will do all of the above but with more specificity for that year.  
- A user can check which quarter per year had the highest amount of spend by hovering over a specific point on the composite line chart.  

## Features

### Existing Features
#### Feature 1 - Alert button
This advises you when on a mobile and viewing the website, the website it best viewed in landscape mode.  Click ok to acknowledge and enter site

#### Feature 2 - A drop down menu 
Drop down menu for selecting a specific year from the dataset.  From 2002 to 2017.  This interacts with the charts & graphs.

#### Feature 3 - Pie charts
These visualises data as share of a circle.  There are 3 pie charts - Number of visitors by region, Mode of transport to London, Total spend by region
These are all interactive with the other charts, the drop down menu and the reset button.  

#### Feature 4 - Row Chart
This visualises data as rows on a chart.  Used to display top 10 countries by spend.
This is interactive with the other charts, the drop down menu and reset button.

#### Feature 5 - Stacked bar chart
This visualises the data as bars stacked on a chart.  Here used to display the length of stay, stacked for each reason of travel based on spend.  
This is interactive with the other charts, the drop down menu and reset button.

#### Feature 6 - Compositite Line Graph
This visualises data as a line graph for each quarter per year and by spend. 
This is interactive with the other charts, the drop down menu and reset button.

#### Feature 7 - Reset Button
A reset all button for when the user would like to reset the info if they have clicked on any of the charts or graphs. 

#### Feature 8 - Github repo link 
This link is in the Github logo.  The user will be taken to the Github repository for this data dashboard.

### Features Left to Implement
#### Feature 1 - A data table with pagination for average spends.
This dataset would be the average spend per visit and the average spend per day for each country and region.  As these averages are not based on count, it was not possible to use the current file and I created a new file amalgamating the data for the countries.  I would like to create a table which tabulates the Average spend per visit and average spend per day which would be linked to another graph, potentially Mode of transport or spend per region.  I had this data table and source data in the file originally but was unable to get the table pagination to work.  Upon the advice of my mentor, he advised to leave them out for now.  
#### Feature 2 - A total visitor count. 
A number display that would change as and when the graphs and charts are interacted with.  This would give the total number of visitors.

[Wireframes](assets/wireframes/wireframe1.bmpr) for the data dashboard.  These were the original data dashboard wireframes that included the Data table for average spends.  Due to not fixing the pagination, this was removed and changed to the now deplayed website.  

## Technologies Used

### [HTML](https://www.w3.org/TR/html/) & [CSS](https://www.w3.org/Style/CSS/Overview.en.html): 
Used as base mark-up languages to write and style webpage. 

### [Bootstrap](https://www.bootstrapcdn.com/): 
This project uses Bootstrap as a framework to assist in card & grid layout. And increase the responsiveness on all devices. 

### [JQuery](https://jquery.com/): 
This project uses JQuery to assist in execution of bootstrap.

### [Font Awesome](https://fontawesome.com/): 
The icon for the Github link in the footer was imported from Font Awesome.  

### [Git & Git-Hub](9https://git-scm.com/): 
Local git repository was pushed to remote repository on GitHub and site was published using GitHub pages.

### [Visual Studio Code](https://code.visualstudio.com/):
This project was coded on Visual Studio Code. 

### [D3.js](https://d3js.org/), [DC.js](https://dc-js.github.io/dc.js/) & [Crossfilter.js](http://square.github.io/crossfilter/)
This project uses the javascript libraries, d3, dc and crossfilter to add interactive charts to this data dashboard.  

###  Balsamiq Mockups 3
This was used for the wireframe mockups.

## Testing
### Responsiveness
I tested my website locally using Chrome DevTools.  This tested the responsiveness of the charts.  These appeared to be working fine. 
Once I had deployed my site to Github, I tested this using the Google Chrome add on 'Responsive Web Design Tester'.  Whilst testing here I noticed that the charts were not being displayed properly if viewed in portrait mode on a mobile device.  I added an overflow scroll function using media queries so that the user is able to scroll to see the data on these charts.  I also added an alert that states it is advisable to view the website in landscape mode when on a mobile.   

I tested on various screen sizes using this tool.  I also tested on my personal mobiles.  Huawei Pro P20 and iPhone 4s.  These displayed as expected in landscape mode.  When viewed in portrait mode on the iPhone 4s, the scroll funtion worked as expected.  This was not necessary on the Huawei Pro P20 due to size of the screen.  

###  Browsers
I tested the website on the following browsers:  Safari, Google Chrome, and Firefox.  These all worked as expected.  

### Charts responding to clicking
I tested this on all the following browsers, Safari, Google Chrome and Firefox.  All graphs responded and worked interactively together as expected.  

### Validator testing
I validated my code using:

HTML - https://validator.w3.org/: No errors but warnings that "The type attribute is unnecessary for JavaScript resources."  I've ignored this warning and left the type attibute as is.  

CSS -  https://jigsaw.w3.org/css-validator/ The results of this were 100%: http://jigsaw.w3.org/css-validator/validator$link

Javascript - https://jshint.com/  Missing semi-colons were found.  These have now been fixed and the code passed 100%

While validating my code, an error was highlighted regarding my reset button coding.  There was an HTML a tag nested under the Button.  I fixed this error and this now passes validation.  

### Other users testing
Friends and colleagues tested this on various phones and browsers.  This responded as expected.  

### Errors still to fix
The year date on the composite chart is showing with a , seperator.  I tried to fix this by parsing the date but this caused errors in my charts.  This is something I would like to address in the future.  

## Deployment
The Website is hosted on GitHub, there are no differences between the deployed and current development versions.

The deployment on Github is very simple.  Click on the settings tab, under 'Github Pages' in 'Source' click on the 'None' drop down menu button and choose 'Master branch'.  This builds and publishes the site.  
The following will appear below the 'Github Pages' title: "Your site is ready to be published at https://eileenpeacock.github.io/milestone2-data_dashboard/."  

This is the deployed version which is hosted on Github pages.  More about Github pages can be found [here](https://pages.github.com/).

## Credits

### Content
- I regularly referenced the following websites to help implement my charts and graphs using DC and crossfilter.  
    - DC.js[Examples of using dc.js](http://dc-js.github.io/dc.js/examples/)
    - Tutorials Point [DC.js Tutorial](https://www.tutorialspoint.com/dcjs/)
    - Crossfilter article by Peter Cook [Getting to know Crossfilter](https://animateddata.co.uk/articles/crossfilter/) 
    - Code Project [Codeproject Crossfilter tutorial](https://www.codeproject.com/Articles/693841/Making-Dashboards-with-Dc-js-Part-1-Using-Crossfil)
    
- The code for the percentages for the Mode of travel pie chart was adapted from the Dc.js library found here.  https://github.com/dc-js/dc.js/blob/master/web/examples/pie.html

- I tweaked the scrolling back to top button for my reset button.  The original code was can be found here. https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

#### Media:

The London Skyline drawing photo is credited to: https://cityscapeillustrator.com/london-skyline-drawing-for-leon-paul/


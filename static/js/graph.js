/*d3.csv("data/international_visitors_london.csv", function (err, data) {
    if (err) throw err;
    
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
}); */

queue()
    .defer(d3.csv, 'data/international_visitors_london.csv')
    .await(makeGraphs);

function makeGraphs(error, visitorData) {
    var ndx = crossfilter(visitorData);


   /*Change strings to float & integer values*/ 
    visitorData.forEach(function (d) {
        d.visits = parseFloat(d.visits);
        d.spend = parseFloat(d.spend);
        d.nights = parseFloat(d.nights);
        d.sample = parseInt(d.sample);
    });
  
    /*Call each chart function */
    show_total_visits_per_region(ndx);

    dc.renderAll();

}

function show_total_visits_per_region (ndx){

    var name_dim = ndx.dimension(dc.pluck('Region'));
    var region_group = name_dim.group().reduceSum(dc.pluck('visits'));
    
    dc.pieChart('#region_totals_chart')
        .height(300)
        .radius(50)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(region_group);
        
}
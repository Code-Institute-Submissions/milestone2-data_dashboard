
queue()
    .defer(d3.json, 'data/international_visitors_london.json')
    .await(makeGraphs);

function makeGraphs(error, visitorData) {
    var ndx = crossfilter(visitorData);
  
    /*Call each chart function */
    show_total_visits_per_region(ndx);

    dc.renderAll();

}

/*Pie Chart showing Region splits */
function show_total_visits_per_region (ndx){

    var name_dim = ndx.dimension(dc.pluck('region'));
    var region_group = name_dim.group().reduceSum(dc.pluck('visits'));
    
    dc.pieChart('#region_totals_chart')
        .height(500)
        .radius(100)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(region_group);
        
}


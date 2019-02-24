queue()
    .defer(d3.json, 'data/international_visitors_london.json')
    .await(makeGraphs);

function makeGraphs(error, visitorData) {
    var ndx = crossfilter(visitorData);
  
    /*Call each chart function */
    show_year_selector (ndx)
    show_total_visits_per_region(ndx);
    show_top_spend_per_market (ndx)

    dc.renderAll();

}

/* Dropdown menu for year selector */

function show_year_selector(ndx) {
    var year_dim = ndx.dimension(dc.pluck('year'));
    var year_selector = year_dim.group();

    dc.selectMenu("#year_select")
        .dimension(year_dim)
        .group(year_selector)
        .promptText('All Years');
        
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

/* Row chart of top 10 visitors */

function show_top_spend_per_market (ndx) {
     
    var market_spend_dim = ndx.dimension(dc.pluck('market'));
    var spend_group = market_spend_dim.group().reduceSum(dc.pluck('spend'))
    

    dc.rowChart('#top10Spend')
        .height(300)
        .width(400)
        .dimension(market_spend_dim)
        .group(spend_group)
        .gap(5)
        .data(function (group) { return group.top(10); })
        .elasticX(true)
        .xAxis().ticks(5);
  
}
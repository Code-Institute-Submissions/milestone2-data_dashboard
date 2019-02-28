queue()
    .defer(d3.json, 'data/international_visitors_london.json')
    .await(makeGraphs);

function makeGraphs(error, visitorData) {
    var ndx = crossfilter(visitorData);
  
    /*Call each chart function */
    show_year_selector (ndx)
    show_total_visits_per_region(ndx);
    show_top_spend_per_market (ndx)
    show_mode_of_travel (ndx)
    show_purpose_of_travel (ndx)
    // show_average_spend_per_duration (ndx)
    // show_spend_years_qtrs (ndx)

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

/*Pie Chart showing Mode of travel splits */
function show_mode_of_travel (ndx){

    var mode_dim = ndx.dimension(dc.pluck('mode'));
    var mode_travel_group = mode_dim.group();
    
    dc.pieChart('#mode_travel')
        .height(500)
        .radius(100)
        .transitionDuration(1500)
        .dimension(mode_dim)
        .group(mode_travel_group);
}

/*Stacked bar chart for purpose of travel & spend */
function show_purpose_of_travel (ndx){

    var purpose_dim = ndx.dimension(dc.pluck('dur_stay'));

    function spendByPurpose(purpose) {
        return function (d) {
            if (d.purpose === purpose) {
                return +d.spend;
            } else {
                return 0;
            }
        }
    }

    var spendByPurpose_business =purpose_dim.group().reduceSum(spendByPurpose ('Business'));
    var spendByPurpose_holiday =purpose_dim.group().reduceSum(spendByPurpose ('Holiday'));
    var spendByPurpose_vfr =purpose_dim.group().reduceSum(spendByPurpose ('VFR'));
    var spendByPurpose_study =purpose_dim.group().reduceSum(spendByPurpose ('Study'));
    var spendByPurpose_misc =purpose_dim.group().reduceSum(spendByPurpose ('Miscellaneous'));
    

    var stackedChart = dc.barChart('#stacked_purpose_travel');
    stackedChart    
        .width(600)
        .height(400)
        .margins({ top: 10, right: 100, bottom: 30, left: 50 })
        .dimension(purpose_dim)
        .group(spendByPurpose_business, 'Business')
        .stack(spendByPurpose_holiday, 'Holiday')
        .stack(spendByPurpose_vfr, 'Visiting Friends & Relatives')
        .stack(spendByPurpose_misc, 'Misc')
        .stack(spendByPurpose_study, 'Study')
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Duration of Stay')
        .yAxisLabel('Spend in 1000s')
        .elasticY(true)
        .legend(dc.legend().x(420).y(20).itemHeight(10).gap(5).itemWidth(20));

    
}

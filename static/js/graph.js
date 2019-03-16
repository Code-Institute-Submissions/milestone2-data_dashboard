queue()
    .defer(d3.json, 'data/international_visitors_london.json')
    .defer(d3.json, 'data/avgs_international_visitors_london.json')
    .await(makeGraphs);

    /*Chart colors based on London underground colors 
        Bakerloo - #A45A2A (Brown) 1906 9
        Central - #DA291C (Red) 1900 7
        Circle -  #FFCD00 (Yellow) 1871 4
        District - #007A33(Moss Green) 1868 3
        DLR - #00B2A9 (Turqouise) 1987 12
        Hammersmith & City - #E89CAE(Pink) 1864 2
        Jubilee - #7C878E (Silver) 1979 11
        Metropolitan - #840B55(Magenta) 1863 1
        Northern - #000000 (Black) 1890 5
        Picacadilly - #10069F (Blue-magenta) 1906 8
        Tramlink - #78BE20(Lime Green) 1999 13
        Victoria - #00A3E0 (Light Blue) 1968 10
        Waterloo & City - #6ECEB2 (Sea Green/Blue) 1898 6
        
        Order based on year of opening of Tube line (excluding Northern Line due to it being black) */
    
    var formatDecimalComma = d3.format(",.2f")
    var formatMoney = function(d) { return "£" + formatDecimalComma(d);};
    

    var chartColors = d3.scale.ordinal()   
    .range(['#840B55', '#E89CAE', '#007A33', '#FFCD00', '#6ECEB2', '#DA291C', '#A45A2A','#10069F', '#00A3E0', '#7C878E', '#00B2A9', '#78BE20'])

function makeGraphs(error, visitorData, avgVisitorData) {
    var ndx = crossfilter(visitorData);
    var ndx2 = crossfilter(avgVisitorData);

    


    /*Call each chart function */
    show_year_selector(ndx)
    show_total_visits_per_region(ndx);
    show_top_spend_per_market(ndx)
    show_mode_of_travel(ndx)
    show_purpose_of_travel(ndx)
    show_spend_years_qtrs(ndx)
    show_data_table_visitors(ndx2)
    show_total_spend_per_region(ndx2)

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
        .height(350)
        .width(500)
        .radius(100)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(region_group)
        .legend(dc.legend().y(90).itemHeight(10).gap(10))
        .renderLabel(false)
        .colors(chartColors)
        ;
        
}

/* Row chart of top 10 visitors */

function show_top_spend_per_market(ndx) {
     
    var market_spend_dim = ndx.dimension(dc.pluck('market'));
    var spend_group = market_spend_dim.group().reduceSum(dc.pluck('spend'))
    

    dc.rowChart('#top10Spend')
        .height(350)
        .width(500)
        .dimension(market_spend_dim)
        .group(spend_group)
        .gap(5)
        .data(function (group) { return group.top(10); })
        .elasticX(true)
        .colors(chartColors)
        .xAxis().ticks(5);
        
  
}

/*Pie Chart showing Mode of travel splits */
function show_mode_of_travel(ndx){

    var modeColors = d3.scale.ordinal()   
        .domain(['Air', 'Sea', 'Tunnel'])
        .range(['#E89CAE', '#840B55','#10069F'])
        
    var mode_dim = ndx.dimension(dc.pluck('mode'));
    var mode_travel_group = mode_dim.group().reduceSum(dc.pluck('visits'));
    
    dc.pieChart('#mode_travel')
        .height(350)
        .width(500)
        .radius(100)
        .transitionDuration(1500)
        .colors(modeColors)
        .dimension(mode_dim)
        .group(mode_travel_group);
}


/*Stacked bar chart for purpose of travel & spend */
function show_purpose_of_travel(ndx){

    var purposeColors = d3.scale.ordinal()   
        .domain(['Business', 'Holiday', 'Visiting Friends/Family', 'Misc', 'Study'])
        .range(['#10069F', '#E89CAE', '#840B55', '#00A3E0', '#007A33'])
        

    var durStay_dim = ndx.dimension(dc.pluck('dur_stay'));
    var spendByPurpose_business =durStay_dim.group().reduceSum(spendByPurpose ('Business'));
    var spendByPurpose_holiday =durStay_dim.group().reduceSum(spendByPurpose ('Holiday'));
    var spendByPurpose_vfr =durStay_dim.group().reduceSum(spendByPurpose ('VFR'));
    var spendByPurpose_study =durStay_dim.group().reduceSum(spendByPurpose ('Study'));
    var spendByPurpose_misc =durStay_dim.group().reduceSum(spendByPurpose ('Miscellaneous'));
    

    function spendByPurpose(purpose) {
        return function (d) {
            if (d.purpose === purpose) {
                return d3.format(",.2f")(+d.spend)
                // return +d.spend;
            } else {
                return 0;
            }
        }
    }

    

    var stackedChart = dc.barChart('#stacked_purpose_travel');
    stackedChart    
        .width(480)
        .height(350)
        .margins({ top: 10, right: 50, bottom: 40, left: 50 })
        
        .dimension(durStay_dim)
        .colors(purposeColors)
        .group(spendByPurpose_business, 'Business')
        .stack(spendByPurpose_holiday, 'Holiday')
        .stack(spendByPurpose_vfr, 'Visiting Friends/Family')
        .stack(spendByPurpose_misc, 'Misc')
        .stack(spendByPurpose_study, 'Study')
        .x(d3.scale.ordinal().domain(["1-3 Nights","4-7  nights","8-14 nights","15+  nights"]))
        .xUnits(dc.units.ordinal)
        
        .xAxisLabel('Duration of Stay')
        .yAxisLabel('Spend in 1000s')
        .elasticY(true)
        .legend(dc.legend().x(340).y(20).itemHeight(10).gap(5).itemWidth(20));

    
}
/* Composite Line Graph of spend over the years per quarter */

function show_spend_years_qtrs(ndx){

    var yearsDim = ndx.dimension(dc.pluck('year'));


    function spendByQtr(quarter) {
        return function (d) {
            if (d.quarter === quarter) {
                return +d.spend;
            } else {
                return 0;
            }
        }
    };
  
    var spendByQtr1 =yearsDim.group().reduceSum(spendByQtr('Q1'));
    var spendByQtr2 =yearsDim.group().reduceSum(spendByQtr('Q2'));
    var spendByQtr3 =yearsDim.group().reduceSum(spendByQtr('Q3'));
    var spendByQtr4 =yearsDim.group().reduceSum(spendByQtr('Q4'));
    

    var compositeChart = dc.compositeChart("#line_spend_years_qtr");

compositeChart 
            .width(1100)
            .height(400)
            .dimension(yearsDim)
            .renderHorizontalGridLines(true)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .x(d3.scale.linear().domain(['2002','2018']))
            .elasticY(true)
            .yAxisLabel("Spend in 1000s")
            .legend(dc.legend().x(70).y(20).itemHeight(10).gap(5).itemWidth(20))
            .compose([
                    dc.lineChart(compositeChart)
                        .colors('#007A33')
                        .group(spendByQtr1, 'Jan to Mar'),
                    dc.lineChart(compositeChart)
                        .colors('#10069F')
                        .group(spendByQtr2, 'Apr to Jun'),
                    dc.lineChart(compositeChart)
                        .colors('#DA291C ')
                        .group(spendByQtr3, 'Jul to Sept'),
                    dc.lineChart(compositeChart)
                        .colors('#840B55')
                        .group(spendByQtr4, 'Oct to Dec'),])
            .brushOn(false)
            .render();
}


/* Data Table with average spend per visit & per night */

function show_data_table_visitors(ndx2){

    var marketTotalSpend_dim = ndx2.dimension(dc.pluck('market'));

var visitTable = dc.dataTable("#dc-data-table")

visitTable
        .dimension(marketTotalSpend_dim)
        .group(function (d) {return 'Country';})
        .showGroups(false)
        .columns([
            function (d) { return d.market},
            function (d) { return "£" + d3.format(",.2f")(d.visit_spend)},
            function (d) { return "£" + d3.format(",.2f")(d.nights_spend)}, 
        ])
        .order(d3.ascending)
        .size(10);
        
        
        
}


/*Pie Chart showing Region splits */
function show_total_spend_per_region(ndx2){

    var spendTotal_dim = ndx2.dimension(dc.pluck('region'));
    var regionSpendTotal_group = spendTotal_dim.group().reduceSum(dc.pluck('spend_total'));
    
    dc.pieChart('#spend_totals_chart')
        .height(350)
        .width(500)
        .radius(100)
        .transitionDuration(1500)
        .dimension(spendTotal_dim)
        .group(regionSpendTotal_group)
        .legend(dc.legend().y(90).itemHeight(10).gap(10))
        .renderLabel(false)
        .colors(chartColors)
        .innerRadius(40);
        
}


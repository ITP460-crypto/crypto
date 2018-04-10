    var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 1200 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%d-%b-%y");

    var x = techan.scale.financetime()
            .range([0, width]);

    var y = d3.scaleLinear()
            .range([height, 0]);

    var candlestick = techan.plot.candlestick()
            .xScale(x)
            .yScale(y);

    var xAxis = d3.axisBottom()
            .scale(x);

    var yAxis = d3.axisLeft()
            .scale(y);

    var svg1 = d3.select("#graph1").append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg2 = d3.select("#graph2").append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg3 = d3.select("#graph3").append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg = d3.select("#graph").append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("/static/data/data.csv", function(error, data) {
        var accessor = candlestick.accessor();

        data = data.slice(0, 200).map(function(d) {
            return {
                date: parseDate(d.Date),
                open: +d.Open,
                high: +d.High,
                low: +d.Low,
                close: +d.Close,
                volume: +d.Volume
            };
        }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

        svg1.append("g")
                .attr("class", "candlestick");

        svg1.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svg1.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

        svg2.append("g")
                .attr("class", "candlestick");

        svg2.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svg2.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

        svg3.append("g")
                .attr("class", "candlestick");

        svg3.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svg3.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

        svg.append("g")
                .attr("class", "candlestick");

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svg.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

        // Data to display initially
        draw(data.slice(0, data.length-20));
        // Only want this button to be active if the data has loaded
        d3.select("button").on("click", function() { draw(data); }).style("display", "inline");
    });

    function draw(data) {
        x.domain(data.map(candlestick.accessor().d));
        y.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());

        svg1.selectAll("g.candlestick").datum(data).call(candlestick);
        svg1.selectAll("g.x.axis").call(xAxis);
        svg1.selectAll("g.y.axis").call(yAxis);

        svg2.selectAll("g.candlestick").datum(data).call(candlestick);
        svg2.selectAll("g.x.axis").call(xAxis);
        svg2.selectAll("g.y.axis").call(yAxis);

        svg3.selectAll("g.candlestick").datum(data).call(candlestick);
        svg3.selectAll("g.x.axis").call(xAxis);
        svg3.selectAll("g.y.axis").call(yAxis);

        svg.selectAll("g.candlestick").datum(data).call(candlestick);
        svg.selectAll("g.x.axis").call(xAxis);
        svg.selectAll("g.y.axis").call(yAxis);
    }

import React from 'react';
import * as d3 from 'd3';

export function UpdateGrid(data, colors) {
    const grid_length = data.length;
    d3.select('svg').selectAll('g')
        .data(data)
        .selectAll('rect')
        .data(function (d) {
          return d;
        })
        .attr('class',function(d) {
          return d;
        });
    if (!colors) {
    	d3.selectAll(".A1A1").style("fill","#fff");
        d3.selectAll(".A1A2").style("fill","#2176c9");
        d3.selectAll(".A2A2").style("fill","#042029");
    }
    else {
        for (let i = 0; i < colors.length; i = i + 2) {
            d3.selectAll("."+colors[i]).style("fill",colors[i+1]);	
        }
    }
    return (
        <div>
            <svg></svg>
        </div>
    )
}

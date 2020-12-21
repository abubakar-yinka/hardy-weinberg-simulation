import React from 'react';
import * as d3 from 'd3';

export function DrawGrid(data, colors) {
    const width = 600;
    const height = 600;
    const grid_length = data.length;

    const svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height);

    const rw = Math.floor(width / grid_length);
    const rh = Math.floor(height / grid_length);

    const g = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
              return 'translate(0, ' + (width/grid_length) * i + ')';
            });

    g.selectAll('rect')
            .data(function (d) {
              return d;
            })
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return (width/grid_length) * i;
            })
            .attr('width', rw)
            .attr('height', rh)
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





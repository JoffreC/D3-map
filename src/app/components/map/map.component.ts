import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import {json} from "d3";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private svg: any;
  private margin = 50;
  private width = 2000 - (this.margin * 2);
  private height = 800 - (this.margin * 2);
  private scale = Math.min(this.width, this.height);
  private geoJson: any;


  constructor() { }

  private createSvg(): void {

// Definir una escala de color ord
    var projection = d3.geoMercator()
      .center([-87,0])
      .scale(4000)
      // .rotate([0, 0]);

    let geoGenerator: any = d3.geoPath()
      .projection(projection);
    json('assets/ecuador.geojson')
      .then(data => {
        this.geoJson = data
        var provinces = this.geoJson.features.map((d: { properties: { dpa_despro: string; }; }) => d.properties.dpa_despro);
        var colorScale = d3.scaleOrdinal()
          .domain(provinces)
          .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"])
        this.svg = d3.select('figure#map')
          .append("svg")
          .attr("width", this.width + (this.margin * 2))
          .attr("height", this.height + (this.margin * 2))
          .append("g")
          .style("background-color", "lightblue")
          .selectAll('path')
          .data(this.geoJson.features)
          .join('path')
          .attr('d', geoGenerator)
          // .attr("fill", (d: any) => (colorScale(d)))
      })

  }

  ngOnInit(): void {
      this.createSvg();
    };
  }

// import {Component, OnInit} from '@angular/core';
// import * as d3 from "d3"
//
// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent implements OnInit{
//
//   private svg: any;
//   private margin = 50;
//   private width = 750 - (this.margin * 2);
//   private height = 400 - (this.margin * 2);
//
//   private geoJson:any;
//
//   private createSvg(): void{
//     var projection = d3.geoMercator()
//       .center([0, 50 ])
//       .scale(100)
//       .rotate([0,0]);
//       // .fitSize([this.width, this.height], this.geoJson)
//       // .translate([this.width / 2, this.height / 2]);
//     let geoGenerator:any = d3.geoPath()
//       .projection(projection);
//     this.svg = d3.select('figure#map')
//       .append("svg")
//       .attr("width", this.width + (this.margin*2))
//       .attr("height", this.height + (this.margin*2))
//       .append("g")
//       .selectAll('path')
//       .data(this.geoJson.features)
//       .join('path')
//       .attr('d', geoGenerator);
//
//
//   }
//
//   ngOnInit(): void {
//     this.createSvg()
//   }
// }

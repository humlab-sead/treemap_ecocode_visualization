import * as Plotly from "plotly.js-dist";
import '../stylesheets/style.scss';
import "../assets/ecocodes/Disturbed_arable.png";
import "../assets/ecocodes/Open_wet_habitats.png";
import "../assets/ecocodes/Sandy_dry_disturbed_arable.png";
import "../assets/ecocodes/Wetlands_marshes.png";
import "../assets/ecocodes/Wood_and_trees.png";
import "../assets/ecocodes/Aquatics.png";
import "../assets/ecocodes/Carrion.png";
import "../assets/ecocodes/Dung_foul_habitats.png";
import "../assets/ecocodes/Meadowland.png";
import "../assets/ecocodes/Mould_beetles.png";
import "../assets/ecocodes/Coniferous.png";
import "../assets/ecocodes/Deciduous.png";
import "../assets/ecocodes/Dry_dead_wood.png";
import "../assets/ecocodes/Dung.png";
import "../assets/ecocodes/Ectoparasite.png";
import "../assets/ecocodes/General_synanthropic.png";
import "../assets/ecocodes/Halotolerant.png";
import "../assets/ecocodes/Heathland_&_moorland.png";
import "../assets/ecocodes/Open_wet_habitats.png";
import "../assets/ecocodes/Pasture_Dung.png";
import "../assets/ecocodes/Running_water.png";
import "../assets/ecocodes/Standing_water.png";
import "../assets/ecocodes/Stored_grain_pest.png";


let availableCards = [];
let values = [];

$(function() {
    console.log("execute!");

    var pathArray = window.location.pathname.split('/');
    let siteId = parseInt(pathArray[pathArray.length-1]);
    
    fetch("https://supersead.humlab.umu.se/jsonapi/ecocodes/site/"+siteId).then((response) => response.json()).then(data => {

        data.ecocode_bundles.forEach(d => {
            let ecoCodeName = d.ecocode.name.replace(/\//g, "_");
            ecoCodeName = ecoCodeName.replace(/ /g, "_");
            ecoCodeName = ecoCodeName.replace(/Indicators:_/g, "");
            availableCards.push(ecoCodeName);
            values.push(d.taxa.length);
            
        });

        render(availableCards, values);

    });

});

function render(cards, values) {
    let labels = ["Cards"];
    let parents = [""];

    cards.forEach(c => {
        labels.push(c);
        parents.push("Cards");
    });

    let data = [{
        type: "treemap",
        labels: labels,
        parents: parents,
        values: values
    }];


    Plotly.newPlot('treemap-container', data);

    let slices = $(".slice", "#treemap-container")

    let cPos = $("#treemap-container").position();
    $("#treemap-container-overlay").css("top", cPos.top+"px");
    $("#treemap-container-overlay").css("left", cPos.left+"px");
    $("#treemap-container-overlay").css("width", $("#treemap-container").width()+"px");
    $("#treemap-container-overlay").css("height", $("#treemap-container").height()+"px");

    slices.each((index, el) => {
        if(index > 0) {
            let blockPos = $("path", el).position();
            let imageNode = $("<div class='card-image'></div>");
            let width = $("path", el)[0].getBoundingClientRect().width;
            let height = $("path", el)[0].getBoundingClientRect().height;
            imageNode.css("top", (blockPos.top-0)+"px");
            imageNode.css("left", (blockPos.left-0)+"px");
            imageNode.css("height", (height-0)+"px");
            imageNode.css("width", (width-0)+"px");
            
            let ecocode = $("text", el).text();
            let imageFile = "/"+ecocode+".png";
            $(imageNode).css("background-image", 'url('+imageFile+')');
            let ecocodeName = ecocode.replace(/_/g, " ");
            $(imageNode).append("<div class='image-text'>"+ecocodeName+"</div>");
            $("#treemap-container-overlay").append(imageNode);    
        }
        
    });
}



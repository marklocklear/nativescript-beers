import { getJSON } from "tns-core-modules/http";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "tns-core-modules/data/observable";

let beerList = new ObservableArray;
const pageData = new Observable();

exports.beers = function() {
    getJSON("http://www.beer-tutorials.org/beers/beers.json").then(function(r:any) {
        for (var i = 0; i< r.length; i++) {
            var beer = { name: r[i].name,
                         description: r[i].description,
                         alcohol: r[i].alcohol,
                         img: "http://beertutorials.github.io/website/"+r[i].img
                        } 
            beerList.push(beer);
        }
    }, function(e) {
        console.log(e);
    });
  };

  export function onPageLoaded(args) {
    var page = args.object;
    pageData.set("beerList", beerList);
    page.bindingContext = pageData;
  }
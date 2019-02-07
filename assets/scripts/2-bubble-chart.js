"use strict";

/**
 * Fichier permettant de dessiner le graphique à bulles.
 */


/**
 * Crée les axes du graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 * @param width   La largeur du graphique.
 */
function createAxes(g, xAxis, yAxis, height, width) {
  // TODO: Dessiner les axes X et Y du graphique.
  // Axe horizontal
  g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  g.append("text")
  .attr("text-anchor", "end")
  .attr("x", width - 4) //padding of 4px
  .attr("y", height - 8)  //padding of 8px
  .text("Espérence de vie (années)");


  // Axe Vertical
  g.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  g.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(270)")
  .attr("x", 4) //padding of 4px
  .attr("y", 20)  //push it down
  .text("Revenu (USD)");
}

/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
  var bubbleGroup = g.selectAll("circle").data(data);

  bubbleGroup.enter().append("circle")
              .attr("cx",function(d){
                return x(d.lifeExpectancy);
              })
              .attr("cy",function(d){
                return y(d.income);
              })
              .attr("r",function(d){
                return r(d.population);
              })
              .attr("fill",function(d){
                return color(d.zone);
              })
              .on("mouseover", tip.show)					
              .on("mouseout", tip.hide);

  bubbleGroup.exit().remove();

}


$(document).ready(function(){

  // qnd trocar o radio buttom, troca de mapa
$('#layers input[type=radio]').change(function() {
  var layer = $(this).val();

  map.getLayers().getArray().forEach(function(e) {
    var name = e.get('name');
    e.setVisible(name == layer);
  });
  // independentemente do mapa base, a camada que faz criacao/modificacao
  // de geometria fica visivel
  layer_feature_overlay.setVisible(true);
  layer_geoserver_wms_sara_brasil.setVisible(true);
});




  var modify = new ol.interaction.Modify({
    features: features,
    // the SHIFT key must be pressed to delete vertices, so
    // that new vertices can be drawn at the same position
    // of existing vertices
    deleteCondition: function(event) {
      return ol.events.condition.shiftKeyOnly(event) &&
          ol.events.condition.singleClick(event);
    }
  });
  map.addInteraction(modify);

  var draw; // global so we can remove it later
  var typeSelect = document.getElementById('type');

  function addInteraction() {
    draw = new ol.interaction.Draw({
      features: features,
      type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
    });
    map.addInteraction(draw);
  }


  /**
   * Handle change event.
   */
  typeSelect.onchange = function() {
    map.removeInteraction(draw);
    addInteraction();
  };

  addInteraction();

});

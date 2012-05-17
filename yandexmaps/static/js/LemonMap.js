$(document).ready(function(){
    ymaps.ready(mapInit);
function mapInit() {

  var map_objects = '';
  var marker_coordinate = '';
  var map = new ymaps.Map("ymaps-map-container", {center: [39.92235299999997, 59.21787419653633], zoom: 10, type: "yandex#map"});
  map.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));
  contant = $('.vMapField').html();
  params = contant.substring(contant.indexOf('~')+1, contant.lastIndexOf('~'));
  if (params != '') {
    params = params.split(';');
    center = params[0];
    center = center.split(',');
    map.setCenter([center[0], center[1]]);
    map.setZoom(params[1])
    if (params[3] != '') {
      marker_coordinate += params[3]
      markers = params[3].split('^');
      for (i in markers) {
        marker = markers[i].split(',')
        map.geoObjects.add(new ymaps.Placemark([marker[0], marker[1]], {balloonContent: ""}, {preset: "twirl#lightblueDotIcon"}));
        map_objects = 'map.geoObjects.add(new ymaps.Placemark(['+marker[0]+', '+marker[1]+'], {balloonContent: ""}, {preset: "twirl#lightblueDotIcon"}));';
      }
    }
  }

    function clikLink(){
      $('p .address_item').click(function(){
            span = $(this).find('span');
            coordinate = span.text();
            coordinate = coordinate.split(' ');
            c1 = coordinate[0];
            c2 = coordinate[1];
            marker_coordinate  += c1+','+c2+'^';
            map.setCenter([c1, c2]);
            map.setZoom(15);
            map.geoObjects.add(new ymaps.Placemark([c1, c2], {balloonContent: ""}, {preset: "twirl#lightblueDotIcon"}));
            map_objects += 'map.geoObjects.add(new ymaps.Placemark(['+c1+', '+c2+'], {balloonContent: ""}, {preset: "twirl#lightblueDotIcon"}));';
          });
    }

    $('#find_address').click(function(){
      LoadAddress()
    });
    $('#MapSurchForm').submit(function(){
      LoadAddress()
    });
    $('#SAVE_BUTTON').click(function(){
      save_map();
    })
    function LoadAddress() {
      addr=$('#address').attr('value');
      $.ajax({
      type: "GET",
      url: 'http://geocode-maps.yandex.ru/1.x/?geocode='+addr,
      success: function(data){
          elements = data.getElementsByTagName("featureMember");
          t='';
          for (var i = 0; i < elements.length; i++){
            addr = elements[i].getElementsByTagName('text')[0].firstChild.nodeValue;
            coordinate = elements[i].getElementsByTagName('pos')[0].firstChild.nodeValue;
            coordinate = coordinate.split(' ');
            t+='<p><a href="#?" class="address_item"><span style="display:none">'+coordinate[0]+' '+coordinate[1]+'</span>'+addr+'</a></p>';
          }
          $('#load_address').html(t);
          clikLink();
        }
      });
    }

    function save_map(){
      $('.vMapField').html('<div id="ymaps-map-container" style="width: 600px; height: 400px;"></div>');
      $('.vMapField').append('<');
      $('.vMapField').append('script type="text/javascript" src="http://api-maps.yandex.ru/2.0/?coordorder=longlat&load=package.full&wizard=constructor&lang=ru-RU">');
      $('.vMapField').append('</');
      $('.vMapField').append('script>')
      $('.vMapField').append('<');
      $('.vMapField').append('script type="text/javascript">');
      $('.vMapField').append('ymaps.ready(function() {');
      center = map.getCenter();
      zoom = map.getZoom();
      type = map.getType();
      content = 'var map = new ymaps.Map("ymaps-map-container", {center: ['+center+'], zoom: '+zoom+', type: "'+type+'"});';
      $('.vMapField').append(content);
      $('.vMapField').append('map.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));');
      $('.vMapField').append(map_objects);
      $('.vMapField').append('});');
      $('.vMapField').append('</');
      $('.vMapField').append('script>');
      //$('.vMapField').append('sdf');
      arr = [center, zoom, type, marker_coordinate]
      s = arr.join(';')
      $('.vMapField').append('&lt;div class=".mark_coordinate" style="display:block"&t;~'+s+'~&lt;/div&gt;');
    }

    /*$('#ymaps-map-container').resize(function(){
        map.redraw();
    })*/

}

$('#ymaps-map-container').resizable();
});
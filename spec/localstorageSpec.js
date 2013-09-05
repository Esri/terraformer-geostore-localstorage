
var point = { type: "Point", coordinates: [ -122, 45 ], id: "point" };
var featureCollection = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "foo",
    "properties": {
      "foo": "bar"
    },
    "geometry":  {
      "type": "Polygon",
      "coordinates": [
        [ [41.83,71.01],[56.95,33.75],[21.79,36.56],[41.83,71.01] ]
      ]
    }
  }],
  "properties": {
    "bar": "baz"
  }
};

describe("localstorage", function() {

  it("should correctly add geojson as a point", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();

    var spy = jasmine.createSpy();
    store.add(point, spy);

    expect(spy).toHaveBeenCalledWith(null, point);
  });
  
  it("should correctly update geojson as a point", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();

    var spy = jasmine.createSpy();
    store.update(point, spy);

    expect(spy).toHaveBeenCalledWith(null, point);
  });

  it("should correctly add geojson as a feature collection", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();

    var spy = jasmine.createSpy();
    store.add(featureCollection, spy);

    expect(spy).toHaveBeenCalledWith(null, featureCollection);
  });

  it("should correctly get a geojson from the store", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();

    var spy = jasmine.createSpy();
    store.add(point, function (err, geojson) {
      expect(err).toBeNull();
      expect(geojson).toEqual(point);
      store.get("point", spy);
      expect(spy).toHaveBeenCalledWith(null, point);
    });
  });

  it("should correctly remove a geojson from the store", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();

    var spy = jasmine.createSpy();
    store.add(point, function (err, geojson) {
      expect(err).toBeNull();
      expect(geojson).toEqual(point);
      store.remove("point", function (err, id) {
        expect(err).toBeNull();
        expect(id).toEqual("point");
        store.get("point", spy);
        expect(spy).toHaveBeenCalledWith(null, null);
      });
    });
  });

  it("should correctly serialize and deserialize", function () {
    localStorage.clear();
    var store = new Terraformer.GeoStore.LocalStorage();
    store.add(point);

    store.serialize(function (err, data) {
      store.remove("point");

      expect(data).toEqual('[{\"type\":\"Point\",\"coordinates\":[-122,45],\"id\":\"point\"}]');
      store.deserialize(data, function () { });

      var spy = jasmine.createSpy();
      store.get("point", spy);
      expect(spy).toHaveBeenCalledWith(null, point);
    });
  });


});

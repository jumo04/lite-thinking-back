const db = require("../app/models");
var request = require("request");
const Products = require("../app/controllers/product.controller");
const frisby = require('frisby');

var base_url = "http://localhost:8080/admin/product/products"

const bodyParser = require('body-parser');

const Product = db.product;

describe("Listado de productos", function() {

    it("should return the summary for the given page title", function(done) {
        frisby
          .get(base_url)
          .then(function(response) {
            expect(response.status).toBe(200);
          })
          .done(done);
      })

    it("API Response should be valid json", function(done) {
        request.get(base_url, function(error, response, body) {
            expect(() => { JSON.parse(body);}).not.toThrow();
            expect( Object.keys(JSON.parse(body)).length ).toBe(3)
            done();
        });
     });

     it("Api response may be with 3 procuts", function(done) {
        request.get(base_url, function(error, response, body) {
            expect( Object.keys(JSON.parse(body)).length ).toBe(3);
            done();
        });
     });
});
   
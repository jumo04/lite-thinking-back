const db = require("../models");

const Product = db.product;

var assert    = require("chai").assert;
var product = require("../app/calculator");
describe("Calcultator tests using ASSERT interface from CHAI module: ", function() {
 describe("Check addTested Function: ", function() {
 it("Check the returned value using: assert.equal(value,'value'): ", function() {
 result   = Product.getAll("text");
 assert.equal(result, "text tested");
 });
 it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
 result   = Product.getAll("text");
 assert.typeOf(result, "string");
 });
 it("Check the returned value using: assert.lengthOf(value,'value'): ", function() {
 result   = Product.getAll("text");
 assert.lengthOf(result, 11);
 });
 }); 
});


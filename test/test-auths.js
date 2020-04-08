var expect  = require('chai').expect;
var request = require('request');

describe('Status and content', function() {
    describe ('main page', function() {
        it('status', function(done){
            request('http://localhost:5000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:5000/' , function(error, response, body) {
                expect(body).to.equal('Algorithm App');
                done();
            });
        });
    });

    describe ('success', function() {
        it('status', function(done){
            request('http://localhost:5000/success', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:5000/success' , function(error, response, body) {
                expect(body).to.equal('success!');
                done();
            });
        });
    });

    describe ('failure page', function() {
        it('status', function(done){
            request('http://localhost:5000/failure', function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:5000/failure' , function(error, response, body) {
                expect(body).to.equal('failed!');
                done();
            });
        });
    });
});
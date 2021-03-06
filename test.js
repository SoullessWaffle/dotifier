/* global describe it */

var expect, dotifier;

if (typeof module === 'object' && module.exports) {
  // Node
  expect = require('chai').expect;
  dotifier = require('./dotifier.js');
} else {
  // Browser
  expect = window.chai.expect;
}

describe('dotifier', function () {
  describe('._splitMail()', function () {
    it('should return [\'test\', \'@gmail.com\'] for test@gmail.com', function () {
      var result = dotifier._splitMail('test@gmail.com');
      expect(result).to.be.an.instanceof(Array);
      expect(result).to.have.length(2);
      expect(result[0]).to.equal('test');
      expect(result[1]).to.equal('@gmail.com');
    });
    it('should return [\'hello\', \'@gmail.com\'] for hello@gmail.com', function () {
      var result = dotifier._splitMail('hello@gmail.com');
      expect(result).to.be.an.instanceof(Array);
      expect(result).to.have.length(2);
      expect(result[0]).to.equal('hello');
      expect(result[1]).to.equal('@gmail.com');
    });
    it('should return [\'example\', \'@gmail.com\'] for example@gmail.com', function () {
      var result = dotifier._splitMail('example@gmail.com');
      expect(result).to.be.an.instanceof(Array);
      expect(result).to.have.length(2);
      expect(result[0]).to.equal('example');
      expect(result[1]).to.equal('@gmail.com');
    });
  });
  describe('._getCapacity()', function () {
    it('should return 7 for \'test\'.length', function () {
      expect(dotifier._getCapacity('test'.length)).to.equal(7);
    });
    it('should return 15 for \'hello\'.length', function () {
      expect(dotifier._getCapacity('hello'.length)).to.equal(15);
    });
    it('should return 63 for \'example\'.length', function () {
      expect(dotifier._getCapacity('example'.length)).to.equal(63);
    });
  });
  describe('._binRep()', function () {
    it('should return \'000001\' when n = 1', function () {
      expect(dotifier._binRep(1, 'example'.length)).to.equal('000001');
    });
    it('should return \'001010\' when n = 10', function () {
      expect(dotifier._binRep(10, 'example'.length)).to.equal('001010');
    });
    it('should return \'001111\' when n = 15', function () {
      expect(dotifier._binRep(15, 'example'.length)).to.equal('001111');
    });
  });
  describe('.encode()', function () {
    describe('decimal', function () {
      it('should return example@gmail.com when n = 0', function () {
        expect(dotifier.encode('example@gmail.com', 0)).to.equal('example@gmail.com');
      });
      it('should return exampl.e@gmail.com when n = 1', function () {
        expect(dotifier.encode('example@gmail.com', 1)).to.equal('exampl.e@gmail.com');
      });
      it('should return e.x.a.m.p.l.e@gmail.com when n = 63', function () {
        expect(dotifier.encode('example@gmail.com', 63)).to.equal('e.x.a.m.p.l.e@gmail.com');
      });
    });
    describe('hexadecimal', function () {
      it('should return example@gmail.com when n = 0x0', function () {
        expect(dotifier.encode('example@gmail.com', 0)).to.equal('example@gmail.com');
      });
      it('should return exampl.e@gmail.com when n = 0x1', function () {
        expect(dotifier.encode('example@gmail.com', 0x1)).to.equal('exampl.e@gmail.com');
      });
      it('should return e.x.a.m.p.l.e@gmail.com when n = 0x3f', function () {
        expect(dotifier.encode('example@gmail.com', 0x3f)).to.equal('e.x.a.m.p.l.e@gmail.com');
      });
    });
    describe('invalid input', function () {
      it('should return null when n > capacity', function () {
        expect(dotifier.encode('example@gmail.com', 64)).to.be.null;
      });
      it('should return null when n < 0', function () {
        expect(dotifier.encode('example@gmail.com', -1)).to.be.null;
      });
      it('should return null when email is invalid', function () {
        expect(dotifier.encode('examplegmail.com', 0)).to.be.null;
        expect(dotifier.encode('@l.com', 0)).to.be.null;
        expect(dotifier.encode('e@', 0)).to.be.null;
        expect(dotifier.encode('@', 0)).to.be.null;
      });
      it('should return null when n is not an integer', function () {
        expect(dotifier.encode('example@gmail.com', undefined)).to.be.null;
        expect(dotifier.encode('example@gmail.com', null)).to.be.null;
        expect(dotifier.encode('example@gmail.com', 'Hello, world!')).to.be.null;
        expect(dotifier.encode('example@gmail.com', 1.23456789)).to.be.null;
      });
    });
  });
  describe('.decode()', function () {
    describe('valid input', function () {
      it('should return 0 for example@gmail.com', function () {
        expect(dotifier.decode('example@gmail.com')).to.equal(0);
      });
      it('should return 1 for exampl.e@gmail.com', function () {
        expect(dotifier.decode('exampl.e@gmail.com')).to.equal(1);
      });
      it('should return 63 for e.x.a.m.p.l.e@gmail.com', function () {
        expect(dotifier.decode('e.x.a.m.p.l.e@gmail.com')).to.equal(63);
      });
    });
    describe('invalid input', function () {
      it('should return null when email is invalid', function () {
        expect(dotifier.decode('examplegmail.com')).to.be.null;
        expect(dotifier.decode('@l.com')).to.be.null;
        expect(dotifier.decode('e@')).to.be.null;
        expect(dotifier.decode('@')).to.be.null;
      });
    });
  });
});

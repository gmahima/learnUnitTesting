var expect = require('chai').expect
describe('checkForShip', ()=> {
  var checkForShip = require('../gameLogic/shipMethods').checkForShip
  it('should report no ship at a given players coordinate', () => {
    var player = {
      ships: [
        {
          locations: [[0,0]],
          damage: []

        }
      ]
    }
    expect(checkForShip(player, [9, 9])).to.be.undefined
  })
  it('should report a ship at a given players coordinate', () => {
    var player = {
      ships: [
        {
          locations: [[0,0]],
          damage: []
        }
      ]
    }
    expect(checkForShip(player, [0, 0])).to.not.be.empty
  })
  it('should handle ships located at more than one coordinate', () => {
    var player = {
      ships: [
        {
          locations: [[0,0], [0,1]],
          damage: []
        }
      ]
    }
    expect(checkForShip(player, [0, 1])).to.not.be.empty
    expect(checkForShip(player, [0, 0])).to.not.be.empty
    expect(checkForShip(player, [9, 9])).to.be.undefined
  })
  it('should handle more than one ship', () => {
    var player = {
      ships: [
        {
          locations: [[0,0], [0,1]]
        },
        {
          locations: [[1,0], [1,1]]
        },
        {
          locations: [[2,0], [2,1], [2,4], [5,1]]
        },
      ]
    }
    expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0])
    expect(checkForShip(player, [0, 0])).to.not.be.empty
    expect(checkForShip(player, [9, 9])).to.be.undefined
    expect(checkForShip(player, [1, 0])).to.not.be.empty
    expect(checkForShip(player, [5, 1])).to.not.be.empty
    expect(checkForShip(player, [1, 1])).to.not.be.empty
  })
})// end of checkForShip
describe('damage ship', () => {
  var damageShip = require('../gameLogic/shipMethods').damageShip
  it('should register damage on a given ship on a given location', () => {
    var ship = {
      locations: [[0,0]],
      damage: []
    }
    damageShip(ship, [0,0])
    expect(ship.damage).to.not.be.empty;
    expect(ship.damage[0]).to.deep.equal([0,0]);
  })
})// ends damageShip
describe('fire', () => {
  var fire = require('../gameLogic/shipMethods').fire
  it('should fire a ship', (player, coordinates) => {
    var player = {
      ships: [
        {
          locations: [[0,0]],
          damage: []
        }
      ]
    }
    fire(player, [0,0])
    expect(player.ships[0].damage[0]).to.deep.equal([0,0])
  })
})
describe('dont fire', () => {
  var fire = require('../gameLogic/shipMethods').fire
  it('shouldnt fire a ship', (player, coordinates) => {
    var player = {
      ships: [
        {
          locations: [[0,0]],
          damage: []
        }
      ]
    }
    fire(player, [0,9])
    expect(player.ships[0].damage).to.be.empty
  })
})

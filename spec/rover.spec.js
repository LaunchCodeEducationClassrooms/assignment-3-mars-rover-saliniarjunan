const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function(){
    
    let commands = [
       new Command('MOVE', 12345),
       new Command('STATUS_CHECK')       
    ];
    
    let message = new Message('Move and Status Check', commands);
    let rover = new Rover(143);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Move and Status Check');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    
    let commands = [
       new Command('MOVE', 1000),
       new Command('STATUS_CHECK')       
    ];
    
    let message = new Message('Passing Two commands', commands);
    let rover = new Rover(143);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });
  
  it("responds correctly to status check command", function(){
    
    let commands = [
       new Command('MOVE', 1500),
       new Command('STATUS_CHECK')       
    ];
    
    let message = new Message('Status check verification', commands);
    let rover = new Rover(1430);
    let response = rover.receiveMessage(message);    
    expect(response.results[1].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[1].roverStatus.position).toEqual(1500);
  });

  it("responds correctly to mode change command", function(){
    
    let commands = [
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'NORMAL'),
       new Command('STATUS_CHECK') 
    ];
    
    let message = new Message('Mode check verification', commands);
    let rover = new Rover(14300);
    let response = rover.receiveMessage(message);       
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[2].completed).toEqual(true);
    expect(response.results[3].roverStatus.mode).toEqual('NORMAL');
  });

    it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    
    let commands = [
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 8500),
       new Command('STATUS_CHECK')       
    ];
    
    let message = new Message('Status check verification for LOW_POWER Mode', commands);
    let rover = new Rover(101);
    let response = rover.receiveMessage(message);    
    expect(response.results[0].completed).toEqual(false);
    expect(response.results[2].roverStatus.position).toEqual(101);
  });

    it("responds with position for move command", function(){
    
    let commands = [
       new Command('MOVE', 8500),
       new Command('STATUS_CHECK')      
    ];
    
    let message = new Message('Move command verification', commands);
    let rover = new Rover(1430);
    let response = rover.receiveMessage(message);    
    expect(response.results[1].roverStatus.position).toEqual(8500);
  });


});

const Command=require('./command.js');
const Message=require('./message.js');
class Rover {
   // Write code here!
   constructor(position)
   {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts=110;
   }

   receiveMessage(message)
   {
     let finalResult = [];
     for (let i=0; i<message.commands.length; i++)
     {       
       if (message.commands[i].commandType === 'MOVE')
       {
         if (this.mode !== 'LOW_POWER')
         {
          this.position = message.commands[i].value;
         }
         finalResult [i] = {completed: true};
       }
       else if (message.commands[i].commandType === 'STATUS_CHECK')
       {
         finalResult [i] = {
              completed: true,
              roverStatus: { mode: this.mode,
              generatorWatts: this.generatorWatts, position: this.position}
            }        
       }
       else if(message.commands[i].commandType === 'MODE_CHANGE')
       {
        this.mode = message.commands[i].value;
        if (message.commands[i].value === 'LOW_POWER')
        {
          finalResult [i] = {completed: false};
        }
        else
        {
          finalResult [i] = {completed: true};
        }
       }
       else
       {
        finalResult [i] = {completed: false};
       }
     }     
      let finalOutput =
      {
        message: message.name,        
        results: finalResult
      };      
      return finalOutput;
   }
}

module.exports = Rover;

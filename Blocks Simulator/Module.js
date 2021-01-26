class Module{
        constructor(uid, name, position, size, data, clr = color(255, 255, 255)) {
          this.uid = uid;
          this.name = name;
          this.position = position;
          this.size = size;
          this.parameters = data[this.uid];
          this.data = data;
          this.color = clr;
          this.borderColor = color(0);
        }

        setBorderColor(brdrcolor){
          this.borderColor = brdrcolor;
        }
        
        display(){
          fill(this.color);
          stroke(this.borderColor)
          strokeWeight(2);
          rect(this.position.x , this.position.y, this.size.x, this.size.y, 10);
          rect(this.position.x -5 , this.position.y -5, this.size.x, this.size.y, 10);

          textSize(12);
          fill(0)
          noStroke();
          text(this.name, this.position.x +10, this.position.y +15);
          let offset = 40;
          if(this.name != 'Start'){
          for (let parameter in this.parameters) {
              //console.log(parameter);
              textSize(8);
              text(parameter, this.position.x +15, this.position.y + offset);
              let value = this.data[this.uid ][parameter];
              if(typeof value === 'object' && value !== null ){
                let smalloffset = 0;
                  for(let subPar in value){
                    text(subPar,  this.position.x +50 +smalloffset, this.position.y + offset )
                    for(let subParValue in subPar){
                    text(subParValue,  this.position.x +55 +smalloffset, this.position.y + offset )
                    }
                    smalloffset +=12;
                  }
              }
              else{
                text(this.data[this.uid ][parameter],  this.position.x +50, this.position.y + offset)
              }
              
            
              offset += 10;
          }
         }
        }
      

      }
    

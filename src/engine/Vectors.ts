import { Engine } from "./Engine";

class Vector2
{
    public x : number;
    public y : number;
   


    
    // constructor for components and arguments 
    constructor(  x:number, y:number )
    {
        this.x = x
        this.y = y
       
    }

// add operator (+)
add (vector:Vector2): Vector2{
return new Vector2(this.x+ vector.x, this.y +vector.y); 
}
// substraction operator(-)
subtract (vector:Vector2): Vector2{
    return new Vector2(this.x- vector.x, this.y -vector.y); 
    }

// multiply operator(*)
    multiply (vector:Vector2): Vector2{
        return new Vector2(this.x* vector.x, this.y *vector.y); 
        }
// division operator(/)
        divide (vector:Vector2): Vector2{
            return new Vector2(this.x/ vector.x, this.y /vector.y); 
            }

}







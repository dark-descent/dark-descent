import { Engine } from "./Engine";

class Vector
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
add (vector:Vector): Vector{
return new Vector(this.x+ vector.x, this.y +vector.y); 
}
// substraction operator(-)
subtract (vector:Vector): Vector{
    return new Vector(this.x- vector.x, this.y -vector.y); 
    }

// multiply operator(*)
    multiply (vector:Vector): Vector{
        return new Vector(this.x* vector.x, this.y *vector.y); 
        }
// division operator(/)
        divide (vector:Vector): Vector{
            return new Vector(this.x/ vector.x, this.y /vector.y); 
            }

}







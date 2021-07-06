import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'numMaxMin' })
export class NumMaxMin implements PipeTransform {


    transform(num: number, max: number, min:number): number {
        console.log("pipe num"+num);
        if(num<min){
            return min;
        }
        
        if (num>max){
            return max;
        }

        return num;
    }



}
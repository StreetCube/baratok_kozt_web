import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timeStamp'
})
export class TimeStampPipe implements PipeTransform {

  transform(value: Timestamp,): Date | null {
    return value ? new Date(value.seconds * 1000) : null;
  }

}

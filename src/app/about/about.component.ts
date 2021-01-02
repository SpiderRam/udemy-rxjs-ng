import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
      // ~~~ NOTES ~~~
      // A promise executes as soon as it is called, an Observable only triggers in response to a subscription
      // `new Observable()` allows you to create a custom Observable; it takes a function which implements the behavior of the Observable
      // ______________________________________________________________________

      const http$ = new Observable(observer => { // it is observer which allows us to emit/error/complete
        fetch('/api/courses')
          .then(response => {
            return response.json();
          })
          .then(body => {
            observer.next(body);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      });

      http$.subscribe(
        courses => console.log(courses),
        error => console.log('Error', error),
        () => console.log('Complete!')
      );

      // ~~~ NOTES ~~~
      // An Observable is a blueprint for a stream; it only becomes a stream if we subscribe to it
      // const interval$ = interval(1000) is the definition of a stream,
      // interval$.subscribe(...) is an instance of a stream
      // subscribe has three optional arguments: event, error, complete
      // ______________________________________________________________________

      // ~~~ INTERVAL ~~~
      // >> interval() emits an incrementing integer at the specified frequency
      // const interval$ = interval(1000);
      // interval$.subscribe(val => console.log('stream 1:', val));
      // interval$.subscribe(val => console.log('stream 2:', val));

      // ~~~ TIMER ~~~
      // >> timer(delay, frequency) starts emitting like interval() after the specified delay
      // const timer$ = timer(3000, 1000);
      // timer$.subscribe(val => console.log('stream 1:', val));

      // ~~~ FROMEVENT ~~~
      // >> fromEvent(element, event) adds an event listener
      // const click$ = fromEvent(document, 'click');
      // click$.subscribe(
      //   evt => console.log('Click Event:', evt)
      // );

      // ~~~ UNSUBSCRIBE ~~~
      // const sub = interval$.subscribe(
      //   val => console.log('stream 1:', val),
      //   err => console.log('Error:', err), // only fires if error is thrown
      //   () => console.log('Completed') // does not fire on unsubscribe -- you complete an Observable, and unsubscribe a subscription
      // );

      // setTimeout(() => {
      //   sub.unsubscribe();
      // }, 5000);
    }
}







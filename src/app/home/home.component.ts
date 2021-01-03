import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import { interval, Observable, of, timer, noop } from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

// Objective:  split the courses into beginner and advanced and render on separate tabs
// Method 1: use JS filter() inside the subscribe (IMPERATIVE design)
// ---> the problem with that much logic inside a subscribe block is that it will not scale well
// ---> using nested subscribes or complex subscription operations is an rxjs anti-pattern
// Method 2: define two sources of data (two observables) and pass those observables to the template
// ---> NOTE: the async pipe in the template is an Angular thing
// ---> The problem with this approach is that it creates two separate calls to the back end
// Method 3: use the shareReplay operator to allow all subscribers to work from one call to the server
// ---> This works as advertised, though most docs suggest this is usually used with Subjects


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // ~~~~ METHOD 2 & 3 ~~~~
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  // ~~~~~~~~~~~~~~~~~~

  // ~~~~ METHOD 1 ~~~~
  beginnerCourses: Course[];
  advancedCourses: Course[];
  // ~~~~~~~~~~~~~~~~~~


    constructor() {
    }

    // // ~~~~ METHOD 2 & 3~~~~
    ngOnInit() {
      const http$: Observable<Course[]> = createHttpObservable('/api/courses');
      const courses$ = http$.pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload'])),
        shareReplay() // METHOD 3
      );

      this.beginnerCourses$ = courses$
        .pipe(
          map((courses: Course[]) => courses
            .filter(course => course.category === 'BEGINNER'))
        );

      this.advancedCourses$ = courses$
        .pipe(
          map((courses: Course[]) => courses
            .filter(course => course.category === 'ADVANCED'))
        );
    }
    // // ~~~~~~~~~~~~~~~~~~

    // ~~~~ METHOD 1 ~~~~
    // ngOnInit() {
    //   const http$ = createHttpObservable('/api/courses');
    //   const courses$ = http$.pipe(
    //     map(res => Object.values(res['payload']))
    //   );

    //   courses$.subscribe(
    //     courses => {
    //       console.log('COURSES:', courses);
    //       this.beginnerCourses = courses
    //         .filter(course => course.category === 'BEGINNER');
    //       this.advancedCourses = courses
    //         .filter(course => course.category === 'ADVANCED');
    //     },
    //     noop, // placeholder, basically means, do nothing
    //     () => console.log('Complete!')
    //   )
    // }
    // ~~~~~~~~~~~~~~~~~~
}


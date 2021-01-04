# udemy-rxjs-ng

[Starter code](https://github.com/angular-university/rxjs-course) from the [Udemy course](https://www.udemy.com/course/rxjs-course/), by Angular Academy

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)

## Getting started

As noted in the source repo, this project is intended to be run with the following:

-   Node version 14.15.3
-   Angular CLI 11.0.5

First the requisite:

```bash
npm i
```

Then spin up the back end server:

```bash
npm run server
```

And then the UI:

```bash
npm start
```

## Takeaways

> Streams

A stream can be any event or flow of data or events. Mouse/key events, data being returned from a server, and any other events which may occur in the browser (often simulated in examples with intervals/timeouts), all can be considered streams.

> Observables

An Observable is a blueprint for a stream; it only becomes a stream if we subscribe to it. [This nice blog post](https://blog.angular-university.io/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/) describes it thus: "Think of it as your API for tapping into a stream. You can use it to define a stream, subscribe to it and transform it."

> Pipe

Pipe is a built in rxjs function.

-   It is used to derive new Observables from existing Observables.
-   It allows us to chain multiple operators to produce a new Observable.
-   It will not mutate the original Observable:

```typescript
const add1 = (num: number) => {
    return num + 1;
};
const x3 = (num: number) => {
    return num * 3;
};
const minus2 = (num: number) => {
    return num - 2;
};

const int = interval(1000);

int.pipe(
    take(5),
    map((x) => add1(x)),
    map((y) => x3(y)),
    map((z) => minus2(z))
).subscribe((val) => console.log(val)); // 1, 4, 7, 10, 13

int.pipe(take(5)).subscribe((val) => console.log(val)); // 0, 1, 2, 3, 4
```

> Combining Observables

#### concatMap

-   subscribes to one or more observables and emits their values in sequential order
-   will only move to succeeding observables after each one completes.
-   ideally suited to, for example, save operations

#### merge

-   merge takes observables as arguments (input observables)
-   it then forwards the values from the input observables to an output observable, without transforming them in any way
-   the values are emitted in the order in which they are received by merge
-   merge is ideal for performing HTTP requests in parallel

```typescript
const interval1$ = interval(1000);
const interval2$ = interval1$.pipe(map((val) => 10 * val));
const result$ = merge(interval1$, interval2$);
result$.pipe(take(5)).subscribe(console.log); // 0, 0, 1, 10, 2
```

#### mergeMap

-   similar to merge, but mergeMap takes as an argument a function for transforming the values of the input observables before forwarding to the output observable

#### exhaustMap

-   like concatMap and mergeMap, takes the values of input observables and forwards them to an output observable
-   however, exhaustMap will ignore new values if a previous observable has not yet completed
-   this is ideal for preventing duplicated results from a user clicking a button more than once while a process is running

#### switchMap

-   switchMap will immediately complete the previous input observable and subscribe to the new one when a new value is emitted.
-   this is seen in the type ahead example
-   can create bugs, be careful to only use it when you really do not care if an observable fully completes each value

> Additional Operators

#### debounceTime

-   `debounceTime(400)`
-   emits a value from the input observable only after the specified time has elapsed
-   will only emit the most recent value, not all values as with `delay()`
-   for example, the type ahead search component: instead of emitting every letter as it is typed, the value is emitted every 400ms, as words or word fragments, thus reducing the calls to back end

#### distinctUntilChanged

-   only emits the current value if it is different from the previous value
-   in the type ahead example, this solves for use of the Shift key, or typing letters and immediately deleting them (in combination with debounceTime)

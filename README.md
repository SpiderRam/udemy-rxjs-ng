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

> Mapping

#### concatMap

-   subscribes to one or more observables and emits their values in sequential order
-   will only move to succeeding observables after each one completes.
-   ideally suited to, for example, save operations

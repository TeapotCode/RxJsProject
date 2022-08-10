import {Injector} from '@angular/core';
import {catchError, iif, Observable, pipe, retry, switchMap, throwError} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


export function retryPopUp<T>(injector: Injector, config?: MatSnackBarConfig) {
  return pipe(
    catchError((err, caught: Observable<T>) => {

      const snackBar = injector.get(MatSnackBar)
      const snackBarRef = snackBar.open('Connection failure', 'Retry', {
        duration: 5000,
        verticalPosition: "top", ...config
      })

      return snackBarRef.afterDismissed()
        .pipe(
          switchMap(({dismissedByAction}) =>
            iif(() => dismissedByAction, caught.pipe(retry()), throwError(() => err)))
        )
    })
  )
}

import {Injector} from '@angular/core';
import {catchError, iif, pipe, retry, switchMap, throwError} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


export function retryPopUp(injector: Injector, config: MatSnackBarConfig = {duration: 5000, verticalPosition: "top"}) {
  return pipe(
    catchError((err, caught) => {

      const snackBar = injector.get(MatSnackBar)
      const snackBarRef = snackBar.open('Connection failure', 'Retry', config)

      return snackBarRef.afterDismissed()
        .pipe(
          switchMap(({dismissedByAction}) =>
            iif(() => dismissedByAction, caught.pipe(retry()), throwError(() => err)))
        )
    })
  )
}

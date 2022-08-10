import {Injector} from '@angular/core';
import {iif, of, retry, switchMap, throwError} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


export function retryPopUp<T>(injector: Injector, config?: MatSnackBarConfig) {
  return retry<T>({
      delay: (error) => {
        const snackBar = injector.get(MatSnackBar)
        const snackBarRef = snackBar.open('Connection failure', 'Retry', {
          duration: 5000,
          verticalPosition: "top", ...config
        })

        return snackBarRef.afterDismissed()
          .pipe(
            switchMap(({dismissedByAction}) => {
              return iif(() => dismissedByAction, of(null), throwError(() => error))
            })
          )
      }
    })
}

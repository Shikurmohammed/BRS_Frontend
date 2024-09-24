import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  //authServ:AuthService=inject(AuthService)
  //const token = AuthService.; // Replace with your token retrieval logic
  const clonedRequest = req.clone({
      setHeaders: {
        //  Authorization: `Bearer ${token}`,
      },
  });

  return next(clonedRequest);
  //return next(req);
};

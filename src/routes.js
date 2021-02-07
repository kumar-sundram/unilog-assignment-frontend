const routes = {
  auth:"/accounts",
  dashboard: "/dashboard",
  home:"/home"
}

routes.authLogin = `${routes.auth}/login`
routes.authRegister = `${routes.auth}/register`

export default routes
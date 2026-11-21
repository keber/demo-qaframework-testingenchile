// Site paths relative to QA_BASE_URL. Never put a scheme or host here.
export enum Route {
  Home = '/',
  Capacitaciones = '/capacitaciones2/',
  CapacitacionesNoSlash = '/capacitaciones2',
  TestingDay = '/testing-day-chile/',
  Blog = '/blog/',
  Galeria = '/galeria/',
  Contacto = '/formulario-contacto/',
  ContactoEmpresa = '/contacto-empresa/',
  Terminos = '/terminos-y-condiciones/',
  Privacidad = '/politica-de-privacidad/',
  Bootcamp = '/bootcamp-de-testing/',
  CursoSeleniumJava = '/curso-automatizacion-pruebas-software-web-selenium-java/',
  CursoAiu = '/aiugenaia/',
  CursoIstqb = '/new-curso-istqb/',
  AgendaOnline = '/agenda-online/',
  EdicionesAnteriores = '/testing-day-chile-ediciones-anteriores/',
  TestingDay2025 = '/testing-day-chile-2025/',
  Sponsors2025 = '/nuestros-sponsors-2025/',
  // Prefix of a path that never exists; the spec appends a unique suffix.
  NotFoundPrefix = '/qa-pagina-inexistente-',
  // Path prefix of every blog article.
  BlogArticlePrefix = '/l/',
}

// Anchors (fragments) of in-page navigation, without the leading '#'.
export enum Anchor {
  BootcampRuta = 'btc-ruta',
  BootcampPostula = 'btc-postula',
  SponsorsCta = 'sponsors-cta',
}

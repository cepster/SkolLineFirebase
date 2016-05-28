export class App {
  configureRouter(config, router) {
    config.title = 'Skol Line';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      {route: 'music',                name: 'music',       moduleId: 'music/music',    title: 'Music',   nav: true, settings: {auth: true}},
      {route: 'members',              name: 'members',     moduleId: 'members/members',  title: 'Members', nav: true, settings: {auth: true}},
      // {route: 'gigs',                 name: 'gigs',        moduleId: 'gigs/gigs',     title: 'Gigs',    nav: true},
      // {route: 'gigDetail/:gigID',     name: 'gigDetail',   moduleId: 'gigs/gigDetail'},
      {route: 'social',               name: 'social',      moduleId: 'social/social',   title: 'Social',   nav: true}
    ]);

    this.router = router;
  }
}

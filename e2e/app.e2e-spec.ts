import { RezerwacjaSrcPage } from './app.po';

describe('rezerwacja-src App', function() {
  let page: RezerwacjaSrcPage;

  beforeEach(() => {
    page = new RezerwacjaSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

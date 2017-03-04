import { TaxxoXliPage } from './app.po';

describe('taxxo-xli App', () => {
  let page: TaxxoXliPage;

  beforeEach(() => {
    page = new TaxxoXliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

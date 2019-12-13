interface IPageTypes {
  readonly homePage: string;
  readonly genericPage: string;
  readonly installAppPage: string;
  readonly newsPage: string;
}

const pageTypes: IPageTypes = {
  homePage: 'homePage',
  genericPage: 'genericPage',
  installAppPage: 'installAppPage',
  newsPage: 'newsPage'
};

export { pageTypes };

import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { provideFASTDesignSystem, Button, Checkbox, Card, TextField  } from '@microsoft/fast-components';
import { SearchComponent } from './components/search/index';

provideFASTDesignSystem()
    .register(
      SearchComponent
    );

const template = html<AppContainer>`
  <div>
    <search-component greeting="Dan"></search-component>
  </div>
`;

@customElement({
  name: 'app-container',
  template
})
export class AppContainer extends FASTElement {
  
}
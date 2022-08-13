import { html, FASTElement, customElement, attr } from '@microsoft/fast-element';

const template = html<SearchComponent>`
  <div class="header">
    <h3>${x => x.greeting.toUpperCase()}</h3>
  </div>
`;

@customElement({
  name: 'search-component',
  template
})
export class SearchComponent extends FASTElement {
  @attr greeting: string = 'Hello';
}
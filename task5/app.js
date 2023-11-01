import { html, css, LitElement } from 'lit-element';

class MyTree extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ul {
      list-style-type: none;
      padding-left: 20px;
    }
  `;

  static properties = {
    treeData: { type: Object },
  };

  render() {
    return html`
      <ul>
        ${this.treeData.items.map((item) => html`<my-leaf .leafData=${item}></my-leaf>`)}
      </ul>
    `;
  }
}
customElements.define('my-tree', MyTree);

class MyLeaf extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    leafData: { type: Object },
  };

  render() {
    return html`
      <li>${this.leafData.name}</li>
      ${this.leafData.items
        ? html`
            <ul>
              ${this.leafData.items.map((item) => html`<my-leaf .leafData=${item}></my-leaf>`)}
            </ul>
          `
        : ''}
    `;
  }
}
customElements.define('my-leaf', MyLeaf);

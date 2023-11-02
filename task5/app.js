import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MyLeaf extends LitElement {
  static styles = css`
    .leaf {
      margin-left: 10px;
    }
  `;

  static properties = {
    leafData: { type: Object },
  };

  render() {
    return html`
      <div class="leaf">${this.leafData.name}</div>
      ${this.leafData.items
        ? html`
          <my-tree .treeData=${this.leafData.items}></my-tree>
        `
        : ''}
    `;
  }
}

customElements.define('my-leaf', MyLeaf);

class MyTree extends LitElement {
  static styles = css`
    .tree {
      margin-left: 20px;
    }
  `;

  static properties = {
    treeData: { type: Array },
  };
  treeData = [];
  render() {
    return html`
      <ul class="tree">
        ${this.treeData.map(
          (item) => html`
            <li>
              <my-leaf .leafData=${item}></my-leaf>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('my-tree', MyTree);

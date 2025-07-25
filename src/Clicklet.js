class Clicklet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const style = `
            <style>
            button {
                background-color: ${color};
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                ${sizes[size] || sizes.medium}
            }
            </style>
      `;

        const template = `
            ${style}
            <button><slot>Click me</slot></button>
        `;

        this.shadowRoot.innerHTML = template;
    }
}

customElements.define("clicklet", Clicklet);
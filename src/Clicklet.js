class Clicklet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["size", "color"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const size = this.getAttribute("size") || "medium";
        const color = this.getAttribute("color") || "blue";

        const sizes = {
            small: 'padding: 5px 10px; font-size: 12px;',
            medium: 'padding: 10px 20px; font-size: 16px;',
            large: 'padding: 15px 30px; font-size: 20px;'
        };

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

customElements.define("clicklet-button", Clicklet);
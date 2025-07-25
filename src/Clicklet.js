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
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
                }

                button:active {
                    transform: scale(0.98);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }

                button:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
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

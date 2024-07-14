'use strict';

(function () {
    class RadiologyStack extends HTMLElement {
        constructor() {
            super();

            // creating a shadow DOM
            const shadow = this.attachShadow({ mode: 'open' });

            // creating a container for the component
            const container = document.createElement('div');

            // get original images
            const images = this.images;

            // adding a class to our container for the sake of clarity
            container.classList.add('radiology-stack');

            // creating the inner HTML of the element
            container.innerHTML = `
                <style>
                    ul.image-stack {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                    }

                    ul.image-stack li {
                        padding: 0;
                        margin: 0;
                        max-height: 100%;
                        width: auto;
                    }

                    :host(:not([expanded])) ul.image-stack li:not(.active) {
                        display: none;
                    }

                    ul.image-stack li img {
                        max-height: 75vh;
                        max-width: 100%;
                        padding: 0;
                        margin: 0;
                        display: flex;
                    }

                    button {
                        background-color: #2ea44f;
                        border: 1px solid rgba(27, 31, 35, .15);
                        border-radius: 6px;
                        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                        color: #ffffff;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 20px;
                        padding: 6px 16px;
                        text-align: center;
                        margin: 10px 0px;
                    }

                    button:hover {
                        background-color: #2c974b;
                    }
                </style>
                <button class="toggle">&harr;</button>
                <ul class="image-stack">
                ${images.map(image => `
                    <li><img src="${image.src}"></li>
                `).join('')}
                </ul>
            `;

            // binding methods
            this.toggleDisplay = this.toggleDisplay.bind(this);
            this.handleWheelEvent = this.handleWheelEvent.bind(this);

            // appending the container to the shadow DOM
            shadow.appendChild(container);
        }

        // fires after the element has been attached to the DOM
        connectedCallback() {
            this.shadowRoot.querySelector('li').classList.add('active');

            this.shadowRoot.addEventListener('wheel', this.handleWheelEvent);
    
            const toggleButton = this.shadowRoot.querySelector('.toggle');
            toggleButton.addEventListener('click', this.toggleDisplay, false);
        }

        get images() {
            return Array.from(this.querySelectorAll("img"));
        }

        get expanded() {
            return this.hasAttribute('expanded');
        }
        
        set expanded(flag) {
            if (flag) {
                this.setAttribute('expanded', '');
            } else {
                this.removeAttribute('expanded');
            }
        }

        handleWheelEvent(e) {
            e.preventDefault();
    
            const activeImage = this.shadowRoot.querySelector('li.active');
            const nextImage = e.deltaY > 0 ? activeImage.nextElementSibling : activeImage.previousElementSibling;

            if (nextImage) {
                activeImage.classList.remove('active');
                nextImage.classList.add('active');
            }
        }
        
        toggleDisplay(e) {
            // toggle display between stack or expanded
            this.expanded = !this.expanded;
        }
    }

    customElements.define('radiology-stack', RadiologyStack);
})();
